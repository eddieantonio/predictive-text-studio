import { PredictiveTextStudioDexie } from "./../src/worker/storage";
import { WordList } from "./../src/common/types";
import { expect } from "chai";
import Storage from "../src/worker/storage";
import FDBFactory = require("fake-indexeddb/lib/FDBFactory");
import * as IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";

describe("Storage", () => {
  let predictiveTextStudioDexie: PredictiveTextStudioDexie;
  let storage: Storage;
  let mockName: string;
  let mockWordList: WordList;

  beforeEach(() => {
    predictiveTextStudioDexie = new PredictiveTextStudioDexie({
      indexedDB: new FDBFactory(),
      IDBKeyRange,
    });
    storage = new Storage(predictiveTextStudioDexie);
    mockName = "testingName";
    mockWordList = [["testing", 1]];
  });

  it("should be albe to save a file", async () => {
    await storage.saveFile(mockName, mockWordList);
    const test = await predictiveTextStudioDexie.files.count();
    expect(test).to.equal(1);
  });
});
