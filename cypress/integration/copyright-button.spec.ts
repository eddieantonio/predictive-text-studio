describe("Adding © to the copyright field", function () {
  it("should add © after pressing the Add © button", function () {
    const copyright = "2018 My Cool Organization";

    cy.visit("/customize");

    cy.data("input-copyright").as("copyright").scrollIntoView();

    // HACK: it has to wait for the existing project to load
    cy.wait(1000);

    cy.get("@copyright").clear().type(copyright).blur();

    cy.get("@copyright").should("have.value", copyright);

    cy.get(".copyright-field")
      .find("button")
      .as("button")
      .should("not.have.attr", "data-disabled");
    cy.get("@button").click();

    cy.get("@copyright").should("have.value", "© " + copyright);

    cy.get("@button").should("have.attr", "data-disabled");
  });
});
