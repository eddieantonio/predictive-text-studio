import { KeymanObj, LanguageObj } from "./keyman.modal";

export class KeymanApi {
  /**
   * API configs
   */
  baseUrl = "https://api.keyman.com/search";
  /**
   * Query data to searche only for languages that match
   */
  params = { q: "l" };
  url: URL;
  langageArray: Array<LanguageObj>;

  constructor() {
    this.langageArray = [];
    this.url = new URL(this.baseUrl);
    this.url.search = new URLSearchParams(this.params).toString();
  }

  async getLanaguageData(): Promise<LanguageObj[]> {
    return fetch(this.url.href)
      .then((response) => response.json())
      .then((data: { languages: Array<KeymanObj> }) => {
        data.languages.forEach((element) => {
          this.langageArray.push({ bcp47: element.id, language: element.name });
        });
      })
      .then(() => {
        return this.langageArray;
      })
      .catch((err) => {
        return err;
      });
  }
}
