const JSZip = require("jszip");
const path = require("path");
const Dexie = require("dexie").default;

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

/**
 * Shortcut for cy.get("[data=NAME]")
 */
Cypress.Commands.add("data", (dataCy) => {
  return cy.get(`[data-cy=${dataCy}]`);
});

/**
 * Promises the contents of a Zip file (e.g., a .kmp package).
 */
Cypress.Commands.add("readZip", (filename) => {
  return cy.readFile(filename, "binary").then((contents) => {
    return JSZip.loadAsync(contents);
  });
});

/**
 * Clear local data on page. This includes localStorage, as well as the indexed db.
 * Should be called before every relevant test.
 */
Cypress.Commands.add("clearLocalDataExceptKeyboards", () => {
  localStorage.clear();
  return cy.window().then((window) => {
    return window.indexedDB.databases().then((databases) => {
      for (var i = 0; i < databases.length; i++) {
        if (databases[i].name === "dictionary_sources") {
          new Dexie(databases[i].name).open().then(function (db) {
            db.tables.forEach(function (table) {
              // console.log("Found table: " + table.name);
              if (table.name !== "keyboardData") {
                // console.log(table.name);
                table.clear();
              }
            });
          });
        }
        else {
          window.indexedDB.deleteDatabase(databases[i].name);
        }
      };
    });
  });
});

/**
 * Generate a new project manually. The incentive of doing this manually
 * over loading a DB fixture is so that the tests don't need to be updated
 * if the DB schema updates.
 * 
 * TODO: Can we find a way to cache the DB that we generated so that we only
 * do this once?
 */
Cypress.Commands.add("generateProject", () => {
  cy.intercept("https://cache.predictivetext.studio/cached-keyman-api.json", {
    fixture: "response-keyman.json",
  });
  cy.clearLocalDataExceptKeyboards();
  cy.wait(500);
  // make keyman request
  cy.visit("/");
  cy.wait(500);
  // get requested data to appear in dropdown
  // TODO: We should have Svelte update the dropdown as soon as the languages are loaded
  cy.visit("/");
  cy.wait(500);

  cy.data("landing-page-continue-button").should(
    "have.class",
    "quick-start__submit-button--disabled"
  );

  // Select the first option (should be Straits Salish)
  cy.data("autocomplete-label").type("straits").type("{enter}");

  const filename = "sencoten-top-10.xlsx";
  cy.fixture(filename, "base64").then((fixture) => {
    const testFile = new File(
      [Cypress.Blob.base64StringToBlob(fixture)],
      filename
    );
    const event = { dataTransfer: { files: [testFile] } };

    cy.data("upload-dropzone")
      .trigger("dragenter", event);

    cy.data("upload-dropzone").trigger("drop", event);
  });
  // wait for upload
  return cy.wait(500);
});