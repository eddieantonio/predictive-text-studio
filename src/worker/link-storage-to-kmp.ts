import { generateKmp } from "./generate-kmp";
import Storage from "./storage";
import { generateSourcesFromStorage } from "./generate-sources-from-storage";

export async function linkStorageToKmp(storage: Storage): Promise<ArrayBuffer> {
  const sources = await generateSourcesFromStorage(storage);

  let projectData;
  try {
    projectData = await storage.fetchProjectData();
  } catch (e) {
    throw new Error(
      "Could not fetch the package info; Did you update the package BCP-47 tag?"
    );
  }
  const { langName, bcp47Tag, authorName } = projectData;
  const modelID = `${authorName}.${bcp47Tag}.example`;

  return generateKmp(langName, bcp47Tag, sources, modelID);
}
