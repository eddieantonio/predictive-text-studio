import test from "ava";
import FDBFactory = require("fake-indexeddb/lib/FDBFactory");
import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";

import Storage, { PredictiveTextStudioDexie } from "@worker/storage";

import { exampleWordlist } from "./fixtures";

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

  const file = files[0];
  t.is(file.name, filename);
  t.deepEqual(file.wordlist, exampleWordlist);
});
