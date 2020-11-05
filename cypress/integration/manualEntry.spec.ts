describe("", function () {
  it("should find a button to press to add source by user entry manually", function () {
    cy.visit("/languages");
    cy.get("button").contains("Sources").click();

    // Add source component should show after clicking the Add Source Button
    cy.get("button").contains("Add Source").click().scrollIntoView();
    cy.get("[data-cy=add-source-window]").should("exist");

    cy.get("button").contains("UPLOAD").click();

    cy.get("button").contains("DIRECT ENTRY").click().scrollIntoView();
    cy.get("[data-cy=manual-entry-input-tablename]").type("Common Greetings");
    cy.get("[data-cy=manual-entry-input-word]").type("Hello");
    cy.get("[data-cy=manual-entry-input-count]").type("112");

    cy.get("button").contains("Delete").click();
    //TODO: Current row should be deleted

    // After clicking the close button, the addSource component should disappear
    cy.get("button").contains("CLOSE").click();

    cy.get("[data-cy=add-source-window]").should("not.exist");
  });
});
