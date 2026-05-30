import type { LocaleMode } from "./LocaleMode";

export interface LocaleConfigEntry {
  locale: string;
  flag: string;
  label: string;
}

export const LOCALE_CONFIG: Record<LocaleMode, LocaleConfigEntry> = {
  en: { locale: "en", flag: "🇬🇧", label: "English" },
  sv: { locale: "sv", flag: "🇸🇪", label: "Svenska" },
};
