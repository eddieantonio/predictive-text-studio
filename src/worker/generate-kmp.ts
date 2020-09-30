import { generateKmpJson } from "./generate-kmp-json";
import { createZipWithFiles } from "./generate-zip";
import {
  compileModelFromLexicalModelSource,
  WordListFromArray,
} from "@predictive-text-studio/lexical-model-compiler";

/**
 * Give file information and create a kmp file for the dictionary
 *
 * Format of the lexical model file: {model_id}.model.js
 * the compiled code generated by the @predictive-text-studio/lexical-model-compiler
 *
 * @param modelID
 * @param compiledModelCode
 * @param modelInfo
 */
export async function generateKmp(
  langName: string,
  bcp47Tag: string,
  sources: WordListFromArray[],
  modelId: string
): Promise<ArrayBuffer> {
  const kmpJsonFile = generateKmpJson({
    languages: [{ name: langName, id: bcp47Tag }],
  });
  const modelFile = compileModelFromLexicalModelSource({
    format: "trie-1.0",
    sources: sources,
  });

  const kmpFile = createZipWithFiles({
    [`${modelId}.model.js`]: modelFile,
    "kmp.json": kmpJsonFile,
  });
  return kmpFile;
}
