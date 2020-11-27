describe("BCP47Tag component test cases", function () {
  beforeEach(() => {
    cy.visit("/");
    cy.disableSmoothScroll();
  });

  it("should not show error message when valid tag is given", () => {
    cy.data("tag-input").scrollIntoView().should("be.visible");
    cy.data("tag-input")
      .invoke("attr", "placeholder")
      .should("contain", "Enter the BCP 47 Tag");
    cy.data("tag-input").type("zh");
    cy.contains("p", "Invalid BCP 47 Tag").should("not.exist");
  });

  it("should show error message when invalid tag is given", () => {
    cy.data("tag-input").scrollIntoView().should("be.visible");
    cy.data("tag-input").type("012345");
    cy.contains("p", "Invalid BCP 47 Tag");
  });

  it("should clears error message when valid tag is given", () => {
    cy.data("tag-input").scrollIntoView().should("be.visible");
    cy.data("tag-input").type("012345");
    cy.contains("p", "Invalid BCP 47 Tag");

    cy.data("tag-input").clear();
    cy.contains("p", "Invalid BCP 47 Tag").should("not.exist");
  });
});
