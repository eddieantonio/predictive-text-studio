import { KeymanStorage } from "./keyman/keyman-storage";
import { KeymanApi } from "./keyman/keyman-api-service";
import { readExcel } from "./read-wordlist";
import { PredictiveTextStudioWorker } from "@common/predictive-text-studio-worker";
import {
  compileModelFromLexicalModelSource,
  WordListFromArray,
} from "@predictive-text-studio/lexical-model-compiler";
import { linkStorageToKmp } from "./link-storage-to-kmp";
import Storage from "./storage";
import { LanguageObj } from "./keyman/keyman.modal";
export class PredictiveTextStudioWorkerImpl
  implements PredictiveTextStudioWorker {
  constructor(
    private storage = new Storage(),
    private keymanApi = new KeymanApi(),
    private keymanStorage = new KeymanStorage()
  ) {
    this.getLanguageData();
    this.keymanStorage;
  }

  async saveFile(name: string, file: File): Promise<ArrayBuffer> {
    const wordlist = await readExcel(await file.arrayBuffer());
    this.storage.saveFile(name, wordlist);
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

  async getLanguageData(): Promise<void> {
    await this.keymanApi.getLanaguageData().then((languages: LanguageObj[]) => {
      languages.forEach((data) => {
        this.keymanStorage.addLanguageData(data.bcp47, data.language);
      });
    });
  }
}
