import fetch from "node-fetch";

// Dummy function for blob testing
function testBlob() {
  const blob = new Blob(["testing"], { type: "application/pdf" });
}

// Dummy function for fetch testing
function testFetch() {
  return fetch(
    "https://api.keyman.com/search/?q=khmer&_ga=2.135402937.901015410.1603127399-773243877.1602533264"
  ).then((res: any) => {
    return res.json();
  });
}

describe("Testing fetch", () => {
  it("should be able to fetch data from KeymanApi", async () => {
    const test = await testFetch();
    expect(test).toHaveProperty("languages");
  });
});

describe("pdf blob", () => {
  it("should mock correctly", () => {
    const mBlob = { size: 1024, type: "application/pdf" };
    const blobSpy = jest
      .spyOn(global, "Blob")
      .mockImplementationOnce(() => mBlob);
    //const logSpy = jest.spyOn(console, "log");
    testBlob();
    expect(blobSpy).toBeCalledWith(["testing"], {
      type: "application/pdf",
    });
    //expect(logSpy).toBeCalledWith(mBlob);
  });
});
