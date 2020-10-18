import { WordListFromArray } from "@predictive-text-studio/lexical-model-compiler";
import { generateKmp } from "./generate-kmp";
import Storage from "./storage";
import { generateSourcesFromStorage } from "./generate-sources-from-storage";

export async function linkStorageToKmp(storage: Storage): Promise<ArrayBuffer> {
  const sources: WordListFromArray[] = await generateSourcesFromStorage(
    storage
  );
  
  const maybePackageInfo = await storage.fetchPackageInfo();
  if (maybePackageInfo == undefined) {
    throw new Error("the packageInfo is undefined");
  }
  
  //hardcode for now
  const langName = "English";
  const bcp47Tag = maybePackageInfo.bcp47Tag;
  const modelID = `unknownauthor.${bcp47Tag}.example`;

  const kmpFile = await generateKmp(langName, bcp47Tag, sources, modelID);

  return kmpFile;
}
