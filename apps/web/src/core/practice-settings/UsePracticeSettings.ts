import { useAtom } from "jotai";
import type { PracticeSettings } from "./PracticeSettings";
import { DEFAULT_PRACTICE_SETTINGS } from "./PracticeSettings";
import { practiceSettingsAtom } from "./PracticeSettingsAtoms";

export interface UsePracticeSettingsResult {
  settings: PracticeSettings;
  updateSettings: (updates: Partial<PracticeSettings>) => void;
  resetSettings: () => void;
}

export function usePracticeSettings(): UsePracticeSettingsResult {
  const [settings, setSettings] = useAtom(practiceSettingsAtom);

  function updateSettings(updates: Partial<PracticeSettings>): void {
    setSettings((prev) => ({ ...prev, ...updates }));
  }

  function resetSettings(): void {
    setSettings(DEFAULT_PRACTICE_SETTINGS);
  }

  return { settings, updateSettings, resetSettings };
}
