import test from "ava";
<<<<<<< HEAD
import * as sinon from "sinon";
import { PredictiveTextStudioWorkerImpl } from "@worker/predictive-text-studio-worker-impl";
import Storage, { StoredProjectData } from "@worker/storage";

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

test.todo(
  "Add dictionary to database and should return how many words were added"
);
=======
>>>>>>> fix test fail
import Storage from "@worker/storage";
import * as sinon from "sinon";
import * as compiler from "@predictive-text-studio/lexical-model-compiler";
import { keymanKeyboardDataStub, storedFileStub } from "./fixtures/index";
import { KeymanApi } from "@worker/keyman-api-service";
import { PredictiveTextStudioWorkerImpl } from "@worker/predictive-text-studio-worker-impl";
global.fetch = require("node-fetch");

let storageStub: Storage;
let keymanApiMock: KeymanApi;
let workerWrapper: PredictiveTextStudioWorkerImpl;

test.before("optional title", () => {
  storageStub = new Storage();
  keymanApiMock = new KeymanApi();
  sinon
    .stub(storageStub, "fetchAllFiles")
    .returns(Promise.resolve([storedFileStub]));
  // sinon
  //   .stub(keymanApiMock, "getLanaguageData")
  //   .returns(Promise.resolve(keymanKeyboardDataStub));
  workerWrapper = new PredictiveTextStudioWorkerImpl(
    storageStub,
    keymanApiMock
  );
});

test("compile model", async (t) => {
  const compilerMock = sinon.mock(compiler);
  compilerMock
    .expects("WordListFromArray")
    .once()
    .withArgs(storedFileStub.name, storedFileStub.wordlist);
  compilerMock.expects("compileModelFromLexicalModelSource").once();

  await workerWrapper.compileModel();

  compilerMock.verify();
  t.pass();
});

// test("fetch and save Keyman keyboard data", async (t) => {
//   // await keymanApiMock.getLanaguageData().then((aaa) => {
//   //   console.log(aaa);
//   // });
// });

test("compile model should throws error when no file is found in the IndexedDB", async (t) => {
  const storageStub = new Storage();
  sinon.stub(storageStub, "fetchAllFiles").returns(Promise.resolve([]));

  const workerWrapper = new PredictiveTextStudioWorkerImpl(
    storageStub,
    keymanApiMock
  );

  const error = await t.throwsAsync(workerWrapper.compileModel());
  t.is(error.message, "Cannot find any file in the IndexedDB");
});
