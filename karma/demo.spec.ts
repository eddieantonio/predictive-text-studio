function testFetch() {
  return fetch(
    "https://api.keyman.com/search/?q=khmer&_ga=2.135402937.901015410.1603127399-773243877.1602533264"
  ).then((res) => {
    return res.json();
  });
}

function testBlob() {
  const blob = new Blob(["testing"], { type: "application/octet-stream" });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, "file.txt");
  } else {
    console.log("custom handling");
  }
}

// describe("Testing indexdeb", () => {
//   it("testing", () => {
//     // storage = new Storage();
//     // storage.saveFile(name, wordlist);
//   });
// });

describe("Testing fetch", () => {
  it("should be able to fetch data from KeymanApi", async () => {
    const test = await testFetch();
    console.log(Object.keys(test));
    expect(Object.keys(test)).toEqual(["languages", "keyboards"]);
  });
});

// Test
it('should execute "saveFile" as expected on browsers other than IE', () => {
  // spy on console.log()
  spyOn(console, "log");
  // create a mock navigator
  const mockNavigator = jasmine.createSpyObj([""]);
  // here we use the mockNavigator to simulate behavior
  spyOnProperty(window, "navigator", "get").and.returnValue(mockNavigator);
  testBlob();

  // verify that method has been called :)
  expect(console.log).toHaveBeenCalledWith("custom handling");
});

it('should execute "saveFile" as expected on IE', () => {
  // create a mock navigator
  const mockNavigator = jasmine.createSpyObj(["msSaveOrOpenBlob"]);
  // here we use the mockNavigator to simulate IE
  spyOnProperty(window, "navigator", "get").and.returnValue(mockNavigator);
  testBlob();

  // verify that method has been called :)
  expect(mockNavigator.msSaveOrOpenBlob).toHaveBeenCalled();
});
