import { WordList } from "@common/types";
/**
 * A word list.
 */
export interface StoredWordList {
  id?: number;
  /**
   * Typically the filename of the uploaded dictionary source.
   */
  name: string;
  /**
   * The actual contents of said file.
   */
  wordlist: WordList;
}

export interface StoredPackageInfo {
  id?: number;
  /**
   * the valid bcp47Tag for the language
   */
  bcp47Tag: string;
}

export interface keyboardDataObj {
  /**
   * Store bcp47Tag as the primarykey
   */
  bcp47Tag: string;
  /**
   * Keyboard Language of the bcp47Tag
   */
  langauge: string;
}

/**
 * KMP endpoint returning object type
 */
export interface KeymanObj {
  keyboards: Array<string>;
  id: string;
  name: string;
}
