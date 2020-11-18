describe("Add source feature in LanguageSource page", function () {
  it("should find a button to press to add source by uploading file", function () {
    cy.visit("/languages");
    cy.get("[data-cy=languages-sources-btn]").contains("Sources").click();

    // Add source component should show after clicking the details element
    cy.get("[data-cy=language-sources-add-sources]").click().scrollIntoView();

    cy.get("[data-cy=add-sources-splitbtn-left]").contains("Upload").click();
    cy.get("[data-cy=add-source-upload-zone]").contains("label", "Browse file");

    cy.get("[data-cy=language-sources-add-sources]")
      .contains("Add Source")
      .click();
  });
});
