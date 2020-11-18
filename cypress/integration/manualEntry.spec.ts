describe("", function () {
  it("should find a button to press to add source by user entry manually", function () {
    cy.visit("/languages");
    cy.get("[data-cy=languages-sources-btn]").contains("Sources").click();

    // Add source component should show after clicking the details element
    cy.get("[data-cy=language-sources-add-sources]")
      .contains("Add Source")
      .click()
      .scrollIntoView();

    cy.get("[data-cy=add-sources-splitbtn-right]")
      .contains("Direct entry")
      .click()
      .scrollIntoView();
    cy.get("[data-cy=manual-entry-input-tablename]").type("Common Greetings");
    cy.get("[data-cy=manual-entry-input-word]").type("Hello");
    cy.get("[data-cy=manual-entry-input-count]").type("112");

    cy.get("[data-cy=manual-entry-delete]").contains("Delete").click();
    //TODO: Current row should be deleted
    
    cy.get("[data-cy=language-sources-add-sources]")
      .contains("Add Source")
      .click();
  });
});
