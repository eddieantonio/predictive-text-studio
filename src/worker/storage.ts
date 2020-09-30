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
interface StoredWordList {
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

export class PredictiveTextStudioDexie extends Dexie {
  files: Dexie.Table<StoredWordList, number>;

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
    });
    this.files = this.table("files");
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
  async fetchAllFiles(): Promise<StoredWordList[]> {
    const array = await this.db.files.toArray();
    return (array as unknown) as StoredWordList[];
  }
}
