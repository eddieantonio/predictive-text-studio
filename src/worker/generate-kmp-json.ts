import {
  KmpJsonFile,
  KmpJsonFileSystem,
  KmpJsonFileOptions,
} from "@common/kmp-json-file";

/**
 * Given languages, generate a .kmp json file which contains metadata for .kmp zip archive.
 */
export function generateKmpJson(
  keymanDeveloperVersion: string,
  fileVersion: string,
  followKeyboardVersion: boolean
): string {
  const system: KmpJsonFileSystem = { keymanDeveloperVersion, fileVersion };
  const options: KmpJsonFileOptions = { followKeyboardVersion };
  const kmpJson: KmpJsonFile = { system, options };

  return JSON.stringify(kmpJson);
}
