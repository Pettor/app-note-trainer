import type { NoteStep } from "./MusicNote";

export interface Scale {
  root: NoteStep;
  mode: "major" | "minor";
  sharpenedSteps: NoteStep[];
  flattenedSteps: NoteStep[];
}

export interface KeySignatureInfo {
  type: "sharp" | "flat";
  count: number;
}

const NATURAL_SCALES: Scale[] = [
  { root: "C", mode: "major", sharpenedSteps: [], flattenedSteps: [] },
  { root: "A", mode: "minor", sharpenedSteps: [], flattenedSteps: [] },
];

const SHARP_SCALES: Scale[] = [
  // Major sharp scales
  { root: "G", mode: "major", sharpenedSteps: ["F"], flattenedSteps: [] },
  { root: "D", mode: "major", sharpenedSteps: ["F", "C"], flattenedSteps: [] },
  { root: "A", mode: "major", sharpenedSteps: ["F", "C", "G"], flattenedSteps: [] },
  { root: "E", mode: "major", sharpenedSteps: ["F", "C", "G", "D"], flattenedSteps: [] },
  { root: "B", mode: "major", sharpenedSteps: ["F", "C", "G", "D", "A"], flattenedSteps: [] },
  { root: "F", mode: "major", sharpenedSteps: ["F", "C", "G", "D", "A", "E"], flattenedSteps: [] },
  // Minor sharp scales
  { root: "E", mode: "minor", sharpenedSteps: ["F"], flattenedSteps: [] },
  { root: "B", mode: "minor", sharpenedSteps: ["F", "C"], flattenedSteps: [] },
  { root: "F", mode: "minor", sharpenedSteps: ["F", "C", "G"], flattenedSteps: [] },
  { root: "C", mode: "minor", sharpenedSteps: ["F", "C", "G", "D"], flattenedSteps: [] },
  { root: "G", mode: "minor", sharpenedSteps: ["F", "C", "G", "D", "A"], flattenedSteps: [] },
];

const FLAT_SCALES: Scale[] = [
  // Major flat scales
  { root: "F", mode: "major", sharpenedSteps: [], flattenedSteps: ["B"] },
  { root: "B", mode: "major", sharpenedSteps: [], flattenedSteps: ["B", "E"] },
  { root: "E", mode: "major", sharpenedSteps: [], flattenedSteps: ["B", "E", "A"] },
  { root: "A", mode: "major", sharpenedSteps: [], flattenedSteps: ["B", "E", "A", "D"] },
  { root: "D", mode: "major", sharpenedSteps: [], flattenedSteps: ["B", "E", "A", "D", "G"] },
  { root: "G", mode: "major", sharpenedSteps: [], flattenedSteps: ["B", "E", "A", "D", "G", "C"] },
  // Minor flat scales
  { root: "D", mode: "minor", sharpenedSteps: [], flattenedSteps: ["B"] },
  { root: "G", mode: "minor", sharpenedSteps: [], flattenedSteps: ["B", "E"] },
  { root: "C", mode: "minor", sharpenedSteps: [], flattenedSteps: ["B", "E", "A"] },
  { root: "F", mode: "minor", sharpenedSteps: [], flattenedSteps: ["B", "E", "A", "D"] },
  { root: "B", mode: "minor", sharpenedSteps: [], flattenedSteps: ["B", "E", "A", "D", "G"] },
  { root: "E", mode: "minor", sharpenedSteps: [], flattenedSteps: ["B", "E", "A", "D", "G", "C"] },
];

export const ALL_SCALES: Scale[] = [...NATURAL_SCALES, ...SHARP_SCALES, ...FLAT_SCALES];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

export function pickRandomScale(sharpsEnabled: boolean): Scale {
  const pool = sharpsEnabled ? ALL_SCALES : NATURAL_SCALES;
  return pickRandom(pool);
}

function scaleId(s: Scale): string {
  const { keyName, scaleType } = scaleDisplayName(s);
  return `${keyName}-${scaleType}`;
}

export function generateScaleChoices(correctScale: Scale): Scale[] {
  const correctId = scaleId(correctScale);
  const candidates = ALL_SCALES.filter((s) => scaleId(s) !== correctId);
  const shuffled = shuffle(candidates);
  const choices = shuffled.slice(0, 3);
  choices.splice(Math.floor(Math.random() * 4), 0, correctScale);
  return choices;
}

export function scaleDisplayName(scale: Scale): { keyName: string; scaleType: string } {
  const rootIsSharp = scale.sharpenedSteps.includes(scale.root);
  const rootIsFlat = scale.flattenedSteps.includes(scale.root);
  const suffix = rootIsSharp ? "#" : rootIsFlat ? "b" : "";
  return {
    keyName: `${scale.root}${suffix}`,
    scaleType: scale.mode,
  };
}

export function getKeySignature(scale: Scale): KeySignatureInfo {
  if (scale.sharpenedSteps.length > 0) {
    return { type: "sharp", count: scale.sharpenedSteps.length };
  }
  if (scale.flattenedSteps.length > 0) {
    return { type: "flat", count: scale.flattenedSteps.length };
  }
  return { type: "sharp", count: 0 };
}
