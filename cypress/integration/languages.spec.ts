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

  it("should able to select the item in the list", function () {
    cy.get("[data-cy=autocomplete-input]")
      .type("e")
      .then(() => {
        cy.get("[data-cy=autocomplete-suggestions]").first().click();
        cy.get("[data-cy=autocomplete-input]").should("have.value", "english");
      });
  });

  it("should able to select the item in the list", function () {
    cy.get("[data-cy=autocomplete-input]")
      .type("e")
      .then(() => {
        cy.get("[data-cy=autocomplete-input]").type("{downArrow}");
      });
  });
});
