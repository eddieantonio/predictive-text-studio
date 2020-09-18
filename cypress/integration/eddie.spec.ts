describe("Eddie's name on the page", function () {
  it("should show Eddie's name on the landing page", function () {
    cy.visit("/");

    cy.contains("Eddie");
  });
});
