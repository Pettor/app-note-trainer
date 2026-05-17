import type { ReactElement } from "react";
import { PianoKeyboard } from "~/components/input/piano-keyboard/PianoKeyboard";
import type { PianoNote } from "~/components/input/piano-keyboard/UsePianoKeyboard";

export interface ScoreMiniKeyboardProps {
  correctNote: PianoNote;
  wrongNote: PianoNote | null;
}

export function ScoreMiniKeyboard({ correctNote, wrongNote }: ScoreMiniKeyboardProps): ReactElement {
  // The keyboard always starts at C4 and shows 1 octave on mobile. Pin both
  // notes to octave 4 so they're always in the visible range — we're showing
  // note identity (C, F#, etc.), not exact pitch.
  const correctKey = `${correctNote}4`;
  const wrongKey = wrongNote ? `${wrongNote}4` : undefined;

  return <PianoKeyboard readonly correctKey={correctKey} wrongKey={wrongKey} className="w-full" />;
}
