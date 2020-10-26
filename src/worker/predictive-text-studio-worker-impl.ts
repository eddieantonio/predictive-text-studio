import { readExcel } from "./read-wordlist";
import { PredictiveTextStudioWorker } from "@common/predictive-text-studio-worker";
import {
  compileModelFromLexicalModelSource,
  WordListFromArray,
} from "@predictive-text-studio/lexical-model-compiler";
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
const defaultCopyright = "No copyright";

export class PredictiveTextStudioWorkerImpl
  implements PredictiveTextStudioWorker {
  private storage: Storage;

  constructor(storage = new Storage()) {
    this.storage = storage;
  }

  async saveFile(name: string, file: File): Promise<ArrayBuffer> {
    const wordlist = await readExcel(await file.arrayBuffer());
    await this.storage.saveFile(name, wordlist);
    return await linkStorageToKmp(this.storage);
  }

  async compileModel(): Promise<string> {
    // TODO: Parse multiple dictionary sources, right now just reading the first file
    const storedFiles = await this.storage.fetchAllFiles();
    if (storedFiles.length < 1) {
      throw new Error("Cannot find any file in the IndexedDB");
    } else {
      const file = storedFiles[0];
      const code = compileModelFromLexicalModelSource({
        format: "trie-1.0",
        sources: [new WordListFromArray(file.name, file.wordlist)],
      });
      return code;
    }
  }

  updateBCP47Tag(bcp47Tag: string): Promise<void> {
    return this.storage.updateBCP47Tag(bcp47Tag);
  }

  private async generateKMPFromStorage(): Promise<Blob | void> {
    // TODO: Parse multiple dictionary sources, right now just reading the first file
    this.onPackageCompileStart((): void => {
      console.log("Compile starts.");
    });

    const storedFiles = await this.storage.fetchAllFiles();
    if (storedFiles.length < 1) {
      const error = new Error("Cannot find any file in the IndexedDB");
      this.onPackageCompileError(error, (error: Error): void => {
        console.log(error);
      });
    } else {
      const kmpFile = await linkStorageToKmp(this.storage);
      const blob = new Blob([kmpFile], { type: "application/octet-stream" });
      this.onPackageCompileSuccess(blob, (kmp: Blob): void => {
        console.log("Compile successes.");
      });
      return blob;
    }
  }

  async addDictionarySourceToProject(
    name: string,
    contents: File
  ): Promise<number> {
    const wordlist = await readExcel(await contents.arrayBuffer());
    await this.storage.saveFile(name, wordlist);
    return wordlist.length;
  }

  private _emitPackageCompileStart: () => void = () => {};
  private _emitPackageCompileError: (err: Error) => void = () => {};
  private _emitPackageCompileSuccess: (kmp: Blob) => void = () => {};

  onPackageCompileStart(callback: () => void): void {
    this._emitPackageCompileStart = callback;
  }

  onPackageCompileError(callback: (err: Error) => void): void {
    this._emitPackageCompileError = callback;
  }

  onPackageCompileSuccess(callback: (kmp: Blob) => void): void {
    this._emitPackageCompileSuccess = callback;
  }

  setProjectData(metadata: Readonly<RelevantKmpOptions>): Promise<void> {
    const langName = metadata.languages[0].name;
    const bcp47Tag = metadata.languages[0].id;
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
