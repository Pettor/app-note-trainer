import type { PianoKeyData, PianoNote } from "~/components/input/piano-keyboard/UsePianoKeyboard";

export type NoteStep = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type Accidental = "natural" | "sharp" | "flat";

export interface GameNotePitch {
  step: NoteStep;
  accidental: Accidental;
  octave: number;
}

// Maps a flat note step to its enharmonic sharp equivalent on the piano keyboard.
// Cb → B (natural), Fb → E (natural), all others → sharp of the adjacent white key.
const FLAT_ENHARMONIC: Partial<Record<NoteStep, PianoNote>> = {
  B: "A#",
  E: "D#",
  A: "G#",
  D: "C#",
  G: "F#",
  C: "B",
  F: "E",
};

export function pitchToLabel(pitch: GameNotePitch): string {
  if (pitch.accidental === "sharp") return `${pitch.step}#${pitch.octave}`;
  if (pitch.accidental === "flat") return `${pitch.step}b${pitch.octave}`;
  return `${pitch.step}${pitch.octave}`;
}

export function matchesPianoKey(pitch: GameNotePitch, key: PianoKeyData): boolean {
  if (pitch.accidental === "sharp") return key.note === `${pitch.step}#`;
  if (pitch.accidental === "flat") {
    const enharmonic = FLAT_ENHARMONIC[pitch.step];
    return enharmonic != null ? key.note === enharmonic : key.note === pitch.step;
  }
  return key.note === pitch.step;
}
