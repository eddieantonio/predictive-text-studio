import { RelevantKmpOptions } from "@common/kmp-json-file";
/**
 * This interface establishes a communication protocal between the UI thread and the worker thread
 */
export interface PredictiveTextStudioWorker {
  /**
   * @deprecated removed in future
   * Save a file into IndexedDB
   */
  saveFile(name: string, file: File): Promise<ArrayBuffer>;
  /**
   * @deprecated removed in future
   * Compile the lexical model using files in the IndexedDB
   */
  compileModel(): Promise<string>;
  /**
   * Update the valid bcp47 tag to worker, this will affect the kmp file
   * @param bcp47Tag
   */
  updateBCP47Tag(bcp47Tag: string): Promise<void>;
  /**
   * Take a dictionary source and store it
   * @param name
   * @param contents
   * @return how many words were added
   */
  addDictionarySourceToProject(name: string, contents: File): Promise<number>;
  /**
   * Register a callback that is called directly before the KMP package is generated
   * @param callback
   */
  onPackageCompileStart(callback: () => void): void;
  /**
   * Register a callbcak that is called if the KMP package compilation fails
   * @param callback
   */
  onPackageCompileError(callback: (err: Error) => void): void;
  /**
   * Register a callback that is called when the KMP package has succesfully compiled
   * @param callback
   */
  onPackageCompileSuccess(callback: (kmp: ArrayBuffer) => void): void;
  /**
   * Sets optional and required metadata such as BCP-47, language name, author name, copyright string, etc.
   * @param metadata
   */
  setProjectData(metadata: Partial<Readonly<RelevantKmpOptions>>): void;
}
