import type { Difficulty, Duration, Staff } from "~/core/practice-settings/PracticeSettings";
import { usePracticeSettings } from "~/core/practice-settings/UsePracticeSettings";

export interface HomeSessionCardState {
  difficulty: Difficulty;
  staff: Staff;
  sharps: boolean;
  timerEnabled: boolean;
  duration: Duration;
  onDifficultyChange: (value: Difficulty) => void;
  onStaffChange: (value: Staff) => void;
  onSharpsChange: (value: boolean) => void;
  onTimerChange: (value: boolean) => void;
  onDurationChange: (value: Duration) => void;
}

export function useHomeSessionCard(): HomeSessionCardState {
  const { settings, updateSettings } = usePracticeSettings();

  return {
    difficulty: settings.difficulty,
    staff: settings.staff,
    sharps: settings.sharps,
    timerEnabled: settings.timerEnabled,
    duration: settings.duration,
    onDifficultyChange: (value) => updateSettings({ difficulty: value }),
    onStaffChange: (value) => updateSettings({ staff: value }),
    onSharpsChange: (value) => updateSettings({ sharps: value }),
    onTimerChange: (value) => updateSettings({ timerEnabled: value }),
    onDurationChange: (value) => updateSettings({ duration: value }),
  };
}
