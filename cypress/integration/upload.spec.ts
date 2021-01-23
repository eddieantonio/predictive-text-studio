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
    cy.visit("/");
    cy.disableSmoothScroll();
  });

  it("should find a button to press to upload a file", function () {
    // we need a valid bcp47Tag to update the packageInfo
    cy.wait(3000);
    cy.data("autocomplete-input").type("z");
    cy.data("autocomplete__suggestion-list")
      .should("be.visible")
      .trigger("mouseover");
    cy.data("autocomplete-suggestions").first().click();

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
        name
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

    cy.readFile(downloadedFilePath);
  });
});
