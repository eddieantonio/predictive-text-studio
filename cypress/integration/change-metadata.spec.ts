import "cypress-file-upload";

import path = require("path");

describe("Changing metadata in the language info page", function () {
  const languageName = "Abua";
  const authorName = "Eddie";
  const copyright = "© 2018 My Cool Organization";
  const dictionaryName = "My Name";

  beforeEach(() => {
    cy.visit("/customize");
    languageInput()
      .clear()
      .type(languageName + "{enter}")
      .blur();
    cy.data("input-author-name").clear().type(authorName);
    cy.data("input-copyright").clear().type(copyright);
    cy.data("input-dictionary-name").clear().type(dictionaryName);

    // Wait for the settings to change in the database
    // TODO: can we avoid waiting here?
    cy.wait(1000);
  });

  it("should find a button to press to add source by uploading file", function () {
    // Navigate away page...
    cy.visit("about:blank");
    // ...and then come back
    cy.visit("/customize");

    // Wait for the page to load completely
    // TODO: can we avoid waiting here?
    cy.wait(1000);

    languageInput().its("value").should("be", languageName);
    cy.data("input-author-name").its("value").should("be", authorName);
    cy.data("input-copyright").its("value").should("be", copyright);
    cy.data("input-dictionary-name").its("value").should("be", dictionaryName);
  });

  it("should recompile KMP on metadata change", function () {
    const downloadFolder = Cypress.env("downloadFolder");
    cy.task("clearDownloads");
    cy.allowUnlimitedDownloadsToFolder(downloadFolder);
    // upload a file
    cy.data("customize-sources-btn")
      .scrollIntoView()
      .contains("Sources")
      .click();

    // Add source component should show after clicking the details element
    cy.data("language-sources-add-sources").click().scrollIntoView();

    cy.data("add-sources-splitbtn-upload").contains("Upload").click();
    cy.data("upload-dropzone").contains("label", "Browse file");

    const downloadedFilePath = path.join(downloadFolder, "My Name.kmp");

    cy.readFile(downloadedFilePath).should("not.exist");

    const filename = "sencoten-top-10.xlsx";
    cy.fixture(filename, "base64").then((fixture) => {
      const testFile = new File(
        [Cypress.Blob.base64StringToBlob(fixture)],
        filename
      );
      const event = { dataTransfer: { files: [testFile] } };

      cy.data("upload-dropzone").trigger("dragenter", event);
      cy.data("upload-dropzone").trigger("drop", event);
    });

    // wait for compilation
    cy.wait(200);

    cy.data("customize-download-btn")
      .should("not.have.class", "button--disabled")
      .click();

    const expectedLexicalModels = [
      {
        name: "Abua dictionary",
        id: "Eddie.abn.example",
        languages: [{ name: "Abua", id: "abn" }],
      },
    ];

    cy.wait(100);

    //TODO: Figure out how to await instead
    cy.readZip(downloadedFilePath).then(async (zip) => {
      expect(zip.file("kmp.json")).to.not.be.null;
      expect(zip.file(/[.]js$/)).to.have.lengthOf(1);
      const asString = await zip.file("kmp.json").async("string");
      const kmpFile = JSON.parse(asString);
      const kmpInfo = kmpFile.info;
      expect(kmpInfo.copyright.description).to.deep.equal(copyright);
      expect(kmpInfo.name.description).to.deep.equal(dictionaryName);
      expect(kmpInfo.author.description).to.deep.equal(authorName);
      expect(kmpFile.lexicalModels).to.deep.equal(expectedLexicalModels);

      // change inputs and expect kmp to change
      cy.data("customize-information-btn").scrollIntoView().click();

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
      });
    });
  });

  function languageInput() {
    return cy.data("input-language-name").find("input");
  }
});
