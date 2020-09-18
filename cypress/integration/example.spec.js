describe("Example test cases", function () {
  it("should find a welcome message on the homepage", function () {
    cy.visit("/");

    cy.contains("Xuechun")
  });
});
