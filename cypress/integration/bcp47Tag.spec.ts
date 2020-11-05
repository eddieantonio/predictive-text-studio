/**
 * Disable css smooth scroll, that doesn't plays nice with cypress.
 * See https://github.com/cypress-io/cypress/issues/3200
 */
const disableSmoothScroll = () => {
  cy.document().then((document) => {
    const node = document.createElement("style");
    node.innerHTML = "html { scroll-behavior: inherit !important; }";
    document.body.appendChild(node);
  });
};

describe("BCP47Tag component test cases", function () {
  beforeEach(() => {
    cy.visit("/");
    disableSmoothScroll();
  });

  it("should not show error message when valid tag is given", function () {
    cy.get("#tag-input").scrollIntoView().should("be.visible");
    cy.get("#tag-input")
      .invoke("attr", "placeholder")
      .should("contain", "Enter the BCP 47 Tag");
    cy.get("#tag-input").type("zh");
    cy.contains("p", "Invalid BCP 47 Tag").should("not.exist");
  });

  it("should show error message when invalid tag is given", function () {
    cy.get("#tag-input").scrollIntoView().should("be.visible");
    cy.get("#tag-input").type("012345");
    cy.contains("p", "Invalid BCP 47 Tag");
  });

  it("should clears error message when valid tag is given", function () {
    cy.get("#tag-input").scrollIntoView().should("be.visible");
    cy.get("#tag-input").type("012345");
    cy.contains("p", "Invalid BCP 47 Tag");

    cy.get("#tag-input").clear();
    cy.contains("p", "Invalid BCP 47 Tag").should("not.exist");
  });
});
