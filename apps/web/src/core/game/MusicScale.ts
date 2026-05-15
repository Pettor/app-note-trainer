import type { NoteStep } from "./MusicNote";

export interface Scale {
  root: NoteStep;
  mode: "major" | "minor";
  sharpenedSteps: NoteStep[];
}

const NATURAL_SCALES: Scale[] = [
  { root: "C", mode: "major", sharpenedSteps: [] },
  { root: "A", mode: "minor", sharpenedSteps: [] },
];

const SHARP_SCALES: Scale[] = [
  { root: "G", mode: "major", sharpenedSteps: ["F"] },
  { root: "D", mode: "major", sharpenedSteps: ["F", "C"] },
  { root: "A", mode: "major", sharpenedSteps: ["F", "C", "G"] },
  { root: "E", mode: "major", sharpenedSteps: ["F", "C", "G", "D"] },
  { root: "E", mode: "minor", sharpenedSteps: ["F"] },
  { root: "B", mode: "minor", sharpenedSteps: ["F", "C"] },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export function pickRandomScale(sharpsEnabled: boolean): Scale {
  const pool = sharpsEnabled ? [...NATURAL_SCALES, ...SHARP_SCALES] : NATURAL_SCALES;
  return pickRandom(pool);
}

export function scaleDisplayName(scale: Scale): { keyName: string; scaleType: string } {
  const sharpSuffix = scale.sharpenedSteps.length > 0 ? "#" : "";
  return {
    keyName: `${scale.root}${sharpSuffix}`,
    scaleType: scale.mode,
  };
}
