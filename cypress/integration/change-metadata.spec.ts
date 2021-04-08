describe("Changing metadata in the language info page", function () {
  beforeEach(() => {
    cy.clearLocalData();
    cy.generateProject();
  });

  it.skip("should find a button to press to add source by uploading file", function () {
    const languageName = "’Are’are";
    const authorName = "Eddie";
    const copyright = "© 2018 My Cool Organization";

    cy.visit("/customize");

    // Wait for the languages to load
    cy.wait(1000);
    languageInput().clear().type(languageName).blur();
    cy.data("input-author-name").clear().type(authorName);
    cy.data("input-copyright").clear().type(copyright);

    // Wait for the settings to change in the database
    // TODO: can we avoid waiting here?
    cy.wait(1000);

    // Navigate away page...
    cy.visit("about:blank");
    // ...and then come back
    cy.visit("/customize");

    // Wait for the page to load completely
    // TODO: can we avoid waiting here?
    cy.wait(1000);

    languageInput().should("have.value", languageName);
    cy.data("input-author-name").should("have.value", authorName);
    cy.data("input-copyright").should("have.value", copyright);
  });

  function languageInput() {
    return cy.data("input-language-name").find("input");
  }
});
