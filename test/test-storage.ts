import test from "ava";
import FDBFactory = require("fake-indexeddb/lib/FDBFactory");
import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";

import Storage, { PredictiveTextStudioDexie } from "@worker/storage";
import type { WordList } from "@common/types";

const exampleWordlist: WordList = [
  ["TŦE", 13644],
  ["E", 9134],
  ["SEN", 4816],
  ["Ȼ", 3479],
  ["SW̱", 2621],
  ["NIȽ", 2314],
  ["U¸", 2298],
  ["I¸", 1988],
  ["ȻSE", 1925],
  ["I", 1884],
];

test("storing a file", async (t) => {
  const db = new PredictiveTextStudioDexie({
    indexedDB: new FDBFactory(),
    IDBKeyRange,
  });
  const storage = new Storage(db);
  const filename = "ExampleWordlist.xlsx";

  t.is(await db.files.count(), 0);

  await storage.saveFile(filename, exampleWordlist);

  t.is(await db.files.count(), 1);
});

test("retrieving all files", async (t) => {
  const db = new PredictiveTextStudioDexie({
    indexedDB: new FDBFactory(),
    IDBKeyRange,
  });
  const storage = new Storage(db);
  const filename = "ExampleWordlist.xlsx";
  await storage.saveFile(filename, exampleWordlist);

  const files = await storage.fetchAllFiles();
  t.is(files.length, 1);
});
