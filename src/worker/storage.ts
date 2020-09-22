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
  file: File;
}

export class PredictiveTextStudioDexie extends Dexie {
  files: Dexie.Table<StoredFile, number>;

  constructor(options?: DexieOptions) {
    super(DB_NAME, options);
    this.version(VERSION).stores({ files: FILES_TABLE_SCHEMA });
    this.files = this.table(FILES_TABLE_NAME);
  }

  saveFile(name: string, file: File): Promise<void> {
    return this.transaction("readwrite", this.files, async () => {
      await this.files.where("name").equals(name).delete();
      await this.files.put({ name, file });
    });
  }
}
