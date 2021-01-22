describe("Changing metadata in the language info page", function () {
  it("should find a button to press to add source by uploading file", function () {
    const languageName = "Makah";
    const authorName = "Eddie";
    const copyright = "© 2018 My Cool Organization";

    cy.visit("/languages");

    cy.data("input-language-name").type(languageName).blur();
    // TODO: remove force; requires a refactor and fix to the <Autocomplete> component
    cy.data("input-author-name").type(authorName, { force: true });
    cy.data("input-copyright").type(copyright);

    // Navigate away page...
    cy.visit("about:blank");
    // ...and then come back
    cy.visit("/languages");

    cy.data("input-language-name").contains(languageName);
    cy.data("input-author-name").contains(authorName);
    cy.data("input-copyright").contains(copyright);
  });
});
