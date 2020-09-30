import test from "ava";
import FDBFactory = require("fake-indexeddb/lib/FDBFactory");
import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";

import Storage, { PredictiveTextStudioDexie } from "@worker/storage";
import { WordList } from "@common/types";

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

test("retrieving one file with .fetchAllFiles()", async (t) => {
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

test("retrieving mulitple files with .fetchAllFiles()", async (t) => {
  const db = new PredictiveTextStudioDexie({
    indexedDB: new FDBFactory(),
    IDBKeyRange,
  });
  const storage = new Storage(db);

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
