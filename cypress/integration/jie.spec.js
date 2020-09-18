describe("Jie's name on the page", function () {
  it("should show Jie's name on the landing page", function () {
    cy.visit("/");

    cy.contains("Jie");
  });
});
