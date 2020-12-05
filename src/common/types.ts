/**
 * A pair of a word and its count (how many times it has occurred in some
 * collection of text).
 */
export type WordAndCount = [string, number];

/**
 * A collection of words and their counts.
 *
 * This list can be used to create a
 * unigram language model (can provide current word completion, autocorrection).
 *
 * Ideally, this array should have **unique** members, and there is no
 * significance to the order of the members, however, this is not enforced by
 * the type.
 */
export type WordList = WordAndCount[];

/**
 * A manually entered collection of words and their counts.
 */
export interface DictionaryEntry {
  word: string;
  count?: number;
}

export interface KeyboardDataWithTime {
  /**
   * Store bcp47Tag as the primarykey
   */
  bcp47Tag: string;
  /**
   * Keyboard Language of the bcp47Tag
   */
  language: string;
  /**
   * Timestamp of last updated time
   */
  timestamp: Date;
}
