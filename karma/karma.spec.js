import { testFetch } from "./demo.js";

describe("testing mocha", () => {
  it("should expect true to be true", () => {
    expect(true).equal(true);
  });
});

describe("Testing fetch", () => {
  it("should be able to fetch data from KeymanApi", async () => {
    const test = await testFetch();
    console.log(Object.keys(test));
    expect(Object.keys(test)).deep.equal(["languages", "keyboards"]);
  });
});
