/**
 * Derived from: https://www.npmjs.com/package/bcp-47#api
 */
declare module "bcp-47" {
  export function parse(tag: string, options?: ParseOptions): Schema;
  export function stringify(schema: Schema): string;

  interface ParseOptions {
    normalize?: boolean;
    forgiving?: boolean;
    warning?: Warning;
  }

  interface Schema {
    language: ISO639;
    extendedLanguageSubtags: ISO639[];
    script: ISO15924;
    region: ISO3166 | UNM49;
    variants: Variant[];
    extensions: Extension[];
    privateuse: string[];
    irregular: Irregular | null;
    regular: Regular | null;
  }

  type ISO639 = string;
  type ISO15924 = string;
  type ISO3166 = string;
  type UNM49 = string;
  type Variant = string;
  type Regular =
    | "art-lojban"
    | "cel-gaulish"
    | "no-bok"
    | "no-nyn"
    | "zh-guoyu"
    | "zh-hakka"
    | "zh-min"
    | "zh-min-nan"
    | "zh-xiang";
  type Irregular =
    | "en-GB-oed"
    | "i-ami"
    | "i-bnn"
    | "i-default"
    | "i-enochian"
    | "i-hak"
    | "i-klingon"
    | "i-lux"
    | "i-mingo"
    | "i-navajo"
    | "i-pwn"
    | "i-tao"
    | "i-tay"
    | "i-tsu"
    | "sgn-BE-FR"
    | "sgn-BE-NL"
    | "sgn-CH-DE";

  interface Extension {
    singleton: string;
    extensions: string[];
  }

  type Warning = (reason: string, code: number, offset: number) => void;
}
