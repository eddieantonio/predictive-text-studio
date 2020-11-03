import test from "ava";
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
