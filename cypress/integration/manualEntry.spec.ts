describe("", function () {
  it("should find a button to press to add source by user entry manually", function () {
    cy.visit("/languages");
    cy.get("[data-cy=languages-sources-btn]").contains("Sources").click();

    // Add source component should show after clicking the Add Source Button
    cy.get("[data-cy=language-sources-add-source]")
      .contains("Add Source")
      .click()
      .scrollIntoView();
    cy.get("[data-cy=add-source-options]").should("exist");

    cy.get("[data-cy=add-sources-splitbtn-right]")
      .contains("Direct entry")
      .click()
      .scrollIntoView();
    cy.get("[data-cy=manual-entry-input-tablename]").type("Common Greetings");
    cy.get("[data-cy=manual-entry-input-word]").type("Hello");
    cy.get("[data-cy=manual-entry-input-count]").type("112");

    cy.get("[data-cy=manual-entry-delete]").contains("Delete").click();
    //TODO: Current row should be deleted

    // After clicking the close button, the addSource component should disappear
    cy.get("[data-cy=add-sources-close-btn]").contains("Close").click();

    cy.get("[data-cy=add-source-options]").should("not.exist");
  });
});
