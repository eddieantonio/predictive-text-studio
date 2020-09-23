describe("A download button to download the dictionary", function () {
  it("should contain a download button in the landing page", function () {
    cy.visit("/");

    cy.contains("button", "Download");
  });
});
