describe("BCP47Tag component test cases", function () {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should not show error message when valid tag is given", function () {
    cy.contains("label", "Enter BCP 47 tag").scrollIntoView();
    cy.get("#tag-input").type("zh", { force: true });
    cy.contains("label", "Enter BCP 47 tag");
  });

  it("should show error message when invalid tag is given", function () {
    cy.contains("label", "Enter BCP 47 tag").scrollIntoView();
    cy.get("#tag-input").type("012345", { force: true });
    cy.contains("label", "Invalid tag");
  });

  it("should clears error message when valid tag is given", function () {
    cy.contains("label", "Enter BCP 47 tag").scrollIntoView();
    cy.get("#tag-input").type("012345", { force: true });
    cy.contains("label", "Invalid tag");
    cy.get("#tag-input").clear();
    cy.contains("label", "Enter BCP 47 tag");
  });
});
