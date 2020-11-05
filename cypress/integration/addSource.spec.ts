describe("Add source feature in LanguageSource page", function () {
  it("should find a button to press to add source by uploading file", function () {
    cy.visit("/languages");
    cy.get("button").contains("Sources").click();

    // Add source component should show after clicking the Add Source Button
    cy.get("button").contains("Add Source").click().scrollIntoView();
    cy.get("[data-cy=add-source-window]").should("exist");

    cy.get("button").contains("UPLOAD").click();

    cy.get("[data-cy=add-source-upload-zone]").contains("label", "Browse file");

    // After clicking the close button, the addSource component should disappear
    cy.get("button").contains("CLOSE").click();

    cy.get("[data-cy=add-source-window]").should("not.exist");
  });
});
