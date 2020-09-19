describe("Upload component test cases", function () {
  it("should find an upload message on the homepage", function () {
    cy.visit("/");
    cy.visit("hello")
    cy.contains("p", "Drag file to upload ...");
  });
});
