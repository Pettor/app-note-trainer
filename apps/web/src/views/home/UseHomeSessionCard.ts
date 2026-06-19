import type {
  ChordPool,
  Difficulty,
  Duration,
  LedgerDepth,
  NoteRange,
  PracticeMode,
  PresetSettings,
  Staff,
} from "~/core/practice-settings/PracticeSettings";
import { DIFFICULTY_PRESETS } from "~/core/practice-settings/PracticeSettings";
import { usePracticeSettings } from "~/core/practice-settings/UsePracticeSettings";

export interface HomeSessionCardState {
  difficulty: Difficulty;
  staff: Staff;
  mode: PracticeMode;
  chordPool: ChordPool;
  noteRange: NoteRange;
  ledgerLines: boolean;
  ledgerDepth: LedgerDepth;
  sharps: boolean;
  naturals: boolean;
  timerEnabled: boolean;
  duration: Duration;
  guessScaleFirst: boolean;
  onDifficultyChange: (value: Difficulty) => void;
  onStaffChange: (value: Staff) => void;
  onModeChange: (value: PracticeMode) => void;
  onChordPoolChange: (value: ChordPool) => void;
  onNoteRangeChange: (value: NoteRange) => void;
  onLedgerLinesChange: (value: boolean) => void;
  onLedgerDepthChange: (value: LedgerDepth) => void;
  onSharpsChange: (value: boolean) => void;
  onNaturalsChange: (value: boolean) => void;
  onTimerChange: (value: boolean) => void;
  onDurationChange: (value: Duration) => void;
  onGuessScaleFirstChange: (value: boolean) => void;
}

function detectPreset(s: PresetSettings): Difficulty {
  for (const [name, preset] of Object.entries(DIFFICULTY_PRESETS)) {
    if (
      preset.noteRange === s.noteRange &&
      preset.ledgerLines === s.ledgerLines &&
      preset.ledgerDepth === s.ledgerDepth &&
      preset.sharps === s.sharps &&
      preset.naturals === s.naturals &&
      preset.timerEnabled === s.timerEnabled &&
      preset.duration === s.duration &&
      preset.guessScaleFirst === s.guessScaleFirst
    ) {
      return name as Difficulty;
    }
  }
  return "custom";
}

export function useHomeSessionCard(): HomeSessionCardState {
  const { settings, updateSettings } = usePracticeSettings();

  function applyIndividualUpdate(updates: Partial<PresetSettings>): void {
    const merged = { ...settings, ...updates };
    const difficulty = detectPreset(merged);
    updateSettings({ ...updates, difficulty });
  }

  return {
    difficulty: settings.difficulty,
    staff: settings.staff,
    mode: settings.mode ?? "single",
    chordPool: settings.chordPool ?? "triads",
    noteRange: settings.noteRange,
    ledgerLines: settings.ledgerLines,
    ledgerDepth: settings.ledgerDepth,
    sharps: settings.sharps,
    naturals: settings.naturals,
    timerEnabled: settings.timerEnabled,
    duration: settings.duration,
    guessScaleFirst: settings.guessScaleFirst,
    onDifficultyChange: (value) => {
      if (value === "custom") {
        updateSettings({ difficulty: "custom" });
      } else {
        updateSettings({ difficulty: value, ...DIFFICULTY_PRESETS[value] });
      }
    },
    onStaffChange: (value) => updateSettings({ staff: value }),
    onModeChange: (value) => updateSettings({ mode: value }),
    onChordPoolChange: (value) => updateSettings({ chordPool: value }),
    onNoteRangeChange: (value) => applyIndividualUpdate({ noteRange: value }),
    onLedgerLinesChange: (value) => applyIndividualUpdate({ ledgerLines: value }),
    onLedgerDepthChange: (value) => applyIndividualUpdate({ ledgerDepth: value }),
    onSharpsChange: (value) => applyIndividualUpdate({ sharps: value }),
    onNaturalsChange: (value) => applyIndividualUpdate({ naturals: value }),
    onTimerChange: (value) => applyIndividualUpdate({ timerEnabled: value }),
    onDurationChange: (value) => applyIndividualUpdate({ duration: value }),
    onGuessScaleFirstChange: (value) => applyIndividualUpdate({ guessScaleFirst: value }),
  };
}
