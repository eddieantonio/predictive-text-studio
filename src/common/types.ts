/**
 * A pair of a word and its count (how many times it has occurred in some
 * collection of text).
 */
export type WordAndCount = [string, number];

/**
 * A set of constants to get the Word and Count
 */
export enum WordAndCountInd {
  WORD = 0,
  COUNT = 1,
}

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
 * A dictionary source type.
 */
export type DictionarySourceType =
  | "xlsx"
  | "google-sheets"
  | "tsv"
  | "direct-entry";

/**
 * A word list stored in the database.
 */
export interface WordListSource {
  /**
   * Typically the filename of the uploaded dictionary source.
   */
  name: string;
  /**
   * The actual contents of said file.
   */
  wordlist: WordList;
  /**
   * Size of the file in words.
   */
  size: number;
  /**
   * Type of the file e.g. xlsx
   */
  type: DictionarySourceType;
}

/**
 * Stores information about a known keyboard layout.
 */
export interface KeyboardMetadata {
  /**
   * The tag of the keyboard. Includes language, but may also include script
   * and region.
   */
  bcp47Tag: string;

  /**
   * Plain English description of the language.
   * Note: language community may NOT want to list the English name.
   */
  language: string;
}

export interface KeyboardDataWithTime extends KeyboardMetadata {
  /**
   * Timestamp of last updated time
   */
  timestamp: Date;
}

/**
 * Relevant metadata for a particular project.
 *
 */
export interface ProjectMetadata {
  /**
   * The name of language. Could be different than what is fetched by an API.
   */
  langName: string;

  /**
   * The valid BCP-47 tag for the language.
   */
  bcp47Tag: string;

  /**
   * Who created the model?
   */
  authorName: string;

  /**
   * The model copyright.
   */
  copyright?: string;

  /**
   * The name of the Dictionary and Model ID
   */
  dictionaryName?: string;
}

/**
 * Information that relates to any advanced settings when uploading a file
 */
export interface UploadSettings {
  /**
   * The index of the word column
   */
  wordColInd: number;
  /**
   * The index of the count column
   */
  countColInd: number;
}
