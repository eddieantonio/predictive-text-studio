// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
//
Cypress.Commands.add("allowUnlimitedDownloadsToFolder", (folderName) => {
  // Allow downloads in Chromium-based browsers without prompts:
  // Adapted from: https://github.com/cypress-io/cypress-example-recipes/blob/0b2ded6d7f099bb6e9e637fb45b1560879424bd5/examples/testing-dom__download/cypress/integration/spec.js#L12-L23
  if (Cypress.browser.name !== "firefox") {
    cy.wrap(
      Cypress.automation("remote:debugger:protocol", {
        command: "Page.setDownloadBehavior",
        params: { behavior: "allow", downloadPath: folderName },
      }),
      { log: false }
    );
  }
});

Cypress.Commands.add("disableSmoothScroll", () => {
  /**
   * Disable css smooth scroll to avoid using "{ force:true }" in .type.
   * See https://github.com/cypress-io/cypress/issues/3200
   */
  cy.document().then((document) => {
    const node = document.createElement("style");
    node.innerHTML = "html { scroll-behavior: inherit !important; }";
    document.body.appendChild(node);
  });
});
