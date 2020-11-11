describe("AutoComplete Component", () => {
  beforeEach(() => {
    cy.visit("/languages?");
  });

  it("should display the suggestion list", () => {
    getDataCY("autocomplete-input")
      .type("e")
      .then(() => {
        getDataCY("autocomplete-suggestions").its("length").should("eq", 3);
      });
  });

  it("should not display the suggestion list if gibberish is entered", () => {
    getDataCY("autocomplete-input")
      .type("a")
      .then(() => {
        getDataCY("autocomplete-suggestions").should("not.be.visible");
      });
  });

  it("should able to select the item in the list", () => {
    getDataCY("autocomplete-input")
      .type("e")
      .then(() => {
        getDataCY("autocomplete-suggestions").first().click();
        getDataCY("autocomplete-input").should("have.value", "english");
      });
  });

  it("should able to select the item in the list with down and enter key", () => {
    getDataCY("autocomplete-input")
      .type("e")
      .type("{downArrow}")
      .type("{downArrow}")
      .type("{enter}")
      .should("have.value", "enn");
  });

  it("should able to select the item in the list with up and enter key", () => {
    getDataCY("autocomplete-input")
      .type("e")
      .type("{upArrow}")
      .type("{upArrow}")
      .type("{enter}")
      .should("have.value", "enn");
  });

  it("should display the correct BCP47 subtext", () => {
    getDataCY("autocomplete-input")
      .type("e")
      .then(() => {
        getDataCY("autocomplete-suggestions").first().click();
        getDataCY("autocomplete-subtext").should("have.text", "BCP47Tag: en");
      });
  });
});

function getDataCY(name: string) {
  return cy.get(`[data-cy=${name}]`);
}
