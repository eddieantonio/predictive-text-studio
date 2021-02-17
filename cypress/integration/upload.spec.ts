import "cypress-file-upload";

import path = require("path");

describe("Upload from the the landing page", function () {
  let downloadFolder: string;

  before(() => {
    downloadFolder = Cypress.env("downloadFolder");
  });

  beforeEach(() => {
    cy.task("clearDownloads");
    cy.allowUnlimitedDownloadsToFolder(downloadFolder);
    cy.visit("/");
    cy.disableSmoothScroll();
  });

  it("should find a button to press to upload a file", function () {
    // HACK: wait for the language list to populate
    cy.wait(3000);

    cy.data("download-kmp")
      .as("download-kmp")
      .should("have.attr", "data-download-state", "disabled");

    // Select the first option (should be Straits Salish)
    cy.data("autocomplete-label").type("straits").type("{enter}");

    const downloadedFilePath = path.join(downloadFolder, "Example.kmp");

    cy.data("quick-start")
      .as("quick-start")
      .scrollIntoView()
      .contains("Browse file");

    cy.readFile(downloadedFilePath).should("not.exist");

    const filename = "sencoten-top-10.xlsx";
    cy.fixture(filename, "base64").then((fixture) => {
      const testFile = new File(
        [Cypress.Blob.base64StringToBlob(fixture)],
        filename
      );
      const event = { dataTransfer: { files: [testFile] } };

      cy.get("@quick-start")
        .data("upload-dropzone")
        .trigger("dragenter", event);
      cy.get("@quick-start").data("upload-dropzone").trigger("drop", event);
    });

    cy.get("@download-kmp")
      .should("have.attr", "data-download-state", "ready")
      .click();

    cy.readZip(downloadedFilePath).then((zip) => {
      expect(zip.file("kmp.json")).to.not.be.null;
      expect(zip.file(/[.]js$/)).to.have.lengthOf(1);
    });
  });
});
