/**
 * Declares the typing of custom commands
 * See cypress/support/commands.js for the implementations.
 */

import JSZip = require("jszip");

declare namespace Cypress {
  interface Chainable {
    /**
     * [for Chromium browsers] allows multiple downloads to the download
     * folder, without an "are you sure?" prompt appearing.
     */
    allowUnlimitedDownloadsToFolder(downloadFolder: string): void;

    /**
     * Clear localData as well as the IndexedDB, with the exception of
     * Keyman keyboards. We do this as we otherwise need to intercept
     * a lot of requests, as well as wait on those requests.
     */
    clearLocalDataExceptKeyboards(): void;

    /**
     * Generate a project
     */
    generateProject(): void;

    /**
     * Gets an element by its [data-cy] attribute.
     *
     * Secretly, `cy.data("NAME")` is a shortcut for `cy.get("[data-cy=NAME]")`.
     *
     * Why use [data-cy]?
     * See: https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements
     */
    data(dataCy: string): Chainable;

    /**
     * Read a .zip file (or a .kmp file) from the downloads folder.
     */
    readZip(filename: string): Promise<JSZip>;
  }
}
