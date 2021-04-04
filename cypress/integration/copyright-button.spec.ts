describe("Adding © to the copyright field", function () {
  it("should add © after pressing the Add © button", function () {
    const copyright = "2018 My Cool Organization";

    cy.visit("/customize");

    cy.data("input-copyright").scrollIntoView();

    // HACK: it has to wait for the existing project to load
    cy.wait(1000);

    copyrightInput().clear().type(copyright).blur();

    copyrightInput().its("value").should("be", copyright);

    button().should("be.visible").click();

    copyrightInput()
      .its("value")
      .should("be", "© " + copyright);

    button().should("not.be.visible");
  });

  function copyrightInput() {
    return cy.data("input-copyright");
  }

  function button() {
    return cy.get(".copyright-field").find("button");
  }
});
