import { WordListFromArray } from "@predictive-text-studio/lexical-model-compiler";
import Storage from "./storage";

export async function generateSourcesFromStorage(
  storage: Storage
): Promise<WordListFromArray[]> {
  const sourcesFromDB = await storage.fetchAllFiles();
  let sources: WordListFromArray[] = [];
  for (const { name, wordlist } of sourcesFromDB) {
    sources.push(new WordListFromArray(name, wordlist));
  }
  return sources;
}
