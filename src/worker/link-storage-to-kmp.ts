import { WordListFromArray } from "@predictive-text-studio/lexical-model-compiler";
import { generateKmp } from "./generate-kmp";
import Storage from "./storage";
import { generateSourcesFromStorage } from "./generate-sources-from-storage";

export async function linkStorageToKmp(storage: Storage): Promise<ArrayBuffer> {
  const sources: WordListFromArray[] = await generateSourcesFromStorage(
    storage
  );

  //hardcode for now
  const langName = "English";
  const bcp47Tag = "en";
  const modelId = "nrc.en.mtnt";

  const kmpFile = await generateKmp(langName, bcp47Tag, sources, modelId);

  return kmpFile;
}
