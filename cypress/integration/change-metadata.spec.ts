describe("Changing metadata in the language info page", function () {
  it("should find a button to press to add source by uploading file", function () {
    const languageName = "Makah";
    const authorName = "Eddie";
    const copyright = "© 2018 My Cool Organization";

    cy.visit("/languages");

    cy.data("input-language-name").clear().type(languageName).blur();
    cy.data("input-author-name").clear().type(authorName);
    cy.data("input-copyright").clear().type(copyright);

    // Wait for the settings to change in the database
    // TODO: can we avoid waiting here?
    cy.wait(1000);

    // Navigate away page...
    cy.visit("about:blank");
    // ...and then come back
    cy.visit("/languages");

    // Wait for the page to load completely
    // TODO: can we avoid waiting here?
    cy.wait(1000);

    cy.data("input-language-name").its("value").should("be", languageName);
    cy.data("input-author-name").its("value").should("be", authorName);
    cy.data("input-copyright").its("value").should("be", copyright);
  });
});
