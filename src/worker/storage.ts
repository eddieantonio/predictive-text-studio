import Dexie, { DexieOptions } from "dexie";

const DB_NAME = "dictionary_sources";
const VERSION = 1;

/**
 * files Table Scehma
 * +------------------+
 * | id (primary key) |
 * +------------------+
 * | name             |
 * +------------------+
 * | file             |
 * +------------------+
 */
const FILES_TABLE_NAME = "files";
const FILES_TABLE_SCHEMA = "++id, name, file";

interface StoredFile {
  id?: number;
  name: string;
  contents: ArrayBuffer;
}

export class PredictiveTextStudioDexie extends Dexie {
  files: Dexie.Table<StoredFile, number>;

  constructor(options?: DexieOptions) {
    super(DB_NAME, options);
    this.version(VERSION).stores({ files: FILES_TABLE_SCHEMA });
    this.files = this.table(FILES_TABLE_NAME);
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
  saveFile(name: string, contents: ArrayBuffer): Promise<void> {
    return this.db.transaction("readwrite", this.db.files, async () => {
      await this.db.files.where("name").equals(name).delete();
      await this.db.files.put({ name, contents });
    });
  }

  /**
   * Retrieves every file in the database as a list of {name, contents}
   * objects.
   */
  async fetchAllFiles(): Promise<[]> {
    return [];
  }
}
