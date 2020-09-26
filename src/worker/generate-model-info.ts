import { ModelInfoFile } from "@common/model-info-file";

/**
 * Given languages, generate a model info json file
 */
export function generateModelInfoJson(languages: string[]): string {
  const modelInfo: ModelInfoFile = { license: "mit", languages };

  return JSON.stringify(modelInfo);
}
