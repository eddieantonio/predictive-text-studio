import Dexie from "dexie";

const DB_NAME = "dictionary_sources";
const VERSION = 1;

/**
 * files Table Scehma
 * +-------+
 * | id    |
 * +-------+
 * | name  |
 * +-------+
 * | file  |
 * +-------+
 */
const FILES_TABLE_NAME = "files";
const FILES_TABLE_SCHEMA = "++id, name, file";

interface IFile {
  id?: number;
  name: string;
  file: File;
}

class IndexDBAccess extends Dexie {
  files: Dexie.Table<IFile, number>;

  constructor() {
    super(DB_NAME);
    this.version(VERSION).stores({ files: FILES_TABLE_SCHEMA });
    this.files = this.table(FILES_TABLE_NAME);
  }

  saveFile(name: string, file: File) {
    return indexedDB.transaction("readwrite", indexedDB.files, async () => {
      await indexedDB.files.where("name").equals(name).delete();
      await indexedDB.files.put({ name, file });
    });
  }
}

const indexedDB = new IndexDBAccess();
export default indexedDB;
