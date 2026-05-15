import type { PianoKeyData } from "~/components/input/piano-keyboard/UsePianoKeyboard";

export type NoteStep = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type Accidental = "natural" | "sharp";

export interface GameNotePitch {
  step: NoteStep;
  accidental: Accidental;
  octave: number;
}

export function pitchToLabel(pitch: GameNotePitch): string {
  const acc = pitch.accidental === "sharp" ? "#" : "";
  return `${pitch.step}${acc}${pitch.octave}`;
}

export function matchesPianoKey(pitch: GameNotePitch, key: PianoKeyData): boolean {
  const expectedNote = pitch.step + (pitch.accidental === "sharp" ? "#" : "");
  return key.note === expectedNote;
}
