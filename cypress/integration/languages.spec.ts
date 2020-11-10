describe("AutoComplete Component", function () {
  beforeEach(() => {
    cy.visit("/languages?");
  });

  it("should display the suggestion list", function () {
    cy.get("[data-cy=autocomplete-input]")
      .type("e")
      .then(() => {
        cy.get("[data-cy=autocomplete-suggestions]")
          .its("length")
          .should("eq", 3);
      });
  });

  it("should not display the suggestion list if gibberish is entered", function () {
    cy.get("[data-cy=autocomplete-input]")
      .type("a")
      .then(() => {
        cy.get("[data-cy=autocomplete-suggestions]").should("not.be.visible");
      });
  });

  it("should able to select the item in the list", function () {
    cy.get("[data-cy=autocomplete-input]")
      .type("e")
      .then(() => {
        cy.get("[data-cy=autocomplete-suggestions]").first().click();
        cy.get("[data-cy=autocomplete-input]").should("have.value", "english");
      });
  });

  it("should able to select the item in the list with down and enter key", function () {
    cy.get("[data-cy=autocomplete-input]")
      .type("e")
      .type("{downArrow}")
      .type("{downArrow}")
      .type("{enter}")
      .should("have.value", "enn");
  });

  it("should able to select the item in the list with up and enter key", function () {
    cy.get("[data-cy=autocomplete-input]")
      .type("e")
      .type("{upArrow}")
      .type("{upArrow}")
      .type("{enter}")
      .should("have.value", "enn");
  });
});
