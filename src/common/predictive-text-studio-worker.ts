/**
 * This interface establishes a communication protocol between the UI thread and the worker thread
 */

import type { RelevantKmpOptions } from "@common/kmp-json-file";
import type {
  KeyboardDataWithTime,
  ProjectMetadata,
  WordList,
  WordListSource,
} from "@common/types";

export interface PredictiveTextStudioWorker {
  /////////////////////// Modify dictionary sources ////////////////////////

  /**
   * Save a Google Sheet to the current project
   */
  readGoogleSheet(name: string, wordList: WordList): Promise<ArrayBuffer>;

  /**
   * Compile the lexical model using files in the IndexedDB
   * Take a dictionary source and store it.
   *
   * @param name the dictionary source name — typically the uploaded filename.
   * @param contents the actual file itself
   * @return {number} how many words were added by this source
   */
  addDictionarySourceToProject(name: string, contents: File): Promise<number>;

  /**
   * Remove a dictionary within the IndexedDB
   * @param name the name of the wordlist to remove
   */
  removeDictionaryFromProject(name: string): Promise<number>;

  /**
   * Store the manual entry data into the database
   * @param name the name of the dictionary souce
   * @param wordlist Manual entry data
   */
  addManualEntryDictionaryToProject(
    name: string,
    wordlist: WordList
  ): Promise<number>;

  ///////////////////////////// Event handlers /////////////////////////////

  /**
   * Register a callback that is called directly before the KMP package is
   * generated.
   */
  onPackageCompileStart(callback: () => void): void;

  /**
   * Register a callbcak that is called if the KMP package compilation fails.
   */
  onPackageCompileError(callback: (err: Error) => void): void;

  /**
   * Register a callback that is called when the KMP package has succesfully
   * compiled.
   */
  onPackageCompileSuccess(callback: (kmp: ArrayBuffer) => void): void;

  ////////////////////// Manipulate project metadata ///////////////////////

  /**
   * Sets optional and required metadata such as BCP-47, language name, author
   * name, copyright string, etc.
   *
   * Note that the KMP package requires at least a BCP-47 tag before it can
   * compile properly.
   *
   * @see RelevantKmpOptions
   */
  setProjectData(
    metadata: Partial<Readonly<RelevantKmpOptions>>
  ): Promise<void>;

  /**
   * Returns all of the current project's metadata.
   */
  fetchAllCurrentProjectMetadata(): Promise<ProjectMetadata>;

  ///////////////////////////////// Caches /////////////////////////////////

  /**
   * Retrieves a cache of supported languages with existing Keyman keyboards,
   * according to the Keyman API.
   */
  fetchCachedKeyboardLanguageList(): Promise<KeyboardDataWithTime[]>;

  /**
   * Retrieving File data from the IndexedDB storage
   */
  getFilesFromStorage(): Promise<WordListSource[]>;
}
