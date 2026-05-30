import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { LocaleMode } from "./LocaleMode";

const localeLocalStorageAtom = atomWithStorage<LocaleMode>("locale", "en");

export const localeModeAtom = atom(
  (get) => get(localeLocalStorageAtom) || "en",
  (_get, set, newLocale: LocaleMode) => {
    set(localeLocalStorageAtom, newLocale);
  }
);
