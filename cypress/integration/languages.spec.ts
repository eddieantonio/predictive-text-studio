describe("AutoComplete Component", () => {
  beforeEach(() => {
    cy.visit("/languages?");
  });

  it("should display the suggestion list", () => {
    getDataCY("autocomplete-input")
      .wait(500)
      .type("e")
      .then(() => {
        getDataCY("autocomplete-suggestions")
          .its("length")
          .should("be.greaterThan", 0);
      });
  });

  it("should not display the suggestion list if gibberish is entered", () => {
    getDataCY("autocomplete-input")
      .wait(500)
      .type("(*&#*(^(")
      .then(() => {
        getDataCY("autocomplete-suggestions").should("not.be.visible");
      });
  });

  it("should able to select the item in the list", () => {
    getDataCY("autocomplete-input")
      .wait(500)
      .type("english")
      .then(() => {
        getDataCY("autocomplete-suggestions").first().click();
        getDataCY("autocomplete-input").should("have.value", "English (AAVE)");
      });
  });

  it("should able to select the item in the list with down and enter key", () => {
    getDataCY("autocomplete-input")
      .wait(500)
      .type("English")
      .type("{downArrow}")
      .type("{enter}")
      .then(() => {
        getDataCY("autocomplete-input").should("have.value", "English (AAVE)");
      });
  });

  it("should able to select the item in the list with up and enter key", () => {
    getDataCY("autocomplete-input")
      .wait(500)
      .type("en")
      .type("{upArrow}")
      .type("{upArrow}")
      .type("{enter}")
      .should("have.value", "English (AAVE)");
  });

  it("should display the correct BCP47 subtext", () => {
    getDataCY("autocomplete-input")
      .wait(500)
      .type("English")
      .then(() => {
        getDataCY("autocomplete-suggestions").first().click();
        getDataCY("autocomplete-subtext").should(
          "have.text",
          "BCP47Tag:\n    en"
        );
      });
  });
});

function getDataCY(name: string) {
  return cy.get(`[data-cy=${name}]`);
}
