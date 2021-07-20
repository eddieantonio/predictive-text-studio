import en from "../locales/en.json";
import es from "../locales/es.json";
import ko from "../locales/ko.json";
import type { LocaleDictionary } from "./localization";

/**
 * Available locales (translations).
 */
export const locales = { en, es, ko };

/**
 * Which locale to use if none of the others work out.
 * (spoilers: it's the generic English locale).
 */
export const FALLBACK_LOCALE = "en";

type RegistrationFunction = (locale: string, dict: LocaleDictionary) => unknown;

/**
 * Registers all known locales.
 */
export function registerAllLocalizationsUsing(
  register: RegistrationFunction
): void {
  for (const [tag, dict] of Object.entries(locales)) {
    register(tag, dict);
  }
}

/**
 * Returns the first locale that we have translations for.
 */
export function determinePreferredLocale(): string {
  const preferredLocales = navigator.languages || [navigator.language];

  for (const desiredLocale of preferredLocales) {
    if (locales.hasOwnProperty(desiredLocale)) {
      return desiredLocale;
    }
  }

  return FALLBACK_LOCALE;
}
