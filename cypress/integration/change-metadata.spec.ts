import "cypress-file-upload";

import path = require("path");

const languageName = "’Are’are";
const authorName = "Eddie";
const copyright = "© 2018 My Cool Organization";
const dictionaryName = "My Name";

describe("Changing metadata in the language info page", function () {
  beforeEach(() => {
    cy.clearLocalDataExceptKeyboards();
    cy.generateProject();
  });

  it("should find a button to press to add source by uploading file", function () {
    cy.visit("/customize");

    // Wait for the languages to load
    cy.wait(2000);
    languageInput().clear().type(languageName).type("{enter}");
    cy.data("input-author-name").clear().type(authorName);
    cy.data("input-dictionary-name").clear().type(dictionaryName);
    cy.data("input-copyright").clear().type(copyright).blur();
    // Wait for the settings to change in the database
    // TODO: can we avoid waiting here?
    cy.wait(2000);

    // Navigate away page...
    cy.visit("about:blank");
    // ...and then come back
    cy.visit("/customize");

    // Wait for the page to load completely
    // TODO: can we avoid waiting here?
    cy.wait(2000);

    languageInput().should("have.value", languageName);
    cy.data("input-author-name").should("have.value", authorName);
    cy.data("input-copyright").should("have.value", copyright);
    cy.data("input-dictionary-name").should("have.value", dictionaryName);
  });

  it("should recompile KMP on metadata change", function () {
    cy.visit("/customize");

    cy.wait(500);

    cy.data("input-author-name").clear().type(authorName);
    cy.data("input-dictionary-name").clear().type(dictionaryName);
    cy.data("input-copyright").clear().type(copyright).blur();
    // Wait for compilation
    // TODO: can we avoid waiting here?
    cy.wait(500);

    const downloadFolder = Cypress.env("downloadFolder");
    cy.task("clearDownloads");
    cy.allowUnlimitedDownloadsToFolder(downloadFolder);

    const downloadedFilePath = path.join(downloadFolder, "My Name.kmp");

    cy.data("customize-download-btn")
      .should("not.have.class", "button--disabled")
      .click();

    //TODO: await instead
    cy.readZip(downloadedFilePath).then(async (zip) => {
      expect(zip.file("kmp.json")).to.not.be.null;
      expect(zip.file(/[.]js$/)).to.have.lengthOf(1);
      const asString = await zip.file("kmp.json").async("string");
      const kmpFile = JSON.parse(asString);
      const kmpInfo = kmpFile.info;
      expect(kmpInfo.copyright.description).to.deep.equal(copyright);
      expect(kmpInfo.name.description).to.deep.equal(dictionaryName);
      expect(kmpInfo.author.description).to.deep.equal(authorName);

      // change inputs and expect kmp to change
      cy.data("customize-information-btn").scrollIntoView().click();

      languageInput().clear().type(languageName).type("{enter}").blur();

      cy.data("input-author-name")
        .clear()
        .type("new " + authorName);
      cy.data("input-dictionary-name")
        .clear()
        .type("new " + dictionaryName);
      cy.data("input-copyright")
        .clear()
        .type("new " + copyright)
        .blur();

      cy.wait(200); // wait for compilation

      const expectedLexicalModels = [
        {
          name: "’Are’are dictionary",
          id: "new Eddie.alu.example",
          languages: [{ name: "’Are’are", id: "alu" }],
        },
      ];

      const newDownloadedFilePath = path.join(
        downloadFolder,
        "new My Name.kmp"
      );

      cy.data("customize-download-btn")
        .should("not.have.class", "button--disabled")
        .click();

      cy.readZip(newDownloadedFilePath).then(async (newZip) => {
        expect(newZip.file("kmp.json")).to.not.be.null;
        expect(newZip.file(/[.]js$/)).to.have.lengthOf(1);
        const asStringNew = await newZip.file("kmp.json").async("string");
        const kmpFileNew = JSON.parse(asStringNew);
        const kmpInfoNew = kmpFileNew.info;
        expect(kmpInfoNew.copyright.description).to.deep.equal(
          "new " + copyright
        );
        expect(kmpInfoNew.name.description).to.deep.equal(
          "new " + dictionaryName
        );
        expect(kmpInfoNew.author.description).to.deep.equal(
          "new " + authorName
        );
        expect(kmpFileNew.lexicalModels).to.deep.equal(expectedLexicalModels);
        cy.data("input-dictionary-name").clear().blur(); // clear dictionary name to avoid affecting other tests
      });
    });
  });

  function languageInput() {
    return cy.data("input-language-name").find("input");
  }
});
