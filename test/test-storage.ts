import test from "ava";
import * as indexedDB from "fake-indexeddb";
import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";

import Storage, { PredictiveTextStudioDexie } from "@worker/storage";
import { pathToFixture, loadContentsAsArrayBuffer } from "./helpers";

test("storing a file", async (t) => {
  const db = new PredictiveTextStudioDexie({ indexedDB, IDBKeyRange });
  const storage = new Storage(db);
  const filename = "ExampleWordlist.xlsx";

  t.is(await db.files.count(), 0);

  const file = loadContentsAsArrayBuffer(pathToFixture(filename));
  await storage.saveFile(filename, file);

  t.is(await db.files.count(), 1);
});

test("retrieving all files", async (t) => {
  const db = new PredictiveTextStudioDexie({ indexedDB, IDBKeyRange });
  const storage = new Storage(db);
  const filename = "ExampleWordlist.xlsx";
  const file = loadContentsAsArrayBuffer(pathToFixture(filename));
  await storage.saveFile(filename, file);

  const files = await storage.fetchAllFiles();
  t.is(files.length, 1);
});
