describe("Go to the team page", function () {
  it("should reach the team page via a link on the landing page", function () {
    cy.visit("/");
    // Prevent bug with click() by disabling smooth scroll
    cy.disableSmoothScroll();
    cy.data("team-page-link").contains("About the Team").click();
    cy.url().should("include", "/team");
  });

  it("should see loaded profiles on the team page", function () {
    cy.visit("/team");
    cy.wait(500);
    expect(cy.data("contributor-handle-ChrisChrisLoLo")).to.exist;
  });
});