import anyTest, { TestInterface } from "ava";

import FDBFactory = require("fake-indexeddb/lib/FDBFactory");
import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";

import Storage, { PredictiveTextStudioDexie } from "@worker/storage";
import { ExportedProjectData } from "@worker/storage-models";
import { WordListSource, StoredWordList } from "@common/types";

import { exampleWordlist, keymanKeyboardDataStub } from "./fixtures";

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

  await storage.saveFile({
    name: "ExampleWordlist.xlsx",
    wordlist: exampleWordlist,
    size: exampleWordlist.length,
    type: "xlsx",
  });
  // Now there's one file in the DB!
  t.is(await db.files.count(), 1);
});

test("deleting a file", async (t) => {
  const { db, storage } = t.context;

  // Create a file
  t.is(await db.files.count(), 0);

  await storage.saveFile({
    name: "ExampleWordlist.xlsx",
    wordlist: exampleWordlist,
    size: exampleWordlist.length,
    type: "xlsx",
  });

  t.is(await db.files.count(), 1);

  // Delete it
  await storage.deleteFile("ExampleWordlist.xlsx");

  // There should be no file remaining
  t.is(await db.files.count(), 0);
});

test("editing a file", async (t) => {
  const { db, storage } = t.context;

  // Create a file
  t.is(await db.files.count(), 0);

  await storage.saveFile({
    name: "ExampleWordlist.xlsx",
    wordlist: exampleWordlist,
    size: exampleWordlist.length,
    type: "xlsx",
  });

  t.is(await db.files.count(), 1);

  const newWordList = exampleWordlist.concat(["NEW_WORD", 22]);

  // Edit it
  await storage.saveFile({
    name: "ExampleWordlist.xlsx",
    wordlist: newWordList,
    size: newWordList.length,
    type: "xlsx",
  });

  // Check that the wordlist has been modified:
  const files = await storage.fetchAllFiles();
  t.is(files.length, 1);

  const file = files[0];
  t.is(file.name, "ExampleWordlist.xlsx");
  t.deepEqual(file.wordlist, newWordList);
  t.notDeepEqual(file.wordlist, exampleWordlist);
});

test("retrieving one file with .fetchAllFiles()", async (t) => {
  const { storage } = t.context;

  // Let's store a file that we will later try to fetch:
  const filename = "ExampleWordlist.xlsx";
  await storage.saveFile({
    name: filename,
    wordlist: exampleWordlist,
    size: exampleWordlist.length,
    type: "xlsx",
  });

  // We should find that it has been stored:
  const files = await storage.fetchAllFiles();
  t.is(files.length, 1);

  const file = files[0];
  t.is(file.name, filename);
  t.deepEqual(file.wordlist, exampleWordlist);
});

test("retrieving mulitple files with .fetchAllFiles()", async (t) => {
  const { storage } = t.context;

  const sources: WordListSource[] = [
    {
      name: "ExampleWordlist.xlsx",
      wordlist: exampleWordlist,
      size: exampleWordlist.length,
      type: "xlsx",
    },
    {
      name: "[direct entry]",
      wordlist: [["ȻNEs", 12]],
      size: 1,
      type: "direct-entry",
    },
  ];

  sources.sort(byName);

  for (const source of sources) {
    await storage.saveFile(source);
  }

  let files: StoredWordList[] = await storage.fetchAllFiles();
  t.is(files.length, 2);

  // This weird line extracts ONLY the properties found in sources,
  // so that we can just deepEqual with sources!
  files = files.map(({ id, name, wordlist, size, type }) => ({
    id,
    name,
    wordlist,
    size,
    type,
  }));
  files.sort(byName);

  t.deepEqual(files, sources);

  function byName(a: { name: string }, b: { name: string }): number {
    return a.name > b.name ? 1 : -1;
  }
});

test("it should reject the promise if the database is empty", async (t) => {
  const { storage } = t.context;

  await t.throwsAsync(() => storage.fetchProjectData());
});

