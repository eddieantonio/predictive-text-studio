/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const path = require("path");
const fs = require("fs");

// Save downloads in cypress/downloads/
const downloadDirectory = path.join(__dirname, "..", "downloads");

/**
 * This function is called when a project is opened or re-opened (e.g. due to
 * the project's config changing)
 * @type {Cypress.PluginConfig}
 */

module.exports = (on) => {
  /**
   * Adapted from: https://docs.cypress.io/api/plugins/browser-launch-api.html#Change-download-directory
   */
  on("before:browser:launch", (browser, options) => {
    if (browser.family === "chromium" && browser.name !== "electron") {
      options.preferences.default["download"] = {
        default_directory: downloadDirectory,
      };

      return options;
    }

    if (browser.family === "firefox") {
      options.preferences["browser.download.dir"] = downloadDirectory;
      options.preferences["browser.download.folderList"] = 2;

      // needed to prevent download prompt for text/csv files:
      options.preferences["browser.helperApps.neverAsk.saveToDisk"];

      return options;
    }
  });

  on("task", {
    /**
     * Adapted from: https://github.com/cypress-io/cypress-example-recipes/blob/0b2ded6d7f099bb6e9e637fb45b1560879424bd5/examples/testing-dom__download/cypress/plugins/index.js#L22-L28
     */
    clearDownloads() {
      console.log("clearing folder %s", downloadDirectory);

      fs.rmdirSync(downloadDirectory, { recursive: true });

      return null;
    },
  });
};
