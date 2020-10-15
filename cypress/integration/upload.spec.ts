import "cypress-file-upload";

const path = require("path");

const downloadFolder = "cypress/downloads";

describe("Upload from the the landing page", function () {
  beforeEach(() => {
    cy.task("clearDownloads");

    // Allow downloads in Chromium-based browsers without prompts:
    // Adapted from: https://github.com/cypress-io/cypress-example-recipes/blob/0b2ded6d7f099bb6e9e637fb45b1560879424bd5/examples/testing-dom__download/cypress/integration/spec.js#L12-L23
    if (Cypress.browser.name !== "firefox") {
      cy.wrap(
        Cypress.automation("remote:debugger:protocol", {
          command: "Page.setDownloadBehavior",
          params: { behavior: "allow", downloadPath: downloadFolder },
        }),
        { log: false }
      );
    }
  });

  it("should find a button to press to upload a file", function () {
    cy.visit("/");

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
      .click();

    cy.readFile(downloadedFilePath);
  });
});
