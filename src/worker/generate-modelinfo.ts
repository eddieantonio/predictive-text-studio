import { ModelInfo } from "@common/modelinfo";

/**
 * Given languages, generate a .kmp json file which contains metadata for .kmp zip archive.
 */
export function generateModelInfoJson(languages: string[]): string {
  const license = "mit";
  const modelInfo: ModelInfo = { license, languages };

  return JSON.stringify(modelInfo);
}
