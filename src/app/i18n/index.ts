import en from "./en";
import es from "./es";
import ko from "./ko";

/**
 * Available locales (translations).
 */
export const locales = { en, es, ko };

/**
 * Which locale to use if none of the others work out.
 * (spoilers: it's the generic English locale).
 */
export const FALLBACK_LOCALE = "en";

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
