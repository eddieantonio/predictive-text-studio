describe("Upload component test cases", function () {
  it("should find an upload message on the homepage", function () {
    cy.visit("/");

    cy.contains("span", "Drag and drop here");
    cy.contains("span", "or");
    cy.contains("label", "Browse file");
  });
});
