import "cypress-file-upload";

describe("World's crappiest Predictive Text Studio [please delete when more UI work is done]", function () {
  it("should print the model code when a file is uploaded", function () {
    cy.visit("/");

    cy.get("[data-cy=upload-file]").attachFile({
      // TODO: better file path?
      filePath: "../../test/ExampleWordlist.xlsx",
      fileName: "ExampleWordlist.xlsx",
    });
    cy.get("[data-cy=download-kmp]").click();
    cy.contains("pre", "function");
  });
});
