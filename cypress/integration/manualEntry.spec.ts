describe("Adding sources by direct entry", function () {
  beforeEach(() => {
    cy.visit("/languages");
    cy.data("languages-sources-btn").contains("Sources").click();
  });

  it("should create and delete a manual entry source", function () {
    // create the manual entry
    cy.data("language-sources-add-sources")
      .contains("Add Source")
      .click()
      .scrollIntoView();

    cy.data("add-sources-splitbtn-direct-entry")
      .contains("Direct entry")
      .click()
      .scrollIntoView();
    cy.data("manual-entry-input-tablename").type("Common Greetings");
    cy.data("manual-entry-input-word").first().type("Hello");
    cy.data("manual-entry-input-count").first().clear().type("112");
    // delete the entry
    cy.data("language-source-delete").first().click();
  });

  it.skip("should create and later edit a manual entry source", function () {
    // create the manual entry
    cy.data("language-sources-add-sources")
      .contains("Add Source")
      .click()
      .scrollIntoView();

    cy.data("add-sources-splitbtn-direct-entry")
      .contains("Direct entry")
      .click()
      .scrollIntoView();
    cy.data("manual-entry-input-tablename").type("Common Greetings");
    cy.data("manual-entry-input-word").first().type("Hello");
    cy.data("manual-entry-input-count").first().clear().type("112");
    cy.data("add-sources-save-btn").contains("Save").click();

    cy.wait(500);

    // edit the entry
    cy.data("languages-sources-btn").contains("Sources").click();
    cy.data("language-source-edit").first().click();

    cy.data("manual-entry-input-word").first().type("World");
    cy.data("manual-entry-input-count").first().clear().type("113");
  });

  it("should find a button to press to add source by user entry manually", function () {
    // Add source component should show after clicking the details element
    cy.data("language-sources-add-sources")
      .contains("Add Source")
      .click()
      .scrollIntoView();

    cy.data("add-sources-splitbtn-direct-entry")
      .contains("Direct entry")
      .click()
      .scrollIntoView();
    cy.data("manual-entry-input-tablename").type("Common Greetings");
    cy.data("manual-entry-input-word").first().type("Hello");
    cy.data("manual-entry-input-count").first().clear().type("112");

    cy.data("manual-entry-delete").first().click();
    //TODO: Current row should be deleted

    cy.data("language-sources-add-sources").contains("Add Source").click();
  });
});
