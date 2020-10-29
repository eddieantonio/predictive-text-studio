import test from "ava";
import * as sinon from "sinon";
import { PredictiveTextStudioWorkerImpl } from "@worker/predictive-text-studio-worker-impl";
import Storage, { StoredProjectData } from "@worker/storage";
import { StoredWordList } from "@worker/storage";
import * as compiler from "@predictive-text-studio/lexical-model-compiler";

test("compile model should throws error when no file is found in the IndexedDB", async (t) => {
  const storageStub = new Storage();
  sinon.stub(storageStub, "fetchAllFiles").returns(Promise.resolve([]));

  const workerWrapper = new PredictiveTextStudioWorkerImpl(storageStub);

  const error = await t.throwsAsync(workerWrapper.compileModel());
  t.is(error.message, "Cannot find any file in the IndexedDB");
});

test("compile model", async (t) => {
  const testStoredFile = {
    id: 1,
    name: "test",
    wordlist: [["test", 1]],
  } as StoredWordList;

  const storageStub = new Storage();
  sinon
    .stub(storageStub, "fetchAllFiles")
    .returns(Promise.resolve([testStoredFile]));
  const compilerMock = sinon.mock(compiler);
  compilerMock
    .expects("WordListFromArray")
    .once()
    .withArgs(testStoredFile.name, testStoredFile.wordlist);
  compilerMock.expects("compileModelFromLexicalModelSource").once();

  const workerWrapper = new PredictiveTextStudioWorkerImpl(storageStub);
  await workerWrapper.compileModel();

  compilerMock.verify();
  t.pass();
});

test("it should set project data and update to the database", async (t) => {
  const testStoredProjectData = {
    id: 1,
    langName: "English",
    bcp47Tag: "en",
    authorName: "UnknownAuthor",
  } as StoredProjectData;
  const storageStub = new Storage();
  const workerWrapper = new PredictiveTextStudioWorkerImpl(storageStub);
  const metadata = { languages: [{ name: "English", id: "en" }] };
  workerWrapper.setProjectData(metadata);
  sinon
    .stub(storageStub, "fetchProjectData")
    .returns(Promise.resolve(testStoredProjectData));
  t.is(await storageStub.fetchProjectData(), testStoredProjectData);
});
