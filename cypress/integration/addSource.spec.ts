describe("Add source feature in LanguageSource page", function () {
  it("should find a button to press to add source by uploading file", function () {
    cy.visit("/languages");
    cy.get("[data-cy=languages-sources-btn]").contains("Sources").click();

    // Add source component should show after clicking the Add Source Button
    cy.get("[data-cy=language-sources-add-source]")
      .contains("Add Source")
      .click()
      .scrollIntoView();
    cy.get("[data-cy=add-source-options]").should("exist");

    cy.get("[data-cy=add-sources-splitbtn-left]").contains("UPLOAD").click();

    cy.get("[data-cy=add-source-upload-zone]").contains("label", "Browse file");

    // After clicking the close button, the addSource component should disappear
    cy.get("[data-cy=add-sources-close-btn]").contains("CLOSE").click();

    cy.get("[data-cy=add-source-options]").should("not.exist");
  });
});
