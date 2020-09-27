import {
  KmpJsonFile,
  KmpJsonFileSystem,
  KmpJsonFileOptions,
  KmpJsonFileInfo,
  RelevantKmpOptions,
} from "@common/kmp-json-file";

/**
 * If not given a explicit "system" field, pretend that the KMP was generated
 * by and for Keyman 13.0 (released 2020-02-19).
 * See: https://help.keyman.com/developer/version-history/
 */
const fakeKmpSystem: KmpJsonFileSystem = {
  /**
   * Keyman Developer v13.0.100.0 has created valid KMP files, so pretend to be it:
   */
  keymanDeveloperVersion: "13.0.100.0",
  /**
   * As of 2020-09-27, KMP 12.0 is the most compatible version supported by
   * the platform:
   */
  fileVersion: "12.0",
};

const fakeKmpOptions: KmpJsonFileOptions = {
  /* This option is not applicable to lexical models, but it's REQUIRED,
   * so jsut set it to false! */
  followKeyboardVersion: false,
};

/**
 * The default model version. This also happens to be the minimum model
 * version that the Keyman team will publish.
 */
const defaultVersion = "1.0.0";

/**
 * Given some metadata of a kmp.json file, this fills out the rest of the
 * details, and generates an appropriate kmp.json file.
 */
export function generateKmpJson(options: RelevantKmpOptions): string {
  if (options.languages.length < 1) {
    throw new Error("Must provide at least one language");
  }

  const primaryLanguageName = options.languages[0].name;
  const primaryLanguageID = options.languages[0].id;
  const authorName = options.authorName || "Unknown Author";
  const authorEmail = options.authorEmail || "nobody@example.com";

  const currentYear = new Date().getFullYear();

  const kmpJson: KmpJsonFile = {
    system: fakeKmpSystem,
    options: fakeKmpOptions,
    info: {
      author: {
        description: authorName,
        url: `mailto:${authorEmail}`,
      },
      copyright: {
        description: options.copyright || `© ${currentYear} ${authorName}.`,
      },
      name: {
        description:
          options.modelUserReadableName || `${primaryLanguageName} dictionary`,
      },
      version: {
        description: options.version || defaultVersion,
      },
    },
  };

  return JSON.stringify(kmpJson);
}
