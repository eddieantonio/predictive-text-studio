/**
 * Interfaces derived from the keyman documentation: https://help.keyman.com/developer/11.0/reference/file-types/metadata
 * Copied from: https://github.com/keymanapp/keyman/blob/master/developer/js/source/lexical-model-compiler/model-info-file.ts
 */
export interface KmpJsonFile {
  system: KmpJsonFileSystem;
  options: KmpJsonFileOptions;
  info?: KmpJsonFileInfo;
  files?: KmpJsonFileContentFile[];
  lexicalModels?: KmpJsonFileLexicalModel[];
  startMenu?: KmpJsonFileStartMenu;
  keyboards?: KmpJsonFileKeyboard[];
  strings?: string[];
}

export interface KmpJsonFileSystem {
  keymanDeveloperVersion: string;
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

interface KmpJsonFileInfo {
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

interface KmpJsonFileLanguage {
  name: string;
  id: string;
}

interface KmpJsonFileKeyboard {
  name: string;
  id: string;
  version: string;
  oskFont?: string;
  displayFont?: string;
  rtl?: boolean;
  languages?: KmpJsonFileLanguage[];
}

interface KmpJsonFileStartMenu {
  folder?: string;
  addUninstallEntry?: boolean;
  items?: KmpJsonFileStartMenuItem[];
}

interface KmpJsonFileStartMenuItem {
  name: string;
  filename: string;
  arguments?: string;
  icon?: string;
  location?: string;
}
