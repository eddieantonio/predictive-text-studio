import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";
import * as sinon from "sinon";
import FDBFactory = require("fake-indexeddb/lib/FDBFactory");
import Storage, { PredictiveTextStudioDexie } from "@worker/storage";
import test from "ava";
import { PredictiveTextStudioWorkerImpl } from "@worker/predictive-text-studio-worker-impl";

global.fetch = require("node-fetch");

const languageName = "Kanienʼkehá꞉";
const languageTag = "moh";
const authorName = "Aidan";

test("it should set project data and update to the database", async (t) => {
  // TODO: there's WAY too much stubbing here where it really doesn't need to
  // be. Try to replace stubbing with something better...

  const storageStub = fakeStorage();
  const worker = new PredictiveTextStudioWorkerImpl(storageStub);

  await worker.setProjectData({
    languages: [{ name: languageName, id: languageTag }],
  });
  await worker.setProjectData({ authorName });

  const doesExist = await worker.doesProjectExist();
  t.is(doesExist, true);

  const data = await worker.fetchAllCurrentProjectMetadata();

  t.is(data.language, languageName);
  t.is(data.bcp47Tag, languageTag);
  t.is(data.authorName, authorName);
});

function fakeStorage() {
  const db = new PredictiveTextStudioDexie({
    indexedDB: new FDBFactory(),
    IDBKeyRange,
  });

  return new Storage(db);
}

test.todo(
  "Add dictionary to database and should return how many words were added"
);
