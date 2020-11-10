import { SearchLanguage } from "./models";
import { KeyboardData } from "./storage-models";

/**
 * @file KeymanAPI class to implement all services provided by official Keyman API
 * Note: Currently this class is used for the functionality to fetch all existing keyboard languages
 * and more function(s) could be added in the future
 */
export class KeymanAPI {
  /**
   * API configs
   */
  baseUrl = "https://api.keyman.com/search";
  /**
   * Query all languages data, doc: https://help.keyman.com/developer/cloud/search/1.0/
   */
  params = { q: "" };
  url: URL;
  languages: KeyboardData[];

  constructor() {
    this.languages = [];
    this.url = new URL(this.baseUrl);
    this.url.search = new URLSearchParams(this.params).toString();
  }

  fetchLanaguageData(): Promise<KeyboardData[]> {
    return fetch(this.url.href)
      .then((response) => response.json())
      .then((data: { languages: SearchLanguage[] }) => {
        data.languages.forEach((element) => {
          this.languages.push({
            bcp47Tag: element.id,
            language: element.name,
          });
        });
      })
      .then(() => {
        return this.languages;
      });
  }
}
