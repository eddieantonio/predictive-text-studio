/**
 * Shamelessly copy-pasted from https://github.com/kaisermann/svelte-i18n/blob/62cc867f0acd35cc2f42fd7b2a51c2f865464630/src/runtime/types/index.ts#L3-L5
 */
export interface LocaleDictionary {
  [key: string]: LocaleDictionary | string | (string | LocaleDictionary)[];
}
