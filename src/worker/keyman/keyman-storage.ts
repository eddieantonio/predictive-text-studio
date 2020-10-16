import { openDB, IDBPDatabase } from "idb";
import { KeymanDB } from "./keyman.modal";

export class KeymanStorage {
  /**
   * IndexedDB name
   */
  dbName = "keymanDB";
  db: Promise<IDBPDatabase<KeymanDB>>;

  constructor() {
    // Initialize IndexedDB
    this.db = openDB<KeymanDB>(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore("keymanLanguages");
      },
    });
  }

  async addLanguageData(bcp47: string, language: string): Promise<void> {
    (await this.db).add("keymanLanguages", language, bcp47);
  }
}
