/**
 * Interfaces derived from the keyman documentation: https://help.keyman.com/developer/cloud/model_info/1.0/
 */
export interface ModelInfo {
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

export interface ModelLinkInfo {
  name: string;
  url: string;
}

export interface ModelRelatedInfo {
  deprecates?: boolean;
  deprecatedBy?: boolean;
  note?: string;
}
