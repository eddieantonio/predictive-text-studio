import test from "ava";
import { linkStorageToKmp } from "@worker/link-storage-to-kmp";
import Storage, { PredictiveTextStudioDexie } from "@worker/storage";
import FDBFactory = require("fake-indexeddb/lib/FDBFactory");
import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";

test("a function link the storage file to generate the kmp package", async (t) => {
  const db = new PredictiveTextStudioDexie({
    indexedDB: new FDBFactory(),
    IDBKeyRange,
  });
  const storage = new Storage(db);
  // make sure the packageInfo is defined
  await storage.updateBCP47Tag("en");

  const kmpFile = await linkStorageToKmp(storage);

  t.assert(kmpFile != null);
});
