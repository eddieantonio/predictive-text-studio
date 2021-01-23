import "cypress-file-upload";

const path = require("path");

describe("Upload from the the landing page", () => {
  let downloadFolder;

  before(() => {
    downloadFolder = Cypress.env("downloadFolder");
  });

  beforeEach(() => {
    cy.visit("/");
    cy.task("clearDownloads");
    cy.allowUnlimitedDownloadsToFolder(downloadFolder);
    cy.disableSmoothScroll();
  });

  it("should disable the continue button if language and file are not provided", () => {
    cy.data("landing-page-continue-button")
      .scrollIntoView()
      .should("be.visible");
    cy.data("landing-page-continue-button").should(
      "have.class",
      "quick-start__submit-button--disabled"
    );
  });

  it("should disable to continue if only language is provided", () => {
    cy.data("landing-page-continue-button")
      .scrollIntoView()
      .should("be.visible");
    cy.data("autocomplete-input").type("zh");
    cy.data("landing-page-continue-button").should(
      "have.class",
      "quick-start__submit-button--disabled"
    );
  });

  it("should disable to continue if only file is provided", () => {
    // we need a valid bcp47Tag to update the packageInfo
    cy.data("autocomplete-input").scrollIntoView().should("be.visible");
    cy.data("autocomplete-input").type("zh");

    const downloadedFilePath = path.join(downloadFolder, "Example.kmp");

    cy.data("quick-start")
      .as("quick-start")
      .scrollIntoView()
      .contains("Browse file");

    // Before we upload anything there should be no file downloaded in our folder
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

    cy.data("landing-page-continue-button").should(
      "have.class",
      "quick-start__submit-button--disabled"
    );
  });

  it("should enable to continue if both language and file are provided", () => {
    // Step 1: Provide correct language
    cy.wait(3000);
    cy.data("autocomplete-input").type("z");
    cy.data("autocomplete__suggestion-list")
      .should("be.visible")
      .trigger("mouseover");
    cy.data("autocomplete-suggestions").first().click();
    // Step 2: Provide a file

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

    cy.data("landing-page-continue-button").click();
    // Step3: Check if it goes to language page to verify
    cy.url().should("contain", "/languages");
  });
});
