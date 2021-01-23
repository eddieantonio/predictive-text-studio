import test from "ava";
import * as sinon from "sinon";
import { PredictiveTextStudioWorkerImpl } from "@worker/predictive-text-studio-worker-impl";
import Storage from "@worker/storage";
global.fetch = require("node-fetch");

test("it should set project data and update to the database", async (t) => {
  // TODO: there's WAY too much stubbing here where it really doesn't need to
  // be. Try to replace stubbing with something better...

  const languageName = "Kanienʼkehá꞉";
  const languageTag = "moh";
  const authorName = "Aidan";

  const storageStub = storageWithStubbedKeyboardData();
  const worker = new PredictiveTextStudioWorkerImpl(storageStub);

  worker.setProjectData({
    languages: [{ name: languageName, id: languageTag }],
  });
  worker.setProjectData({ authorName });

  const data = await worker.fetchAllCurrentProjectMetadata();

  t.is(data.langName, languageName);
  t.is(data.bcp47Tag, languageTag);
  t.is(data.authorName, authorName);
});

function storageWithStubbedKeyboardData() {
  const storage = new Storage();
  sinon.stub(storage, "fetchKeyboardData").returns(Promise.resolve([]));
  return storage;
}

test.todo(
  "Add dictionary to database and should return how many words were added"
);
