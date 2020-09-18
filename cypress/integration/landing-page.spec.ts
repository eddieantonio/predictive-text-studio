import "cypress-file-upload";
describe("Landing Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Input file", () => {
    it("should be able to upload a file", () => {
      cy.get("[data-testid=input-file]").attachFile({
        filePath: "../fixtures/users.json",
        fileName: "users.json",
      });
      cy.get("[data-testid=input-file]").should(
        "have.value",
        "C:\\fakepath\\users.json"
      );
    });
  });
});
