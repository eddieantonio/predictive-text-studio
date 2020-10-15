import "cypress-file-upload";

describe("Upload from the the landing page", function () {
  it("should find a button to press to upload a file", function () {
    cy.visit("/");

    cy.get("[data-cy=quick-start]")
      .as("quick-start")
      .scrollIntoView()
      .contains("Browse file");

    cy.get("@quick-start")
      .get("[data-cy=download-kmp]")
      .as("download-kmp")
      .should("have.attr", "data-download-state", "disabled");

    cy.get("@quick-start")
      .get("[data-cy=upload-spreadsheet]")
      .attachFile("sencoten-top-10.xlsx");

    cy.get("@download-kmp")
      .should("have.attr", "data-download-state", "ready")
      .click();
  });
});
