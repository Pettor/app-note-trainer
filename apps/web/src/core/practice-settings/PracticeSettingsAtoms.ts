import { atomWithStorage } from "jotai/utils";
import type { PracticeSettings } from "./PracticeSettings";
import { DEFAULT_PRACTICE_SETTINGS } from "./PracticeSettings";

export const practiceSettingsAtom = atomWithStorage<PracticeSettings>("practice-settings", DEFAULT_PRACTICE_SETTINGS);
