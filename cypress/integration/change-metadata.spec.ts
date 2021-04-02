import "cypress-file-upload";

import path = require("path");

describe("Changing metadata in the language info page", function () {
  const languageName = "Makah";
  const authorName = "Eddie";
  const copyright = "© 2018 My Cool Organization";

  beforeEach(() => {
    cy.visit("/languages");
    languageInput().clear().type(languageName).blur();
    cy.data("input-author-name").clear().type(authorName);
    cy.data("input-copyright").clear().type(copyright);

    // Wait for the settings to change in the database
    // TODO: can we avoid waiting here?
    cy.wait(1000);
  });

  it("should find a button to press to add source by uploading file", function () {
    // Navigate away page...
    cy.visit("about:blank");
    // ...and then come back
    cy.visit("/languages");

    // Wait for the page to load completely
    // TODO: can we avoid waiting here?
    cy.wait(1000);

    languageInput().its("value").should("be", languageName);
    cy.data("input-author-name").its("value").should("be", authorName);
    cy.data("input-copyright").its("value").should("be", copyright);
  });

  it("should recompile KMP on metadata change", function () {
    const downloadFolder = Cypress.env("downloadFolder");
    cy.task("clearDownloads");
    cy.allowUnlimitedDownloadsToFolder(downloadFolder);
    // upload a file
    cy.data("languages-sources-btn").contains("Sources").click();

    // Add source component should show after clicking the details element
    cy.data("language-sources-add-sources").click().scrollIntoView();

    cy.data("add-sources-splitbtn-upload").contains("Upload").click();
    cy.data("upload-dropzone").contains("label", "Browse file");

    cy.data("language-sources-add-sources").contains("Add Source").click();



    const downloadedFilePath = path.join(downloadFolder, "Example.kmp");

    cy.readFile(downloadedFilePath).should("not.exist");

    const filename = "sencoten-top-10.xlsx";
    cy.fixture(filename, "base64").then((fixture) => {
      const testFile = new File(
        [Cypress.Blob.base64StringToBlob(fixture)],
        filename
      );
      const event = { dataTransfer: { files: [testFile] } };

      cy.data("upload-dropzone")
        .trigger("dragenter", event);
      cy.get("@quick-start").data("upload-dropzone").trigger("drop", event);
    });

    // wait for compilation
    cy.wait(200);

    cy.data("languages-download-btn")
      .should("not.have.class", "button--disabled")
      .click();

    cy.readZip(downloadedFilePath).then((zip) => {
      expect(zip.file("kmp.json")).to.not.be.null;
      expect(zip.file(/[.]js$/)).to.have.lengthOf(1);
    });
  });

  function languageInput() {
    return cy.data("input-language-name").find("input");
  }
});
