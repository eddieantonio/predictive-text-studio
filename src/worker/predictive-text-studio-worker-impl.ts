import type { PredictiveTextStudioWorker } from "@common/predictive-text-studio-worker";
import type { RelevantKmpOptions } from "@common/kmp-json-file";
import type {
  DictionarySourceType,
  StoredProjectData,
  ProjectMetadata,
  UploadSettings,
  StoredWordList,
  WordList,
} from "@common/types";

import Storage from "./storage";
import { KeyboardData, KeyboardDataWithTime } from "./storage-models";
import { KeymanAPI } from "./keyman-api-service";
import { linkStorageToKmp } from "./link-storage-to-kmp";
import { readExcel, readTSV, readGoogleSheet } from "./read-wordlist";

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

  async getFilesFromStorage(project?: number): Promise<StoredWordList[]> {
    return this.storage.fetchFiles(project);
  }

  async getProjectDataFromStorage(): Promise<StoredProjectData[]> {
    return this.storage.fetchAllProjectData();
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

  async saveGoogleSheet(
    project: number,
    name: string,
    rows: string[][],
    settings: UploadSettings
  ): Promise<void> {
    const source = await readGoogleSheet(project, name, rows, settings);
    await this.storage.saveFile(source);
    this.generateKMPFromStorage(project);
  }

  private async generateKMPFromStorage(project = 1): Promise<void> {
    // TODO: Parse multiple dictionary sources, right now just reading the first file
    this._emitPackageCompileStart();

    const storedFiles = await this.storage.fetchFiles(project);
    if (storedFiles.length < 1) {
      this._emitPackageCompileError(
        new Error("Cannot find any files in the IndexedDB")
      );
    } else {
      const kmpArrayBuffer = await linkStorageToKmp(this.storage, project);
      this.saveKMPPackage(kmpArrayBuffer);
      this._emitPackageCompileSuccess(kmpArrayBuffer);
    }
  }

  async addDictionarySourceToProject(
    project: number,
    name: string,
    contents: File,
    settings: UploadSettings
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
      wordlist = await readExcel(await contents.arrayBuffer(), settings);
      type = "xlsx";
    } else {
      throw new Error("Invalid File Type. Please use either .tsv or .xlsx");
    }
    await this.storage.saveFile({
      name,
      wordlist,
      size: wordlist.length,
      type,
      project,
    });
    this.generateKMPFromStorage(project);
    return wordlist.length;
  }

  async removeDictionaryFromProject(name: string): Promise<number> {
    await this.storage.deleteFile(name);
    return 1;
  }

  async putDirectEntry(source: StoredWordList): Promise<number> {
    await this.storage.saveFile(source);
    this.generateKMPFromStorage(source.project);
    return source.size;
  }

  // async updateManualEntryDictionaryToProject(
  //   id: number,
  //   name: string,
  //   wordlist: WordList
  // ): Promise<number> {
  //   await this.storage.saveFile({
  //     id,
  //     name,
  //     wordlist,
  //     size: wordlist.length,
  //     type: "direct-entry",
  //     project: 0,
  //   });
  //   this.generateKMPFromStorage();
  //   return wordlist.length;
  // }

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

  async putProjectData(
    metadata: Partial<Readonly<RelevantKmpOptions>>,
    project?: number
  ): Promise<number> {
    const data = toStorageFormat(metadata);
    const id = await this.storage.putProjectData(data, project);
    await this.generateKMPFromStorage();
    return id;
  }

  async fetchAllCurrentProjectMetadata(project = 1): Promise<ProjectMetadata> {
    const result = await this.storage.fetchProjectData(project);
    // ProjectMetadata does not have this, so remove the property!
    delete result.id;
    return result;
  }

  async doesProjectExist(): Promise<boolean> {
    return this.storage.doesProjectExist();
  }

  private saveKMPPackage(kmp: ArrayBuffer): Promise<void> {
    return this.storage.saveCompiledKMPAsArrayBuffer(kmp);
  }

  async exportProjectData(): Promise<string> {
    return this.storage.exportProjectData();
  }

  async importProjectData(data: string): Promise<void> {
    return this.storage.importProjectData(data);
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
    data.language = metadata.languages[0].name;
    data.bcp47Tag = metadata.languages[0].id;
    delete data.languages;
  }

  return data;
}
