describe("Adding © to the copyright field", function () {
  it("should add © after pressing the Add © button", function () {
    const copyright = "2018 My Cool Organization";

    cy.visit("/customize");

    cy.data("input-copyright").scrollIntoView();

    // HACK: it has to wait for the existing project to load
    cy.wait(2000);

    copyrightInput().clear().type(copyright).blur();

    copyrightInput().should("have.value", copyright);

    button().should("not.have.attr", "data-disabled");
    button().click();

    copyrightInput().should("have.value", "© " + copyright);

    button().should("have.attr", "data-disabled");
  });

  function copyrightInput() {
    return cy.data("input-copyright");
  }

  function button() {
    return cy.get(".copyright-field").find("button");
  }
});
