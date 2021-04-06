import { generateKmp } from "./generate-kmp";
import Storage from "./storage";
import { generateSourcesFromStorage } from "./generate-sources-from-storage";
import { ProjectMetadata } from "@common/types";

export async function linkStorageToKmp(storage: Storage): Promise<ArrayBuffer> {
  const sources = await generateSourcesFromStorage(storage);

  let projectData: ProjectMetadata;
  try {
    projectData = await storage.fetchProjectData();
  } catch (e) {
    throw new Error(
      "Could not fetch the package info; Did you update the package BCP-47 tag?"
    );
  }
  const { language, bcp47Tag, authorName, copyright, dictionaryName } = projectData;
  const modelID = `${authorName}.${bcp47Tag}.example`;

  return generateKmp(language, bcp47Tag, sources, modelID, authorName, copyright, dictionaryName);
}
