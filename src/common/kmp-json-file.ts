/**
 * Interfaces derived from the keyman documentation: https://help.keyman.com/developer/11.0/reference/file-types/metadata
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

export interface KmpJsonFileOptions {
  followKeyboardVersion: boolean;
  readmeFile?: string;
  graphicFile?: string;
  executeProgram?: string;
  msiFilename?: string;
  msiOptions?: string;
}

export interface KmpJsonFileInfo {
  website?: KmpJsonFileInfoItem;
  version?: KmpJsonFileInfoItem;
  name?: KmpJsonFileInfoItem;
  copyright?: KmpJsonFileInfoItem;
  author?: KmpJsonFileInfoItem;
}

interface KmpJsonFileInfoItem {
  description: string;
  url?: string;
}

interface KmpJsonFileContentFile {
  name: string;
  description: string;
  copyLocation?: number;
}

interface KmpJsonFileLexicalModel {
  name: string;
  id: string;
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
