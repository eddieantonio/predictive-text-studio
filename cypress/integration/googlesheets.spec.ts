import "cypress-file-upload";

import path = require("path");

describe("Upload via Google Sheets API from the the landing page", function () {
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
    cy.onlyOn("localhost");
    // HACK: wait for the language list to populate
    cy.wait(3000);

    cy.data("download-kmp")
      .as("download-kmp")
      .should("have.attr", "data-download-state", "disabled");

    // Select the first option (should be Straits Salish)
    cy.data("autocomplete-label").type("straits").type("{enter}");

    // Switch to Google Sheets URL tab
    cy.data("landing-splitbtn-google-sheets").click();

    const downloadedFilePath = path.join(downloadFolder, "Example.kmp");

    cy.readFile(downloadedFilePath).should("not.exist");

    // Google Sheets URL to load
    const googlesheetsURL =
      "https://docs.google.com/spreadsheets/d/11NohN7t_iZ1hRx-0J7Qtr7ZMVlGl0ffjui5HLqzwhmU/edit#gid=0";

    cy.get("#input-googleSheetsURL").type(googlesheetsURL);
    cy.get("button").contains("Read Values").click();

    cy.wait(1000);

    cy.data("google-sheets-input").should("not.contain", "Could not connect");

    cy.get("@download-kmp")
      .should("have.attr", "data-download-state", "ready")
      .click();

    cy.readZip(downloadedFilePath).then((zip) => {
      expect(zip.file("kmp.json")).to.not.be.null;
      expect(zip.file(/[.]js$/)).to.have.lengthOf(1);
    });
  });
});
