/**
 * @file Interfaces used across the worker files excluding stroage
 */

/**
 * KMP endpoint returning object type. Doc: https://help.keyman.com/developer/cloud/search/1.0/#toc-searchlanguage-object
 */
export interface SearchLanguage {
  keyboards: Array<string>;
  id: string;
  name: string;
}
