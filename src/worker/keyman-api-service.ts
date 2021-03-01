import { SearchLanguage } from "./models";
import { KeyboardData } from "./storage-models";

const KEYMAN_KEYBOARDS_API =
  "https://cache.predictivetext.studio/cached-keyman-api.json";

/**
 * @file KeymanAPI class to implement all services provided by official Keyman API
 * Note: Currently this class is used for the functionality to fetch all existing keyboard languages
 * and more function(s) could be added in the future
 */
export class KeymanAPI {
  async fetchLanaguageData(): Promise<KeyboardData[]> {
    const response = await fetch(KEYMAN_KEYBOARDS_API);
    const data: { languages: SearchLanguage[] } = await response.json();
    return data.languages.map((language) => {
      return { bcp47Tag: language.id, language: language.name };
    });
  }
}
