/**
 * These are options that a user of Predictive Text Studio would actually
 * implement.
 */
export interface RelevantKmpOptions {
  /**
   * The languages supported by this lexical model.
   */
  languages: KmpJsonFileLanguage[];
  /**
   * Author ID, required part of the model ID. If unset, "example" is used.
   */
  authorID?: string;
  /**
   * Model "unique" tag. If unset, the BPC-47 language subtag is used.
   */
  modelTag?: string;
  /**
   * The author's name or the organization they represent.
   */
  authorName?: string;
  /**
   * The contact email.
   */
  authorEmail?: string;
  /**
   * The name shown to users.
   */
  modelUserReadableName?: string;
  /**
   * The model's copyright string.
   */
  copyright?: string;
  /**
   * The model version. The first released version **MUST** be 1.0.0.
   */
  version?: string;
  /**
   * The model Id.
   * Keyman automatically generates a model ID, given all the information already filled out.
   * User can also provide a model ID.
   */
  modelID?: string;
}

/**
 * Interfaces derived from the keyman documentation: https://help.keyman.com/developer/12.0/reference/file-types/metadata
 * Copied from: https://github.com/keymanapp/keyman/blob/7e73eb7cf1608af42fec2abfd8d514212f77eaee/developer/js/source/package-compiler/kmp-json-file.ts
 */
export interface KmpJsonFile {
  /**
   * What system is this KMP intended for, and what system created it?
   */
  system: KmpJsonFileSystem;
  options: KmpJsonFileOptions;
  info?: KmpJsonFileInfo;
  files?: KmpJsonFileContentFile[];
  lexicalModels?: KmpJsonFileLexicalModel[];
  startMenu?: KmpJsonFileStartMenu;
  keyboards?: KmpJsonFileKeyboard[];
  strings?: string[];
}

/**
 * > The System object is used by Keyman Desktop to install keyboards
 * Source: https://help.keyman.com/developer/12.0/reference/file-types/metadata
 */
export interface KmpJsonFileSystem {
  /**
   * > The version of Keyman Developer used to create the package file.
   * See here for valid version numbers: https://help.keyman.com/developer/version-history/
   */
  keymanDeveloperVersion: string;
  /**
   * What version of the Keyman KMP spec are we targetting?
   * Note: version 12 is the minimum safe version.
   */
  fileVersion: string;
}

/**
 * > The Options object is used by Keyman Desktop to install keyboards
 * Copy-pasted from: https://help.keyman.com/developer/12.0/reference/file-types/metadata#obj-options
 */
export interface KmpJsonFileOptions {
  /**
   * Whether the package has the same version as the keyboard. Always false
   * for lexical models.
   */
  followKeyboardVersion: boolean;
  /**
   * > The file for the keyboard package documentation
   */
  readmeFile?: string;
  /**
   * [unused] Windows-only.
   * > The image associated with the keyboard package.
   */
  graphicFile?: string;
  /**
   * [unused] Windows-only.
   */
  executeProgram?: string;
  /**
   * [unused] Name of the Microsoft Installer file for Windows.
   */
  msiFilename?: string;
  /**
   * [unused] Microsoft Windows Installer file... stuff, idk.
   */
  msiOptions?: string;
}

/**
 * > [...] describes the Keyman package
 * Copy-pasted from: https://help.keyman.com/developer/12.0/reference/file-types/metadata#obj-info
 */
export interface KmpJsonFileInfo {
  /**
   * > The Keyman package name
   */
  name: KmpJsonFileInfoItem;
  /**
   * > The version number of the package in dotted number format.
   */
  version: KmpJsonFileInfoItem;
  /**
   * > Description and URL for additional Keyboard package documentation
   */
  website?: KmpJsonFileInfoItem;
  /**
   * > Copyright information
   */
  copyright?: KmpJsonFileInfoItem;
  /**
   * > The Keyman package author and email address
   */
  author?: KmpJsonFileInfoItem;
}

interface KmpJsonFileInfoItem {
  description: string;
  url?: string;
}

/**
 * Describes a file in the .kmp package to be installed. This includes the
 * .model.ts file and any .htm (HTML) documentation.
 */
interface KmpJsonFileContentFile {
  /**
   * A valid filename, with extension.
   */
  name: string;
  /**
   * A short explanation of the file.
   */
  description: string;
  /**
   * So this is dumb. This _is_ a non-negative integer, but it has to be
   * converted to string first ¯\_(ツ)_/¯
   */
  copyLocation: string;
  /**
   * File types that Keyman supports in a KMP package.
   *
   * Lexical model KMPs should only contain:
   *  - model.js (mandatory)
   *  - .htm (e.g., readme.htm and welcome.htm)
   *
   * ..in addition to kmp.json, which is implied, and thus, not included in the
   * files array.
   */
  fileType: ".model.js" | ".htm";
}

/**
 * > [...] describes an individual model in the Keyman package. A package
 * > cannot contain both lexical models and keyboards.
 *
 * Copy-pasted from: https://help.keyman.com/developer/12.0/reference/file-types/metadata#obj-lexicalModel
 */
interface KmpJsonFileLexicalModel {
  /**
   * User-readable name of the model. It should contain the word "Dictionary",
   * as end users are not expected to know what "lexical model" means.
   */
  name: string;
  /**
   * The model ID. Must match the filename.
   */
  id: string;
  /**
   * > true if the model targets a right-to-left script. false if absent.
   */
  rtl?: boolean;
  /**
   * > version number of the model in dotted number format.
   * NOTE: I don't think any lexical model declares this????
   */
  version?: string;
  /**
   * > An array of Language objects linked to the model.
   * These MUST match an existing Keyman keyboard!
   */
  languages: KmpJsonFileLanguage[];
}

/**
 * Describes the language supported by this lexical model.
 */
interface KmpJsonFileLanguage {
  /**
   * A freeform string describing the language. Community members may not use
   * the same term to describe their language as what's written on the web.
   * E.g., "str" stands for "Straits Salish" but the W̱SÁNEĆ community calls
   * their language "SENĆOŦEN".
   */
  name: string;
  /**
   * The BCP-47 tag of this lexical model. It **MUST** match with an existing
   * Keyman keyboard.
   */
  id: string;
}

/**
 * [unused] Only useful for packages that install a keyboard.
 */
interface KmpJsonFileKeyboard {
  name: string;
  id: string;
  version: string;
  oskFont?: string;
  displayFont?: string;
  rtl?: boolean;
  languages?: KmpJsonFileLanguage[];
}

/**
 * [unused] Only useful for keyboard/font packages intended for Keyman for
 * Windows.
 */
interface KmpJsonFileStartMenu {
  folder?: string;
  addUninstallEntry?: boolean;
  items?: KmpJsonFileStartMenuItem[];
}

/**
 * [unused] Only useful for keyboard/font packages intended for Keyman for
 * Windows.
 */
interface KmpJsonFileStartMenuItem {
  name: string;
  filename: string;
  arguments?: string;
  icon?: string;
  location?: string;
}
