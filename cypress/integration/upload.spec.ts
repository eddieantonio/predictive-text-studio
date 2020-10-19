import "cypress-file-upload";

const path = require("path");

describe("Upload from the the landing page", function () {
  let downloadFolder;

  before(() => {
    downloadFolder = Cypress.env("downloadFolder");
  });

  beforeEach(() => {
    cy.task("clearDownloads");
    cy.allowUnlimitedDownloadsToFolder(downloadFolder);
  });

  it("should find a button to press to upload a file", function () {
    cy.visit("/");

    console.log(downloadFolder);
    const downloadedFilePath = path.join(downloadFolder, "Example.kmp");

    cy.get("[data-cy=quick-start]")
      .as("quick-start")
      .scrollIntoView()
      .contains("Browse file");

    // Before we upload anything there should be no download link,
    // and no file downloaded in our folder
    cy.get("@quick-start")
      .get("[data-cy=download-kmp]")
      .as("download-kmp")
      .should("have.attr", "data-download-state", "disabled");
    cy.readFile(downloadedFilePath).should("not.exist");

    cy.get("@quick-start")
      .get("[data-cy=upload-spreadsheet]")
      .attachFile("sencoten-top-10.xlsx");

    cy.get("@download-kmp")
      .should("have.attr", "data-download-state", "ready")
      .click({force: true});

    cy.readFile(downloadedFilePath);
  });
});
