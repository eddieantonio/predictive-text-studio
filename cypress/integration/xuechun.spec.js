describe("Name test case", function () {
    it("should find Xuechun's name on the homepage", function () {
      cy.visit("/");
  
      cy.contains("Xuechun")
    });
  });