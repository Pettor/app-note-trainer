export type Difficulty = "low" | "medium" | "high";
export type Staff = "treble" | "bass";
export type Duration = 3 | 5 | 8 | 12;

export interface PracticeSettings {
  difficulty: Difficulty;
  staff: Staff;
  sharps: boolean;
  timerEnabled: boolean;
  duration: Duration;
}

export const DEFAULT_PRACTICE_SETTINGS: PracticeSettings = {
  difficulty: "medium",
  staff: "treble",
  sharps: false,
  timerEnabled: false,
  duration: 5,
};
