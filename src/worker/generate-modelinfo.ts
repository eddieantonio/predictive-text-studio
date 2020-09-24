/**
 * Interfaces derived from the keyman documentation: https://help.keyman.com/developer/cloud/model_info/1.0/
 */
interface ModelInfo {
  id?: string;
  name?: string;
  authorName?: string;
  authorEmail?: string;
  description?: string;
  license: string;
  languages?: string[];
  lastModifiedDate?: string;
  links?: ModelLinkInfo[];
  packageFilename?: string;
  packageFileSize?: number;
  jsFilename?: string;
  jsFileSize?: number;
  isRTL?: boolean;
  packageIncludes?: string;
  version?: string;
  minKeymanVersion?: string;
  helpLink?: string;
  sourcePath?: string;
  related?: ModelRelatedInfo;
}

interface ModelLinkInfo {
  name: string;
  url: string;
}

interface ModelRelatedInfo {
  deprecates?: boolean;
  deprecatedBy?: boolean;
  note?: string;
}

/**
 * Given languages, generate a .kmp json file which contains metadata for .kmp zip archive.
 */
export function generateModelInfoJson(languages: string[]): string {
  const license = "mit";
  const modelInfo: ModelInfo = { license, languages };

  return JSON.stringify(modelInfo);
}
