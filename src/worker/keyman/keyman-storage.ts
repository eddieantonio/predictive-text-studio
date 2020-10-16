import { openDB, DBSchema, IDBPDatabase } from "idb";
interface KeymanDB extends DBSchema {
  "favourite-number": {
    key: string;
    value: string;
  };
}
export class KeymanStorage {
  storeName = "keymanStore";
  db: Promise<IDBPDatabase<KeymanDB>>;
  constructor() {
    this.db = openDB<KeymanDB>("db1", 1, {
      upgrade(db) {
        db.createObjectStore("favourite-number");
      },
    });
  }
  async addData() {
    (await this.db).add("favourite-number", "a", "a");
  }
}
// export function demo1www() {
//   openDB("db1", 1, {
//     upgrade(db) {
//       db.createObjectStore("store1");
//       db.createObjectStore("store2");
//     },
//   });
//   openDB("db2", 1, {
//     upgrade(db) {
//       db.createObjectStore("store3", { keyPath: "id" });
//       db.createObjectStore("store4", { autoIncrement: true });
//     },
//   });
// }
