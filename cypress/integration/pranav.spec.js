describe("Test case for Pranav", function () {
    it("should find Pranav's name on the landing page", function () {
        cy.visit("/");

        cy.contains("Pranav");
    });
});
