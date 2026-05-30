import { useAtom } from "jotai";
import { localeModeAtom } from "./LocaleAtoms";
import type { LocaleMode } from "./LocaleMode";

export interface UseLocaleResult {
  localeMode: LocaleMode;
  setLocaleMode: (mode: LocaleMode) => void;
}

export function useLocale(): UseLocaleResult {
  const [localeMode, setLocaleMode] = useAtom(localeModeAtom);
  return { localeMode, setLocaleMode };
}
