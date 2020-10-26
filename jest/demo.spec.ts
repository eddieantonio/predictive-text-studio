import { PredictiveTextStudioDexie } from "./../src/worker/storage";
import fetch from "node-fetch";
// import FDBFactory = require("fake-indexeddb/lib/FDBFactory");
// import * as IDBKeyRange from "../types/fake-indexeddb/lib/FDBKeyRange";

// Dummy function for blob testing
function testBlob() {
  return new Blob(["testing"], { type: "application/octet-stream" });
}

// Dummy function for fetch testing
function testFetch() {
  return fetch(
    "https://api.keyman.com/search/?q=khmer&_ga=2.135402937.901015410.1603127399-773243877.1602533264"
  ).then((res: any) => {
    return res.json();
  });
}

// Fetch Demo
describe("Testing fetch", () => {
  it("should be able to fetch data from KeymanApi", async () => {
    const test = await testFetch();
    //expect(test).toHaveProperty("languages");
  });
});

// Blob Demo
describe("Testing blob", () => {
  it("should mock correctly", () => {
    // Set up mocking to initialize Blob
    const mockBlob = { type: "application/octet-stream" };
    const blobSpy = jest
      .spyOn(global, "Blob")
      .mockImplementationOnce((): any => mockBlob);

    // Call the function
    const test = testBlob();

    // Assert
    // expect(blobSpy).toBeCalledWith(["testing"], {
    //   type: "application/octet-stream",
    // });
    expect(test.type).toEqual("application/octet-stream");
  });
});