test("update the BCP-47 tag to database", async (t) => {
  const { db, storage } = t.context;
  // At first, nothing in the DB
  t.is(await db.projectData.count(), 0);

  // Store it.
  await storage.updateBCP47Tag("en");

  // Now there's one package info record in the DB!
  t.is(await db.projectData.count(), 1);
});

test("retrieve BCP-47 tag from the database", async (t) => {
  const { storage } = t.context;
  await storage.updateBCP47Tag("en");

  const projectData = await storage.fetchProjectData();
  const bcp47Tag = projectData.bcp47Tag;
  t.is(bcp47Tag, "en");
});

test("update the project data to database", async (t) => {
  const { db, storage } = t.context;
  // At first, nothing in the DB
  t.is(await db.projectData.count(), 0);
  const storedProjectData = {
    language: "English",
    bcp47Tag: "en",
    authorName: "example",
    modelID: "unknownAuthor.en.example",
    copyright: "©",
    version: "1.0.0",
  };

  await storage.setProjectData(storedProjectData);
  // Now there's one package info record in the DB!
  t.is(await db.projectData.count(), 1);
});

test("retrieve project data from the database", async (t) => {
  const { storage } = t.context;
  const storedProjectData = {
    language: "English",
    bcp47Tag: "en",
    authorName: "example",
    modelID: "unknownAuthor.en.example",
    copyright: "©",
    version: "1.0.0",
  };
  await storage.setProjectData(storedProjectData);

  const projectData = await storage.fetchProjectData();
  const language = projectData.language;
  t.is(language, "English");
  const bcp47Tag = projectData.bcp47Tag;
  t.is(bcp47Tag, "en");
  const authorName = projectData.authorName;
  t.is(authorName, "example");
  const modelID = projectData.modelID;
  t.is(modelID, "unknownAuthor.en.example");
  const copyright = projectData.copyright;
  t.is(copyright, "©");
  const version = projectData.version;
  t.is(version, "1.0.0");
});

test("retrieve if project exists in database", async (t) => {
  const { storage } = t.context;

  let doesProjectExist: boolean;

  doesProjectExist = await storage.doesProjectExist();
  t.is(doesProjectExist, false);

  const storedProjectData = {
    language: "English",
    bcp47Tag: "en",
    authorName: "example",
    modelID: "unknownAuthor.en.example",
    copyright: "©",
    version: "1.0.0",
  };
  await storage.setProjectData(storedProjectData);

  doesProjectExist = await storage.doesProjectExist();
  t.is(doesProjectExist, true);
});

test("update project data multiple times ", async (t) => {
  const { storage } = t.context;

  const languageName = "Makah";
  const languageCode = "myh";
  const author = "Eddie Antonio Santos";
  const copyright = "2018 National Research Council Canada";

  /* Store the initial data */
  await storage.setProjectData({
    language: languageName,
    bcp47Tag: languageCode,
  });

  const initialProject = await storage.fetchProjectData();
  t.is(initialProject.language, languageName);
  t.is(initialProject.bcp47Tag, languageCode);
  t.not(initialProject.authorName, author);
  t.not(initialProject.copyright, copyright);

  /* Update the data, but JUST the author! */
  await storage.setProjectData({ authorName: author });

  const changedProject = await storage.fetchProjectData();
  t.notDeepEqual(changedProject, initialProject);
  t.is(changedProject.language, initialProject.language);
  t.is(changedProject.bcp47Tag, initialProject.bcp47Tag);
  t.not(changedProject.authorName, initialProject.authorName);
  t.is(changedProject.authorName, author);
  t.not(changedProject.copyright, copyright);

  /* Now update the copyright */
  await storage.setProjectData({ copyright: copyright });

  /* The final update should have all fields updated. */
  const finalProject = await storage.fetchProjectData();
  t.notDeepEqual(finalProject, changedProject);
  t.is(finalProject.language, changedProject.language);
  t.is(finalProject.bcp47Tag, changedProject.bcp47Tag);
  t.is(finalProject.authorName, changedProject.authorName);
  t.not(finalProject.copyright, changedProject.copyright);
  t.is(finalProject.copyright, copyright);
});

