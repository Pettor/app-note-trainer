import { useMemo } from "react";

export type PianoNote = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";

export interface PianoKeyData {
  note: PianoNote;
  octave: number;
  /** Full label like "C4" or "C#4" */
  label: string;
  isBlack: boolean;
}

export interface WhiteKeyData extends PianoKeyData {
  isBlack: false;
}

export interface BlackKeyData extends PianoKeyData {
  isBlack: true;
  /** Left edge as a percentage of total keyboard width */
  leftPercent: number;
  /** Width as a percentage of total keyboard width */
  widthPercent: number;
}

export interface PianoKeyboardMetrics {
  whiteKeys: WhiteKeyData[];
  blackKeys: BlackKeyData[];
  /** Black key height as a percentage of the container height */
  blackKeyHeightPercent: number;
}

const WHITE_NOTES: PianoNote[] = ["C", "D", "E", "F", "G", "A", "B"];

// seamAfterWhiteIndex: the seam (right edge of that white key) where the black key is centred
const BLACK_POSITIONS_PER_OCTAVE: Array<{ note: PianoNote; seamAfterWhiteIndex: number }> = [
  { note: "C#", seamAfterWhiteIndex: 0 },
  { note: "D#", seamAfterWhiteIndex: 1 },
  { note: "F#", seamAfterWhiteIndex: 3 },
  { note: "G#", seamAfterWhiteIndex: 4 },
  { note: "A#", seamAfterWhiteIndex: 5 },
];

export function usePianoKeyboard(startOctave = 4, octaveCount = 2, endNote?: string): PianoKeyboardMetrics {
  return useMemo(() => {
    const allWhiteKeys: WhiteKeyData[] = [];
    for (let o = 0; o < octaveCount; o++) {
      const octave = startOctave + o;
      for (const note of WHITE_NOTES) {
        allWhiteKeys.push({ note, octave, label: `${note}${octave}`, isBlack: false });
      }
    }

    let whiteKeys = allWhiteKeys;
    if (endNote) {
      const match = /^([A-G])(\d+)$/.exec(endNote);
      if (match) {
        const endNoteStr = match[1] as PianoNote;
        const endOctave = parseInt(match[2]);
        const endIdx = allWhiteKeys.findIndex((k) => k.octave === endOctave && k.note === endNoteStr);
        if (endIdx >= 0) whiteKeys = allWhiteKeys.slice(0, endIdx + 1);
      }
    }

    const totalWhiteKeys = whiteKeys.length;
    const blackWidthPercent = (1 / totalWhiteKeys) * 100 * 0.63;
    const blackKeyHeightPercent = 62;

    const blackKeys: BlackKeyData[] = [];
    for (let o = 0; o < octaveCount; o++) {
      const octave = startOctave + o;
      const octaveOffset = o * WHITE_NOTES.length;
      for (const { note, seamAfterWhiteIndex } of BLACK_POSITIONS_PER_OCTAVE) {
        const seamIndex = octaveOffset + seamAfterWhiteIndex + 1;
        if (seamIndex >= totalWhiteKeys) continue;
        const centerPercent = (seamIndex / totalWhiteKeys) * 100;
        blackKeys.push({
          note,
          octave,
          label: `${note}${octave}`,
          isBlack: true,
          leftPercent: centerPercent - blackWidthPercent / 2,
          widthPercent: blackWidthPercent,
        });
      }
    }

    return { whiteKeys, blackKeys, blackKeyHeightPercent };
  }, [startOctave, octaveCount, endNote]);
}
