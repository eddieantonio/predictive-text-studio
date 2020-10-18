import anyTest, { TestInterface } from "ava";

import FDBFactory = require("fake-indexeddb/lib/FDBFactory");
import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";

import Storage, { PredictiveTextStudioDexie } from "@worker/storage";
import { WordList } from "@common/types";

import { exampleWordlist } from "./fixtures";

/**
 * Every test will have access to:
 *
 *  - an empty database
 *  - a Storage instance attached to the empty database
 *
 * See: https://github.com/avajs/ava/blob/fd4da2f280679eb5fdb903bac17b2cb4431773b6/docs/recipes/typescript.md#typing-tcontext
 */
const test = anyTest as TestInterface<{
  db: PredictiveTextStudioDexie;
  storage: Storage;
}>;

/**
 * Create a new, empty database, and configured storage for each test case.
 */
test.beforeEach((t) => {
  const db = new PredictiveTextStudioDexie({
    indexedDB: new FDBFactory(),
    IDBKeyRange,
  });
  t.context.db = db;
  t.context.storage = new Storage(db);
});

test("storing a file", async (t) => {
  const { db, storage } = t.context;

  // At first, there's nothing in the DB:
  t.is(await db.files.count(), 0);

  await storage.saveFile("ExampleWordlist.xlsx", exampleWordlist);
  // Now there's one file in the DB!
  t.is(await db.files.count(), 1);
});

test("retrieving one file with .fetchAllFiles()", async (t) => {
  const { storage } = t.context;

  // Let's store a file that we will later try to fetch:
  const filename = "ExampleWordlist.xlsx";
  await storage.saveFile(filename, exampleWordlist);

  // We should find that it has been stored:
  const files = await storage.fetchAllFiles();
  t.is(files.length, 1);

  const file = files[0];
  t.is(file.name, filename);
  t.deepEqual(file.wordlist, exampleWordlist);
});

test("retrieving mulitple files with .fetchAllFiles()", async (t) => {
  const { storage } = t.context;

  const sources = [
    { name: "ExampleWordlist.xlsx", wordlist: exampleWordlist },
    { name: "[direct entry]", wordlist: [["ȻNEs", 12]] as WordList },
  ];

  sources.sort(byName);

  for (const { name, wordlist } of sources) {
    await storage.saveFile(name, wordlist);
  }

  let files = await storage.fetchAllFiles();
  t.is(files.length, 2);

  // This weird line extracts ONLY the properties found in sources,
  // so that we can just deepEqual with sources!
  files = files.map(({ name, wordlist }) => ({ name, wordlist }));
  files.sort(byName);

  t.deepEqual(files, sources);

  function byName(a: { name: string }, b: { name: string }): number {
    return a.name > b.name ? 1 : -1;
  }
});

test("update the bcp47 tag to database", async (t) => {
  const { db, storage } = t.context;
  // At first, nothing in the DB
  t.is(await db.packageInfo.count(), 0);
  await storage.updateBCP47Tag("en");
  // Now there's one file in the DB!
  t.is(await db.packageInfo.count(), 1);
});

test("retrieve bcp47tag from the database", async (t) => {
  const { storage } = t.context;
  await storage.updateBCP47Tag("en");
  const maybePackageInfo = await storage.fetchPackageInfo();
  if (maybePackageInfo != undefined) {
    const bcp47Tag = maybePackageInfo.bcp47Tag;
    t.is(bcp47Tag, "en");
  } else {
    t.fail("packageInfo is undefined.");
  }
});
