import test from "ava";
import * as sinon from "sinon";
import { PredictiveTextStudioWorkerImpl } from "@worker/predictive-text-studio-worker-impl";
import Storage from "@worker/storage";
import { StoredProjectData } from "@worker/storage-models";
global.fetch = require("node-fetch");

test("it should set project data and update to the database", async (t) => {
  // TODO: there's WAY too much stubbing here where it really doesn't need to
  // be. Try to replace stubbing with something better...

  const languageName = "Kanienʼkehá꞉";
  const languageTag = "moh";
  const authorName = "Aidan";

  const testStoredProjectData = {
    id: 1,
    langName: languageName,
    bcp47Tag: languageTag,
    authorName: authorName,
  } as StoredProjectData;

  const storageStub = storageWithStubbedKeyboardData();

  sinon
    .stub(storageStub, "fetchProjectData")
    .returns(Promise.resolve(testStoredProjectData));

  const worker = new PredictiveTextStudioWorkerImpl(storageStub);
  worker.setProjectData({
    languages: [{ name: languageName, id: languageTag }],
  });
  t.deepEqual(await storageStub.fetchProjectData(), testStoredProjectData);
});

function storageWithStubbedKeyboardData() {
  const storage = new Storage();
  sinon.stub(storage, "fetchKeyboardData").returns(Promise.resolve([]));
  return storage;
}

test.todo(
  "Add dictionary to database and should return how many words were added"
);
