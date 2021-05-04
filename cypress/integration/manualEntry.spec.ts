// TODO: do not use { force: true } option
// This option was added as a workaround for test scenarios failing due to "the center of this element is hidden from view"
// Related discussion on repo: https://github.com/eddieantonio/predictive-text-studio/pull/293#issuecomment-817975467
describe("Adding sources by direct entry", function () {
  beforeEach(() => {
    cy.clearLocalDataExceptKeyboards();
    cy.generateProject();

    cy.visit("/customize");
    cy.data("customize-sources-btn").contains("Sources").click();
  });

  it("should create and delete a manual entry source", function () {
    // create the manual entry
    cy.data("language-sources-add-sources")
      .contains("Add Source")
      .click()
      .scrollIntoView();

    cy.data("add-sources-splitbtn-direct-entry")
      .contains("Direct entry")
      .click({ force: true })
      .scrollIntoView();
    cy.data("manual-entry-input-tablename").type("Common Greetings", {
      force: true,
    });
    cy.data("manual-entry-input-word").first().type("Hello");
    cy.data("manual-entry-input-count").first().clear().type("112");
    cy.data("manual-entry-delete").last().click({ force: true });

    cy.wait(500);

    // delete the entry
    cy.data("language-source-delete").first().click();
  });

  it("should create and later edit a manual entry source", function () {
    // create the manual entry
    cy.data("language-sources-add-sources")
      .contains("Add Source")
      .click()
      .scrollIntoView();

    cy.data("add-sources-splitbtn-direct-entry")
      .contains("Direct entry")
      .click({ force: true })
      .scrollIntoView();
    cy.data("manual-entry-input-tablename").type("Common Greetings", {
      force: true,
    });
    cy.data("manual-entry-input-word").first().type("Hello");
    cy.data("manual-entry-input-count").first().clear().type("112");
    cy.data("manual-entry-delete").last().click();
    cy.data("add-sources-save-btn").contains("Save").click();

    cy.wait(1000);

    // edit the entry
    cy.data("customize-sources-btn").contains("Sources").click({ force: true });
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
      .click({ force: true })
      .scrollIntoView();
    cy.data("manual-entry-input-tablename").type("Common Greetings", {
      force: true,
    });
    cy.data("manual-entry-input-word").first().type("Hello");
    cy.data("manual-entry-input-count").first().clear().type("112");

    cy.data("manual-entry-delete").first().click();
    //TODO: Current row should be deleted

    cy.data("language-sources-add-sources")
      .contains("Add Source")
      .click({ force: true });
  });
});
