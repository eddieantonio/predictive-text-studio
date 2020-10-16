import { DBSchema } from "idb";
export interface LanguageObj {
  bcp47: string;
  language: string;
}

export interface KeymanObj {
  keyboards: Array<string>;
  id: string;
  name: string;
}

export interface KeymanDB extends DBSchema {
  keymanLanguages: {
    key: string;
    value: string;
  };
}
