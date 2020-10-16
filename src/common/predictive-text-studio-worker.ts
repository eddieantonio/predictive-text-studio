/**
 * This interface establishes a communication protocal between the UI thread and the worker thread
 */
export interface PredictiveTextStudioWorker {
  /**
   * Save a file into IndexedDB
   */
  saveFile(name: string, file: File): Promise<ArrayBuffer>;
  /**
   * Compile the lexical model using files in the IndexedDB
   */
  compileModel(): Promise<string>;
  /**
   * Fetch languages data from keyman api and save into IndexedDB
   */
  getLanguageData(): Promise<void>;
}
