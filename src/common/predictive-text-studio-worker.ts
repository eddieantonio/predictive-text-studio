import type { RelevantKmpOptions } from "./kmp-json-file";

/**
 * This interface establishes a communication protocal between the UI thread and the worker thread
 */
export interface PredictiveTextStudioWorker {
  /**
   * @deprecated use addDictionarySourceToProject instead.
   * Save a file into IndexedDB, compile the updated model, and generate the
   * KMP file.
   */
  saveFile(name: string, file: File): Promise<ArrayBuffer>;

  /**
   * @deprecated register a callback using onPackageCompileSuccess instead
   * Compile the lexical model using files in the IndexedDB, returning the
   * JavaScript source code.
   */
  compileModel(): Promise<string>;

  /**
   * Update the valid BCP4-7 tag to worker, this will affect the kmp file
   * @param bcp47Tag
   */
  updateBCP47Tag(bcp47Tag: string): Promise<void>;

  /**
   * Take a dictionary source and store it.
   *
   * @param name the dictionary source name — typically the uploaded filename.
   * @param contents the actual file itself
   * @return {number} how many words were added by this source
   */
  addDictionarySourceToProject(name: string, contents: File): Promise<number>;

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

  /**
   * Sets optional and required metadata such as BCP-47, language name, author
   * name, copyright string, etc.
   *
   * Note that the KMP package requires at least a BCP-47 tag before it can
   * compile properly.
   *
   * @see RelevantKmpOptions
   */
  setProjectData(metadata: Partial<Readonly<RelevantKmpOptions>>): void;
}
