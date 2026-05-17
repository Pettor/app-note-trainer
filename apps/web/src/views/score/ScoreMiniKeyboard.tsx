import type { ReactElement } from "react";
import { usePianoKeyboard } from "~/components/input/piano-keyboard/UsePianoKeyboard";
import type { PianoNote } from "~/components/input/piano-keyboard/UsePianoKeyboard";

export interface ScoreMiniKeyboardProps {
  correctNote: PianoNote;
  correctOctave: number;
  wrongNote: PianoNote | null;
  wrongOctave: number | null;
}

function noteKey(note: PianoNote, octave: number): string {
  return `${note}${octave}`;
}

export function ScoreMiniKeyboard({
  correctNote,
  correctOctave,
  wrongNote,
  wrongOctave,
}: ScoreMiniKeyboardProps): ReactElement {
  const startOctave = Math.min(correctOctave, wrongOctave ?? correctOctave);
  const endOctave = Math.max(correctOctave, wrongOctave ?? correctOctave);
  const octaveCount = Math.min(2, Math.max(1, endOctave - startOctave + 1));

  const { whiteKeys, blackKeys, blackKeyHeightPercent } = usePianoKeyboard(startOctave, octaveCount);

  const correctKey = noteKey(correctNote, correctOctave);
  const wrongKey = wrongNote && wrongOctave !== null ? noteKey(wrongNote, wrongOctave) : null;

  function keyColor(label: string): string | undefined {
    if (label === correctKey) return "oklch(0.72 0.16 160)";
    if (label === wrongKey) return "oklch(0.70 0.18 25)";
    return undefined;
  }

  const whiteKeyWidth = 100 / whiteKeys.length;

  return (
    <div className="w-full overflow-hidden rounded-lg" style={{ height: 64 }}>
      <div
        className="relative h-full w-full overflow-hidden rounded-lg"
        style={{
          background: "linear-gradient(180deg, #1a1726 0%, #0c0a14 100%)",
          padding: "4px 6px 6px",
        }}
      >
        {/* White keys */}
        <div className="relative flex h-full w-full gap-px">
          {whiteKeys.map((key) => {
            const color = keyColor(key.label);
            return (
              <div
                key={key.label}
                className="flex-1 rounded-b-md"
                style={{
                  background: color ?? "white",
                  border: "1px solid oklch(0.88 0.005 285)",
                  minWidth: 0,
                }}
              />
            );
          })}
        </div>

        {/* Black keys — absolutely positioned */}
        {blackKeys.map((key) => {
          const color = keyColor(key.label);
          return (
            <div
              key={key.label}
              className="absolute top-1 rounded-b-sm"
              style={{
                left: `calc(${key.leftPercent}% + 5px)`,
                width: `calc(${key.widthPercent}% - 2px)`,
                height: `${blackKeyHeightPercent}%`,
                background: color ?? "oklch(0.18 0.04 285)",
                border: "1px solid oklch(0.30 0.04 285)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
