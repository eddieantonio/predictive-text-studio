import type { PredictiveTextStudioWorker } from "@common/predictive-text-studio-worker";
import type { RelevantKmpOptions } from "@common/kmp-json-file";
import type {
  DictionarySourceType,
  ProjectMetadata,
  WordList,
  WordListSource,
} from "@common/types";

import Storage from "./storage";
import { KeyboardData, KeyboardDataWithTime } from "./storage-models";
import { KeymanAPI } from "./keyman-api-service";
import { linkStorageToKmp } from "./link-storage-to-kmp";
import { readExcel, readTSV } from "./read-wordlist";

/**
 * expiryThreshold is used to decide if keyboard data is too old
 * currently it is set to seven days in millisecond
 */
const expiryThreshold = 604800000;

function doNothing() {
  // intentionally empty
}

export class PredictiveTextStudioWorkerImpl
  implements PredictiveTextStudioWorker {
  constructor(
    private storage = new Storage(),
    private keymanAPI = new KeymanAPI()
  ) {
    this.getLanguageData();
  }

  async fetchLanguageDataFromService(): Promise<void> {
    this.keymanAPI.fetchLanaguageData().then((languages: KeyboardData[]) => {
      languages.forEach(async (data) => {
        await this.storage.addKeyboardData(data.language, data.bcp47Tag);
      });
    });
  }

  async fetchCachedKeyboardLanguageList(): Promise<KeyboardDataWithTime[]> {
    return this.storage.fetchKeyboardData();
  }

  async getFilesFromStorage(): Promise<WordListSource[]> {
    return this.storage.fetchAllFiles();
  }

  async getLanguageData(): Promise<void> {
    let dateDiff: number;
    const keyboardData: KeyboardDataWithTime[] = await this.storage.fetchKeyboardData();
    const datenow: Date = new Date();
    if (keyboardData.length !== 0) {
      dateDiff = datenow.getTime() - keyboardData[0].timestamp.getTime();
      if (dateDiff > expiryThreshold) {
        await this.storage.deleteKeyboardData();
        this.fetchLanguageDataFromService();
      }
    } else {
      this.fetchLanguageDataFromService();
    }
  }

  async readGoogleSheet(
    name: string,
    wordlist: WordList
  ): Promise<ArrayBuffer> {
    this.storage.saveFile({
      name,
      wordlist,
      size: wordlist.length,
      type: "google-sheets",
    });
    return await linkStorageToKmp(this.storage);
  }

  private async generateKMPFromStorage(): Promise<void> {
    // TODO: Parse multiple dictionary sources, right now just reading the first file
    this._emitPackageCompileStart();

    const storedFiles = await this.storage.fetchAllFiles();
    if (storedFiles.length < 1) {
      this._emitPackageCompileError(
        new Error("Cannot find any files in the IndexedDB")
      );
    } else {
      const kmpArrayBuffer = await linkStorageToKmp(this.storage);
      this.saveKMPPackage(kmpArrayBuffer);
      this._emitPackageCompileSuccess(kmpArrayBuffer);
    }
  }

  async addDictionarySourceToProject(
    name: string,
    contents: File
  ): Promise<number> {
    let wordlist: WordList = [];
    let type: DictionarySourceType;
    if (/\.(tsv)$/i.test(name)) {
      // Read the file as a string
      const TSVFileString: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", (event: ProgressEvent<FileReader>) => {
          if (event.target && typeof event.target.result === "string") {
            resolve(event.target.result);
          } else {
            reject("Could not Read File");
          }
        });
        reader.readAsText(contents);
      });
      wordlist = readTSV(TSVFileString);
      type = "tsv";
    } else if (/\.(xlsx)$/i.test(name)) {
      wordlist = await readExcel(await contents.arrayBuffer());
      type = "xlsx";
    } else {
      throw new Error("Invalid File Type. Please use either .tsv or .xlsx");
    }
    await this.storage.saveFile({
      name,
      wordlist,
      size: wordlist.length,
      type,
    });
    this.generateKMPFromStorage();
    return wordlist.length;
  }

  async updateDictionaryInProject(originalDictionaryName: string, newDictionary: WordListSource): Promise<number>{
    await this.storage.updateFile(originalDictionaryName, newDictionary);
    return newDictionary.size;
  }

  async removeDictionaryFromProject(name: string): Promise<number> {
    await this.storage.deleteFile(name);
    return 1;
  }

  async addManualEntryDictionaryToProject(
    name: string,
    wordlist: WordList
  ): Promise<number> {
    await this.storage.saveFile({
      name: name,
      wordlist,
      size: wordlist.length,
      type: "direct-entry",
    });
    this.generateKMPFromStorage();
    return wordlist.length;
  }

  private _emitPackageCompileStart: () => void = doNothing;
  private _emitPackageCompileError: (err: Error) => void = doNothing;
  private _emitPackageCompileSuccess: (kmp: ArrayBuffer) => void = doNothing;

  onPackageCompileStart(callback: () => void): void {
    this._emitPackageCompileStart = callback;
  }

  onPackageCompileError(callback: (err: Error) => void): void {
    this._emitPackageCompileError = callback;
  }

  onPackageCompileSuccess(callback: (kmp: ArrayBuffer) => void): void {
    this._emitPackageCompileSuccess = callback;
  }

  async setProjectData(
    metadata: Partial<Readonly<RelevantKmpOptions>>
  ): Promise<void> {
    const data = toStorageFormat(metadata);
    await this.storage.updateProjectData(data);
    return this.generateKMPFromStorage();
  }

  async fetchAllCurrentProjectMetadata(): Promise<ProjectMetadata> {
    const result = await this.storage.fetchProjectData();
    // ProjectMetadata does not have this, so remove the property!
    delete result.id;
    return result;
  }

  private saveKMPPackage(kmp: ArrayBuffer): Promise<void> {
    return this.storage.saveCompiledKMPAsArrayBuffer(kmp);
  }
}

/**
 * The storage backend wants a slightly different data format than the
 * RelevantKmpOptions interface provides.
 */
function toStorageFormat(
  metadata: Partial<Readonly<RelevantKmpOptions>>
): { [key: string]: string } {
  const data = Object.assign({}, metadata as { [key: string]: string });
  if (metadata.languages) {
    data.langName = metadata.languages[0].name;
    data.bcp47Tag = metadata.languages[0].id;
    delete data.languages;
  }

  return data;
}
