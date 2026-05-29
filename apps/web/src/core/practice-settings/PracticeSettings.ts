export type Difficulty = "low" | "medium" | "high" | "nightmare" | "custom";
export type Staff = "treble" | "bass";
export type Duration = 3 | 5 | 8 | 12;
export type NoteRange = "narrow" | "standard" | "wide" | "extended";
export type LedgerDepth = 1 | 3;

export interface PresetSettings {
  noteRange: NoteRange;
  ledgerLines: boolean;
  ledgerDepth: LedgerDepth;
  sharps: boolean;
  naturals: boolean;
  timerEnabled: boolean;
  duration: Duration;
  guessScaleFirst: boolean;
}

export interface PracticeSettings extends PresetSettings {
  difficulty: Difficulty;
  staff: Staff;
}

export const DIFFICULTY_PRESETS: Record<"low" | "medium" | "high" | "nightmare", PresetSettings> = {
  low: {
    noteRange: "narrow",
    ledgerLines: false,
    ledgerDepth: 1,
    sharps: false,
    naturals: false,
    timerEnabled: false,
    duration: 8,
    guessScaleFirst: false,
  },
  medium: {
    noteRange: "wide",
    ledgerLines: true,
    ledgerDepth: 1,
    sharps: true,
    naturals: false,
    timerEnabled: true,
    duration: 8,
    guessScaleFirst: false,
  },
  high: {
    noteRange: "extended",
    ledgerLines: true,
    ledgerDepth: 3,
    sharps: true,
    naturals: false,
    timerEnabled: true,
    duration: 5,
    guessScaleFirst: true,
  },
  nightmare: {
    noteRange: "extended",
    ledgerLines: true,
    ledgerDepth: 3,
    sharps: true,
    naturals: true,
    timerEnabled: true,
    duration: 3,
    guessScaleFirst: true,
  },
};

export const DEFAULT_PRACTICE_SETTINGS: PracticeSettings = {
  difficulty: "medium",
  staff: "treble",
  ...DIFFICULTY_PRESETS.medium,
};
