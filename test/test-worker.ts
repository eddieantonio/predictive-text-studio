import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";
import * as sinon from "sinon";
import FDBFactory = require("fake-indexeddb/lib/FDBFactory");
import Storage, { PredictiveTextStudioDexie } from "@worker/storage";
import test from "ava";
import { PredictiveTextStudioWorkerImpl } from "@worker/predictive-text-studio-worker-impl";
import { compileSuccess } from "@app/stores";
import * as Comlink from "comlink";
import { exampleWordlist } from "./fixtures";

global.fetch = require("node-fetch");

const languageName = "Kanienʼkehá꞉";
const languageTag = "moh";
const authorName = "Aidan";

test("it should set project data and update to the database", async (t) => {
  // TODO: there's WAY too much stubbing here where it really doesn't need to
  // be. Try to replace stubbing with something better...

  const storageStub = storageWithStubbedKeyboardData();
  const worker = new PredictiveTextStudioWorkerImpl(storageStub);

  await worker.setProjectData({
    languages: [{ name: languageName, id: languageTag }],
  });
  await worker.setProjectData({ authorName });

  const data = await worker.fetchAllCurrentProjectMetadata();

  t.is(data.langName, languageName);
  t.is(data.bcp47Tag, languageTag);
  t.is(data.authorName, authorName);
});

function storageWithStubbedKeyboardData() {
  const db = new PredictiveTextStudioDexie({
    indexedDB: new FDBFactory(),
    IDBKeyRange,
  });

  const storage = new Storage(db);
  sinon.stub(storage, "fetchKeyboardData").returns(Promise.resolve([]));
  return storage;
}

test.todo(
  "Add dictionary to database and should return how many words were added"
);

test("it should recompile the KMP file after setting project data", async (t) => {

  const db = new PredictiveTextStudioDexie({
    indexedDB: new FDBFactory(),
    IDBKeyRange,
  });
  const storage = new Storage(db);
  const worker = new PredictiveTextStudioWorkerImpl(storage);

  // save a file so it can be compiled (?)
  await storage.saveFile({
    name: "ExampleWordlist.xlsx",
    wordlist: exampleWordlist,
    size: exampleWordlist.length,
    type: "xlsx",
  });

  // save project data so it can be compiled (?)
  const storedProjectData = {
    langName: "English",
    bcp47Tag: "en",
    authorName: "example",
    modelID: "unknownAuthor.en.example",
    copyright: "©",
    version: "1.0.0",
  };
  await storage.updateProjectData(storedProjectData);

  // setup compilation listener on compileSuccess store
  worker.onPackageCompileStart(
    Comlink.proxy(() => {
      compileSuccess.set(false);
    })
  );
  worker.onPackageCompileSuccess(
    Comlink.proxy(() => {
      compileSuccess.set(true);
    })
  );
  worker.onPackageCompileError(
    Comlink.proxy((err) => {
      t.fail("Compilation Failed");
    })
  );

  // 0: compileSuccess is true; 1: compileSuccess is false because compilation has begun; 2: compileSuccess is true because compilation succeeded
  let compileCount = 0;

  // listen to changes to the package compilation
  compileSuccess.subscribe((currentValue) => {
    switch (compileCount) {
      case 0:
        t.true(currentValue);
        compileCount++;
        break;
      case 1:
        t.false(currentValue);
        compileCount++;
        break;
      case 2:
        t.true(currentValue);
        compileCount++;
        break;
      default:
        t.fail("Too many compilations occurred")
    }
  });

  await worker.setProjectData({
    languages: [{ name: languageName, id: languageTag }],
  });

})
