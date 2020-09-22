import * as fs from "fs";

import test from "ava";
import * as indexedDB from "fake-indexeddb";
import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";

import Storage, { PredictiveTextStudioDexie } from "@worker/storage";
import { pathToFixture } from "./helpers";

test("storing a file", async (t) => {
  const db = new PredictiveTextStudioDexie({ indexedDB, IDBKeyRange });
  const storage = new Storage(db);
  const filename = "ExampleWordlist.xlsx";

  t.is(await db.files.count(), 0);

  const file = loadAsArrayBuffer(pathToFixture(filename));
  await storage.saveFile(filename, file);

  t.is(await db.files.count(), 1);
});

function loadAsArrayBuffer(filename: string): ArrayBuffer {
  const buffer = fs.readFileSync(filename);
  const arr = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arr);
  for (let i = 0; i < buffer.length; i++) {
    view[i] = buffer[i];
  }
  return arr;
}
