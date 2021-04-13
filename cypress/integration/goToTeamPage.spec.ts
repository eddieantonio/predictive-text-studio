// TODO: do not use { force: true } option
// This option was added as a workaround for test scenarios failing due to "the center of this element is hidden from view"
// Related discussion on repo: https://github.com/eddieantonio/predictive-text-studio/pull/293#issuecomment-817975467
describe("Go to the team page", function () {
  it("should reach the team page via a link on the landing page", function () {
    cy.visit("/");
    cy.data("team-page-link").contains("About the Team").click({ force: true });
    cy.url().should("include", "/team");
  });

  it("should see loaded profiles on the team page", function () {
    cy.visit("/team");
    cy.wait(1000);
    expect(cy.data("contributor-handle-ChrisChrisLoLo")).to.exist;
  });
});
