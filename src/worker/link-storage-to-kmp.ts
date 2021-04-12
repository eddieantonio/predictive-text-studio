import { generateKmp } from "./generate-kmp";
import Storage from "./storage";
import { generateSourcesFromStorage } from "./generate-sources-from-storage";
import { ProjectMetadata } from "@common/types";

export async function linkStorageToKmp(
  project = 1,
  storage: Storage
): Promise<ArrayBuffer> {
  const sources = await generateSourcesFromStorage(storage);

  let projectData: ProjectMetadata;
  try {
    projectData = await storage.fetchProjectData(project);
  } catch (e) {
    throw new Error(
      "Could not fetch the package info; Did you update the package BCP-47 tag?"
    );
  }
  const { language, bcp47Tag, authorName } = projectData;
  const modelID = `${authorName}.${bcp47Tag}.example`;

  return generateKmp(language, bcp47Tag, sources, modelID);
}
