import { KeymanApi } from "./keyman-api-service";
import { readExcel } from "./read-wordlist";
import { PredictiveTextStudioWorker } from "@common/predictive-text-studio-worker";
import { linkStorageToKmp } from "./link-storage-to-kmp";
import Storage from "./storage";
import { RelevantKmpOptions } from "@common/kmp-json-file";

/**
 * The default model version. 1.0.0 also happens to be the minimum model
 * version that the Keyman team will publish.
 */
const defaultVersion = "1.0.0";
/**
 * The default copyright.
 */
const defaultCopyright = "";

function doNothing() {
  // intentionally empty
}
import { keyboardDataObj } from "./models";

export class PredictiveTextStudioWorkerImpl
  implements PredictiveTextStudioWorker {
  constructor(
    private storage = new Storage(),
    private keymanApi = new KeymanApi()
  ) {
    this.getLanguageData();
  }

  async updateBCP47Tag(bcp47Tag: string): Promise<void> {
    await this.storage.updateBCP47Tag(bcp47Tag);
    return this.generateKMPFromStorage();
  }

  async getLanguageData(): Promise<void> {
    await this.keymanApi
      .fetchLanaguageData()
      .then((languages: keyboardDataObj[]) => {
        languages.forEach(async (data) => {
          await this.storage.addKeyboardData(data.langauge, data.bcp47Tag);
        });
      });
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
      const kmpFile = await linkStorageToKmp(this.storage);
      this._emitPackageCompileSuccess(kmpFile);
    }
  }

  async addDictionarySourceToProject(
    name: string,
    contents: File
  ): Promise<number> {
    const wordlist = await readExcel(await contents.arrayBuffer());
    await this.storage.saveFile(name, wordlist);
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

  setProjectData(
    metadata: Partial<Readonly<RelevantKmpOptions>>
  ): Promise<void> {
    let langName = "";
    let bcp47Tag = "";
    if (metadata.languages == undefined) {
      langName = "";
      bcp47Tag = "";
    } else {
      langName = metadata.languages[0].name;
      bcp47Tag = metadata.languages[0].id;
    }

    const authorName = metadata.authorName || "UnknownAuthor";
    const modelID = metadata.modelID || `${authorName}.${bcp47Tag}.${langName}`;
    const copyright = metadata.copyright || defaultCopyright;
    const version = metadata.version || defaultVersion;

    const storedData = {
      langName: langName,
      bcp47Tag: bcp47Tag,
      authorName: authorName,
      modelID: modelID,
      copyright: copyright,
      version: version,
    };
    return this.storage.updateProjectData(storedData);
  }
}
