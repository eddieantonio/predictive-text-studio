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

  // TODO: Removed due to bug #280. Should be re-introduced once bug #280 is resolved
  // it("should set the BCP-47 tag to 'und' if only a file is uploaded", function () {
  //   const downloadedFilePath = path.join(downloadFolder, "Example.kmp");

  //   cy.data("landing-page-continue-button").should(
  //     "have.class",
  //     "quick-start__submit-button--disabled"
  //   );

  //   cy.data("quick-start")
  //     .as("quick-start")
  //     .scrollIntoView()
  //     .contains("Browse file");

  //   cy.readFile(downloadedFilePath).should("not.exist");

  //   const filename = "sencoten-top-10.xlsx";
  //   cy.fixture(filename, "base64").then((fixture) => {
  //     const testFile = new File(
  //       [Cypress.Blob.base64StringToBlob(fixture)],
  //       filename
  //     );
  //     const event = { dataTransfer: { files: [testFile] } };

  //     cy.get("@quick-start")
  //       .data("upload-dropzone")
  //       .trigger("dragenter", event);
  //     cy.get("@quick-start").data("upload-dropzone").trigger("drop", event);
  //   });

  //   cy.data("autocomplete-subtext").contains("und");

  //   cy.data("landing-page-continue-button")
  //     .should("not.have.class", "quick-start__submit-button--disabled")
  //     .click();
  // });

  // it("should disable the continue button if language and file are not provided", () => {
  //   cy.data("landing-page-continue-button")
  //     .scrollIntoView()
  //     .should("be.visible");
  //   cy.data("landing-page-continue-button").should(
  //     "have.class",
  //     "quick-start__submit-button--disabled"
  //   );
  // });

  // it("should disable to continue if only language is provided", () => {
  //   cy.data("landing-page-continue-button")
  //     .scrollIntoView()
  //     .should("be.visible");
  //   cy.data("autocomplete-label").type("zh");
  //   cy.data("landing-page-continue-button").should(
  //     "have.class",
  //     "quick-start__submit-button--disabled"
  //   );
  // });

  it("should disable to continue if only file is provided", () => {
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

  it("should have the 'customize' button enabled after uploading a file and selecting a language", function () {
    cy.data("landing-page-continue-button").should(
      "have.class",
      "quick-start__submit-button--disabled"
    );

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

    cy.data("landing-page-continue-button")
      .should("not.have.class", "quick-start__submit-button--disabled")
      .click();
  });
});
