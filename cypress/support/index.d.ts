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
     * Disable CSS smooth scroll to avoid using "{ force:true }" in .type.
     * See https://github.com/cypress-io/cypress/issues/3200
     * @example
     * cy.disableSmoothScroll()
     */
    disableSmoothScroll(): void;

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
