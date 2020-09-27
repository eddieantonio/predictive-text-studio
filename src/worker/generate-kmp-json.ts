import {
  KmpJsonFile,
  KmpJsonFileSystem,
  KmpJsonFileInfo,
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

const unknownAuthor: KmpJsonFileInfo = {
  author: {
    description: "<unknown>",
    url: "mailto:nobody@example.com",
  },
  copyright: {
    description: "© 2020. All rights reserved.",
  },
  name: {
    description: "Unknown Dictionary",
  },
  version: {
    description: "1.0.0",
  },
};

/**
 * Given some metadata of a kmp.json file, this fills out the rest of the
 * details, and generates an appropriate kmp.json file.
 */
export function generateKmpJson(partialKMPJSON: Partial<KmpJsonFile>): string {
  const kmpJson: KmpJsonFile = {
    system: partialKMPJSON.system || fakeKmpSystem,
    options: partialKMPJSON.options || {
      /* This option is not applicable to lexical models, but it's REQUIRED,
       * so jsut set it to false! */
      followKeyboardVersion: false,
    },
    info: partialKMPJSON.info || unknownAuthor,
  };

  return JSON.stringify(kmpJson);
}
