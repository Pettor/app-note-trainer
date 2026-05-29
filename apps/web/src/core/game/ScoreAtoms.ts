import { atom } from "jotai";
import type { MissRecord } from "./GameLoop";
import type { KeySignatureInfo } from "./MusicScale";
import type { PracticeSettings } from "~/core/practice-settings/PracticeSettings";

export interface ScoreResult {
  totalNotes: number;
  correctCount: number;
  misses: MissRecord[];
  totalTime: number;
  fastestCorrect: number;
  settings: PracticeSettings;
  keyName: string;
  scaleType: string;
  keySignature: KeySignatureInfo;
}

export const scoreResultAtom = atom<ScoreResult | null>(null);
