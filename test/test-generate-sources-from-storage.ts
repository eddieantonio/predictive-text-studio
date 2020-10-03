import test from "ava";
import Storage, { PredictiveTextStudioDexie } from "@worker/storage";
import FDBFactory = require("fake-indexeddb/lib/FDBFactory");
import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";
import { generateSourcesFromStorage } from "@worker/generate-sources-from-storage";

test("it should generate an array whose type is WordListFromArray from given storage", async (t) => {
  const db = new PredictiveTextStudioDexie({
    indexedDB: new FDBFactory(),
    IDBKeyRange,
  });
  const storage = new Storage(db);
  const sources = await generateSourcesFromStorage(storage);
  t.assert(sources != null);
});
