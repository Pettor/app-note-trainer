import type { LanguageSelectorProps } from "./LanguageSelector";
import type { LocaleMode } from "~/core/locale/LocaleMode";
import { useLocale } from "~/core/locale/UseLocale";

export function useLanguageSelector(): LanguageSelectorProps {
  const { localeMode, setLocaleMode } = useLocale();

  function onSelect(mode: LocaleMode): void {
    setLocaleMode(mode);
  }

  return { mode: localeMode, onSelect };
}
