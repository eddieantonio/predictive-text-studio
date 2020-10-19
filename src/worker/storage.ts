import Dexie, { DexieOptions } from "dexie";
import { WordList } from "@common/types";

const DB_NAME = "dictionary_sources";
const SCHEMA_VERSION = 1;

interface StoredFile {
  id?: number;
  name: string;
  contents: ArrayBuffer;
}

/**
 * A word list.
 */
export interface StoredWordList {
  id?: number;
  /**
   * Typically the filename of the uploaded dictionary source.
   */
  name: string;
  /**
   * The actual contents of said file.
   */
  wordlist: WordList;
}

export interface StoredPackageInfo {
  id?: number;
  /**
   * the valid bcp47Tag for the language
   */
  bcp47Tag: string;
}

export class PredictiveTextStudioDexie extends Dexie {
  files: Dexie.Table<StoredWordList, number>;
  packageInfo: Dexie.Table<StoredPackageInfo, number>;

  constructor(options?: DexieOptions) {
    super(DB_NAME, options);
    this.version(SCHEMA_VERSION).stores({
      /**
       * files Table Scehma
       * +------------------+
       * | id (primary key) |
       * +------------------+
       * | name             |
       * +------------------+
       * | wordlist         |
       * +------------------+
       */
      files: "++id, name, wordlist",
      /**
       * packageInfo Table Scehma
       * packageInfor stores the information needed for create the kmp package.
       * we might also store language name, moded id in the future.
       * +------------------+
       * | id (primary key) |
       * +------------------+
       * | bcp47Tag         |
       * +------------------+
       */
      packageInfo: "++id, bcp47Tag",
    });
    this.files = this.table("files");
    this.packageInfo = this.table("packageInfo");
  }
}

export default class Storage {
  private db: PredictiveTextStudioDexie;

  constructor(db?: PredictiveTextStudioDexie) {
    this.db = db || new PredictiveTextStudioDexie();
  }

  /**
   * Saves a wordlist source file to storage.
   */
  saveFile(name: string, wordlist: WordList): Promise<void> {
    return this.db.transaction("readwrite", this.db.files, async () => {
      await this.db.files.where("name").equals(name).delete();
      await this.db.files.put({ name, wordlist });
    });
  }

  /**
   * Retrieves every file in the database as a list of {name, contents}
   * objects.
   */
  fetchAllFiles(): Promise<StoredWordList[]> {
    return this.db.files.toArray();
  }
  /**
   * Update bcp47 tag to database
   * @param bcp47Tag
   */
  updateBCP47Tag(bcp47Tag: string): Promise<void> {
    return this.db.transaction("readwrite", this.db.packageInfo, async () => {
      await this.db.packageInfo.put({ bcp47Tag, id: PACKAGE_ID });
    });
  }
  /**
   * Retrieves packageInfo in the database
   */
  fetchPackageInfo(): Promise<StoredPackageInfo | undefined> {
    return this.db.packageInfo.where(":id").equals(PACKAGE_ID).first();
  }
}
