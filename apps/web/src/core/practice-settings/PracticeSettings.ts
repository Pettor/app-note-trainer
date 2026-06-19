export type Difficulty = "low" | "medium" | "high" | "pro" | "custom";
export type Staff = "treble" | "bass";
export type Duration = 3 | 5 | 8 | 12;
export type NoteRange = "narrow" | "standard" | "wide" | "extended";
export type LedgerDepth = 1 | 3;
export type PracticeMode = "single" | "chord";
export type ChordPool = "triads" | "sevenths";

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
  mode: PracticeMode;
  chordPool: ChordPool;
}

export const DIFFICULTY_PRESETS: Record<"low" | "medium" | "high" | "pro", PresetSettings> = {
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
    noteRange: "standard",
    ledgerLines: true,
    ledgerDepth: 1,
    sharps: true,
    naturals: false,
    timerEnabled: true,
    duration: 8,
    guessScaleFirst: false,
  },
  high: {
    noteRange: "wide",
    ledgerLines: true,
    ledgerDepth: 3,
    sharps: true,
    naturals: false,
    timerEnabled: true,
    duration: 5,
    guessScaleFirst: true,
  },
  pro: {
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
  mode: "single",
  chordPool: "triads",
  ...DIFFICULTY_PRESETS.medium,
};
