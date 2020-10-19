import { expect } from "chai";
import fetch from "node-fetch";
import * as nock from "nock";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Blob = require("node-blob");

// TODO: Remvoe this file once we have other testing files

// Dummy Respond object
const responseBody = {
  languages: [
    { id: "km", name: "Khmer (Battambang Khmer)", keyboards: [Array] },
    {
      id: "kxm",
      name: "Khmer, Northern (Khmer Lue)",
      keyboards: [Array],
    },
    { id: "kdt", name: "Kuay (Old Khmer)", keyboards: [Array] },
  ],
};

// Dummy function for fetch testing
function testFetch() {
  return fetch(
    "https://api.keyman.com/search/?q=khmer&_ga=2.135402937.901015410.1603127399-773243877.1602533264"
  ).then((res: any) => {
    return res.json();
  });
}

// Dummy function for blob testing
function createURL() {
  const blob = new Blob(["testing"], { type: "application/octet-stream" });
  return blob;
}

// Testing without mocking fetch call
describe("Testing without mocking", () => {
  it("should be able to fetch data from Keyman API", async () => {
    const test = await testFetch();
    expect(test).to.have.haveOwnProperty("languages");
  });

  it("should be able to test blob", () => {
    const test = createURL();
    expect(test).to.have.haveOwnProperty("buffer");
  });
});

// Test with mocking fetch call
describe("Testing", () => {
  beforeEach(() => {
    // Mock all keyman search call
    nock("https://api.keyman.com")
      .get(
        "/search/?q=khmer&_ga=2.135402937.901015410.1603127399-773243877.1602533264"
      )
      .reply(200, responseBody);
  });

  it("should be able to test fetch", async () => {
    const test = await testFetch();
    expect(test.languages).to.have.lengthOf(3);
  });
});
