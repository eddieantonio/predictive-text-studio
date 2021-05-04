import { WordListFromArray } from "@predictive-text-studio/lexical-model-compiler";
import Storage from "./storage";

export async function generateSourcesFromStorage(
  storage: Storage,
  project: number
): Promise<WordListFromArray[]> {
  const sourcesFromDB = await storage.fetchFiles(project);
  const sources: WordListFromArray[] = [];
  for (const { name, wordlist } of sourcesFromDB) {
    sources.push(new WordListFromArray(name, wordlist));
  }
  return sources;
}
