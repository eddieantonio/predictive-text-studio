import "cypress-file-upload";

import path = require("path");

describe("Upload from the the landing page and Download KMP", function () {
  let downloadFolder: string;

  before(() => {
    downloadFolder = Cypress.env("downloadFolder");
  });

  beforeEach(() => {
    cy.clearLocalData();
    cy.task("clearDownloads");
    cy.allowUnlimitedDownloadsToFolder(downloadFolder);
  });

  it("should find a button to press to upload a file", function () {

    cy.intercept("https://cache.predictivetext.studio/cached-keyman-api.json", {
      fixture: "response-keyman.json",
    });
    // Load languages
    cy.visit("/");
    cy.wait(500);
    // Render obtained languages
    cy.visit("/");
    cy.wait(500);

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

    cy.wait(1000);
    cy.get("@download-kmp")
      .should("have.attr", "data-download-state", "ready")
      .click();

    cy.readZip(downloadedFilePath).then((zip) => {
      expect(zip.file("kmp.json")).to.not.be.null;
      expect(zip.file(/[.]js$/)).to.have.lengthOf(1);
    });
  });

  it("should download kmp file from languages download button", function () {
    cy.generateProject();
    cy.wait(500);
    cy.visit("/customize");
    cy.wait(500);

    const downloadedFilePath = path.join(
      downloadFolder,
      "Predictive-Text-Studio-Dictionary.kmp"
    );

    cy.readFile(downloadedFilePath).should("not.exist");

    cy.data("customize-download-btn").scrollIntoView().should("be.visible");

    cy.data("customize-download-btn")
      .should("not.have.class", "button--disabled")
      .click();

    cy.readFile(downloadedFilePath).should("exist");
  });
});
