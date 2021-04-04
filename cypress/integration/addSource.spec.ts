describe("Add source feature in LanguageSource page", function () {
  it("should find a button to press to add source by uploading file", function () {
    cy.visit("/customize");
    cy.data("customize-sources-btn").contains("Sources").click();

    // Add source component should show after clicking the details element
    cy.data("language-sources-add-sources").click().scrollIntoView();

    cy.data("add-sources-splitbtn-upload").contains("Upload").click();
    cy.data("upload-dropzone").contains("label", "Browse file");

    cy.data("language-sources-add-sources").contains("Add Source").click();
  });
});
