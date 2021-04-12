/**
 * This interface establishes a communication protocol between the UI thread and the worker thread
 */

import type { RelevantKmpOptions } from "@common/kmp-json-file";
import type {
  KeyboardDataWithTime,
  StoredProjectData,
  StoredWordList,
  ProjectMetadata,
  UploadSettings,
} from "@common/types";

export interface PredictiveTextStudioWorker {
  /////////////////////// Modify dictionary sources ////////////////////////

  /**
   * Save a Google Sheet to the current project
   */
  saveGoogleSheet(
    project: number,
    name: string,
    rows: string[][],
    settings: UploadSettings
  ): Promise<void>;

  /**
   * Compile the lexical model using files in the IndexedDB
   * Take a dictionary source and store it.
   *
   * @param name the dictionary source name — typically the uploaded filename.
   * @param contents the actual file itself
   * @param settings the settings of what should occur when adding a dictionary source to a project
   * @return {number} how many words were added by this source
   */
  addDictionarySourceToProject(
    project: number,
    name: string,
    contents: File,
    settings: UploadSettings
  ): Promise<number>;

  /**
   * Remove a dictionary within the IndexedDB
   * @param name the name of the wordlist to remove
   */
  removeDictionaryFromProject(name: string, project: number): Promise<void>;

  /**
   * Store the manual entry data into the database
   * @param name the name of the dictionary souce
   * @param wordlist Manual entry data
   */
  putDirectEntry(source: StoredWordList): Promise<number>;

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
   * Creates new project data.
   */
  createProjectData(): Promise<number>;

  /**
   * Deletes project data with given project ID.
   * @param project project ID
   */
  deleteProjectData(project: number | undefined): Promise<void>;

  /**
   * Sets optional and required metadata such as BCP-47, language name, author
   * name, copyright string, etc.
   *
   * Note that the KMP package requires at least a BCP-47 tag before it can
   * compile properly.
   *
   * @see RelevantKmpOptions
   */
  putProjectData(
    metadata: Partial<Readonly<RelevantKmpOptions>>,
    project?: number
  ): Promise<number>;

  /**
   * Returns all of the current project's metadata.
   */
  fetchAllCurrentProjectMetadata(project?: number): Promise<ProjectMetadata>;

  /**
   * Returns whether or not a project currently exists
   */
  doesProjectExist(): Promise<boolean>;

  ///////////////////////////////// Caches /////////////////////////////////

  /**
   * Retrieves a cache of supported languages with existing Keyman keyboards,
   * according to the Keyman API.
   */
  fetchCachedKeyboardLanguageList(): Promise<KeyboardDataWithTime[]>;

  /**
   * Retrieving File data from the IndexedDB storage
   */
  getFilesFromStorage(project?: number): Promise<StoredWordList[]>;

  /**
   * Retrieving Project data from the IndexedDB storage
   */
  getProjectDataFromStorage(): Promise<StoredProjectData[]>;

  /**
   * Generates a JSON string of the current IndexedDB
   */
  exportProjectData(): Promise<string>;

  /**
   * Imports data from a JSON string generated using exportProjectData()
   */
  importProjectData(data: string): Promise<void>;
}
