import type { ReactElement } from "react";
import { PianoKeyboard } from "~/components/input/piano-keyboard/PianoKeyboard";
import type { PianoNote } from "~/components/input/piano-keyboard/UsePianoKeyboard";

export interface ScoreMiniKeyboardProps {
  correctNote: PianoNote;
  correctOctave: number;
  wrongNote: PianoNote | null;
  wrongOctave: number | null;
}

export function ScoreMiniKeyboard({
  correctNote,
  correctOctave,
  wrongNote,
  wrongOctave,
}: ScoreMiniKeyboardProps): ReactElement {
  const correctKey = `${correctNote}${correctOctave}`;
  const wrongKey = wrongNote && wrongOctave !== null ? `${wrongNote}${wrongOctave}` : undefined;

  return <PianoKeyboard readonly correctKey={correctKey} wrongKey={wrongKey} className="w-full" />;
}
