/**
 * This interface establishes a communication protocol between the UI thread and the worker thread
 */

import type { WordList } from "@common/types";

export interface PredictiveTextStudioWorker {
  /**
   * Save a file into IndexedDB
   */
  saveFile(name: string, file: File): Promise<ArrayBuffer>;
  /**
   * Save a google sheet into IndexedDB
   */
  readGoogleSheet(name: string, wordListObject: WordList): Promise<ArrayBuffer>;
  /**
   * Compile the lexical model using files in the IndexedDB
   */
  compileModel(): Promise<string>;
}
