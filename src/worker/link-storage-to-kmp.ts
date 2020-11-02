import { WordListFromArray } from "@predictive-text-studio/lexical-model-compiler";
import { generateKmp } from "./generate-kmp";
import Storage from "./storage";
import { generateSourcesFromStorage } from "./generate-sources-from-storage";

export async function linkStorageToKmp(storage: Storage): Promise<ArrayBuffer> {
  const sources: WordListFromArray[] = await generateSourcesFromStorage(
    storage
  );

  const maybeProjectData = await storage.fetchProjectData();
  if (maybeProjectData == undefined) {
    throw new Error(
      "Could not fetch the package info; Did you update the package BCP-47 tag?"
    );
  }
  const langName = maybeProjectData.langName;
  const bcp47Tag = maybeProjectData.bcp47Tag;
  const authorName = maybeProjectData.authorName;
  const modelID = `${authorName}.${bcp47Tag}.example`;

  const kmpFile = await generateKmp(langName, bcp47Tag, sources, modelID);

  return kmpFile;
}
