import type { PredictiveTextStudioWorker } from "@common/predictive-text-studio-worker";
import type { RelevantKmpOptions } from "@common/kmp-json-file";
import type {
  DictionarySourceType,
  ProjectMetadata,
  UploadSettings,
  WordList,
  WordListSource,
} from "@common/types";

import Storage from "./storage";
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
  ) {
  }

  async getFilesFromStorage(): Promise<WordListSource[]> {
    return this.storage.fetchAllFiles();
  }

  async readGoogleSheet(
    name: string,
    rows: string[][],
    settings: UploadSettings
  ): Promise<void> {
    const source = await readGoogleSheet(name, rows, settings);
    this.storage.saveFile(source);
    this.generateKMPFromStorage();
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
    });
    this.generateKMPFromStorage();
    return wordlist.length;
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
      name,
      wordlist,
      size: wordlist.length,
      type: "direct-entry",
    });
    this.generateKMPFromStorage();
    return wordlist.length;
  }

  async updateManualEntryDictionaryToProject(
    id: number,
    name: string,
    wordlist: WordList
  ): Promise<number> {
    await this.storage.saveFile({
      id,
      name,
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
