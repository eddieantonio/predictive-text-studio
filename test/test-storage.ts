import test from "ava";
import * as indexedDB from "fake-indexeddb";
import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";

import IndexDBAccess from "@worker/storage";

test("importing storage backend", async (t) => {
  const db = new IndexDBAccess({ indexedDB, IDBKeyRange });
  t.is(await db.files.count(), 0);
});
