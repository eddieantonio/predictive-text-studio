describe("Landing Page", function () {
    it("should display Ian", function () {
        cy.visit("/");

        cy.contains("Ian");
    });
});