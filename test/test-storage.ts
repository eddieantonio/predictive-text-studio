import test from "ava";
// @ts-ignore
import * as indexedDB from "fake-indexeddb";
// @ts-ignore
import * as IDBKeyRange from "fake-indexeddb";

import IndexDBAccess from "@worker/indexedDBAccess";

test("importing storage backend", async (t) => {
  const db = new IndexDBAccess({ indexedDB, IDBKeyRange });
  t.is(await db.files.count(), 0);
});
