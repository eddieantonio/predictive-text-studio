declare namespace Cypress {
  interface Chainable {
    /**
     * [for Chromium browsers] allows multiple downloads to the download
     * folder, without an "are you sure?" prompt appearing.
     */
    allowUnlimitedDownloadsToFolder(downloadFolder: string): void;
    /**
     * Disable css smooth scroll to avoid using "{ force:true }" in .type.
     * See https://github.com/cypress-io/cypress/issues/3200
     * @example
     * cy.disableSmoothScroll()
     */
    disableSmoothScroll(): void;
  }
}
