declare namespace Cypress {
  interface Chainable {
    /**
     * [for Chromium browsers] allows multiple downloads to the download
     * folder, without an "are you sure?" prompt appearing.
     */
    allowUnlimitedDownloadsToFolder(downloadFolder: string): void;
  }
}
