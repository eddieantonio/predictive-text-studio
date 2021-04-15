// TODO: do not use { force: true } option
// This option was added as a workaround for test scenarios failing due to "the center of this element is hidden from view"
// Related discussion on repo: https://github.com/eddieantonio/predictive-text-studio/pull/293#issuecomment-817975467
describe("Add source feature in LanguageSource page", function () {
  beforeEach(() => {
    cy.clearLocalDataExceptKeyboards();
    cy.generateProject();
  });

  it("should find a button to press to add source by uploading file", function () {
    cy.visit("/customize");
    cy.data("customize-sources-btn").contains("Sources").click();

    // Add source component should show after clicking the details element
    cy.data("language-sources-add-sources").click().scrollIntoView();

    cy.data("add-sources-splitbtn-upload")
      .contains("Upload")
      .click({ force: true });
    cy.data("upload-dropzone").contains("label", "Browse file");

    cy.data("language-sources-add-sources").contains("Add Source").click();
  });
});
