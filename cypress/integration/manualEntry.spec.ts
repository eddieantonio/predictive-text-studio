describe("", function () {
  it("should find a button to press to add source by user entry manually", function () {
    cy.visit("/languages");
    cy.data("languages-sources-btn").contains("Sources").click();

    // Add source component should show after clicking the details element
    cy.data("language-sources-add-sources")
      .contains("Add Source")
      .click()
      .scrollIntoView();

    cy.data("add-sources-splitbtn-right")
      .contains("Direct entry")
      .click()
      .scrollIntoView();
    cy.data("manual-entry-input-tablename").type("Common Greetings");
    cy.data("manual-entry-input-word").type("Hello");
    cy.data("manual-entry-input-count").type("112");

    cy.data("manual-entry-delete").contains("Delete").click();
    //TODO: Current row should be deleted

    cy.data("language-sources-add-sources").contains("Add Source").click();
  });
});
