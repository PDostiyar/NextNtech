import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fa", "ps"] as const;
export type Locale = (typeof locales)[number];

/** Dari (fa) and Pashto (ps) are written right-to-left. */
export const rtlLocales: ReadonlySet<Locale> = new Set(["fa", "ps"]);
export const dirFor = (locale: Locale) => (rtlLocales.has(locale) ? "rtl" : "ltr");

export const localeLabels: Record<Locale, string> = { en: "EN", fa: "دری", ps: "پښتو" };

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
});