test("save Keyman keyboard data with addKeyboardData", async (t) => {
  const { db, storage } = t.context;

  t.is(await db.keyboardData.count(), 0);
  await storage.addKeyboardData(
    keymanKeyboardDataStub[0].language,
    keymanKeyboardDataStub[0].bcp47Tag
  );

  t.is(await db.keyboardData.count(), 1);
});

test("retrieve Keyman keyboard data with addKeyboardData", async (t) => {
  const { storage } = t.context;
  await storage.addKeyboardData(
    keymanKeyboardDataStub[0].language,
    keymanKeyboardDataStub[0].bcp47Tag
  );
  await storage.fetchKeyboardData().then((data) => {
    t.is(data.length, 1);
  });
});

test("delete all Keyman keyboard data with deleteKeyboardData", async (t) => {
  const { storage } = t.context;
  await storage.addKeyboardData(
    keymanKeyboardDataStub[0].language,
    keymanKeyboardDataStub[0].bcp47Tag
  );
  await storage.deleteKeyboardData();
  await storage.fetchKeyboardData().then((data) => {
    t.is(data.length, 0);
  });
});

test("store the KMP package to database", async (t) => {
  const { db, storage } = t.context;
  // At first, nothing in the DB
  t.is(await db.KMPFileData.count(), 0);
  const kmp = new ArrayBuffer(1);
  await storage.saveCompiledKMPAsArrayBuffer(kmp);
  // Now there's one package info record in the DB!
  t.is(await db.KMPFileData.count(), 1);
});

test("retrieve the KMP package from the database", async (t) => {
  const { storage } = t.context;
  const kmp = new ArrayBuffer(1);
  await storage.saveCompiledKMPAsArrayBuffer(kmp);

  const kmpRetrieved = await storage.fetchCompiledKMPFile();
  t.assert(kmpRetrieved instanceof ArrayBuffer);
});

test("exporting project data", async (t) => {
  const { storage } = t.context;

  const fileData: StoredWordList = {
    name: "ExampleWordlist.xlsx",
    wordlist: exampleWordlist,
    size: exampleWordlist.length,
    type: "xlsx",
  };

  await storage.saveFile(fileData);

  const storedProjectData = {
    language: "English",
    bcp47Tag: "en",
    authorName: "example",
    modelID: "unknownAuthor.en.example",
    copyright: "©",
    version: "1.0.0",
  };
  await storage.setProjectData(storedProjectData);

  const data = await storage.exportProjectData();

  const { projectData, files }: ExportedProjectData = JSON.parse(data);

  delete projectData.id;

  t.deepEqual(projectData, storedProjectData);
  t.deepEqual(files[0], fileData);
});

test("importing project data", async (t) => {
  const { storage } = t.context;

  const fileString =
    '{"projectData":{"id":0,"authorName":"example","bcp47Tag":"en","language":"English","modelID":"unknownAuthor.en.example","copyright":"©","version":"1.0.0"},"files":[{"name":"ExampleWordlist.xlsx","wordlist":[["TŦE",13644],["E",9134],["SEN",4816],["Ȼ",3479],["SW̱",2621],["NIȽ",2314],["U¸",2298],["I¸",1988],["ȻSE",1925],["I",1884]],"size":10,"type":"xlsx","id":1}]}';

  await storage.importProjectData(fileString);

  // We should find that it has been stored:
  const files = await storage.fetchAllFiles();
  t.is(files.length, 1);

  const file = files[0];
  t.is(file.name, "ExampleWordlist.xlsx");
  t.deepEqual(file.wordlist, exampleWordlist);

  const projectData = await storage.fetchProjectData();
  const language = projectData.language;
  t.is(language, "English");
  const bcp47Tag = projectData.bcp47Tag;
  t.is(bcp47Tag, "en");
  const authorName = projectData.authorName;
  t.is(authorName, "example");
  const modelID = projectData.modelID;
  t.is(modelID, "unknownAuthor.en.example");
  const copyright = projectData.copyright;
  t.is(copyright, "©");
  const version = projectData.version;
  t.is(version, "1.0.0");
});
