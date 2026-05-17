import type { Accidental, GameNotePitch, NoteStep } from "./MusicNote";
import type { Scale } from "./MusicScale";
import type { PracticeSettings } from "~/core/practice-settings/PracticeSettings";

export interface GameNote {
  pitch: GameNotePitch;
  slot: number;
}

interface SlotNote {
  step: NoteStep;
  octave: number;
}

const TREBLE_SLOT_NOTES: Record<number, SlotNote> = {
  [-6]: { step: "F", octave: 3 },
  [-5]: { step: "G", octave: 3 },
  [-4]: { step: "A", octave: 3 },
  [-3]: { step: "B", octave: 3 },
  [-2]: { step: "C", octave: 4 },
  [-1]: { step: "D", octave: 4 },
  [0]: { step: "E", octave: 4 },
  [1]: { step: "F", octave: 4 },
  [2]: { step: "G", octave: 4 },
  [3]: { step: "A", octave: 4 },
  [4]: { step: "B", octave: 4 },
  [5]: { step: "C", octave: 5 },
  [6]: { step: "D", octave: 5 },
  [7]: { step: "E", octave: 5 },
  [8]: { step: "F", octave: 5 },
  [9]: { step: "G", octave: 5 },
  [10]: { step: "A", octave: 5 },
  [11]: { step: "B", octave: 5 },
  [12]: { step: "C", octave: 6 },
  [13]: { step: "D", octave: 6 },
  [14]: { step: "E", octave: 6 },
};

const BASS_SLOT_NOTES: Record<number, SlotNote> = {
  [-6]: { step: "A", octave: 1 },
  [-5]: { step: "B", octave: 1 },
  [-4]: { step: "C", octave: 2 },
  [-3]: { step: "D", octave: 2 },
  [-2]: { step: "E", octave: 2 },
  [-1]: { step: "F", octave: 2 },
  [0]: { step: "G", octave: 2 },
  [1]: { step: "A", octave: 2 },
  [2]: { step: "B", octave: 2 },
  [3]: { step: "C", octave: 3 },
  [4]: { step: "D", octave: 3 },
  [5]: { step: "E", octave: 3 },
  [6]: { step: "F", octave: 3 },
  [7]: { step: "G", octave: 3 },
  [8]: { step: "A", octave: 3 },
  [9]: { step: "B", octave: 3 },
  [10]: { step: "C", octave: 4 },
  [11]: { step: "D", octave: 4 },
  [12]: { step: "E", octave: 4 },
  [13]: { step: "F", octave: 4 },
  [14]: { step: "G", octave: 4 },
};

const NOTE_RANGE_BOUNDS: Record<string, [number, number]> = {
  narrow: [2, 6],
  standard: [0, 8],
  wide: [-2, 10],
  extended: [-6, 14],
};

const LEDGER_BOUNDS: Record<string, [number, number]> = {
  none: [0, 8],
  depth1: [-2, 10],
  depth3: [-6, 14],
};

export function getSlotRange(settings: PracticeSettings): [number, number] {
  const [rangeMin, rangeMax] = NOTE_RANGE_BOUNDS[settings.noteRange] ?? [0, 8];

  let ledgerKey: string;
  if (!settings.ledgerLines) {
    ledgerKey = "none";
  } else if (settings.ledgerDepth === 3) {
    ledgerKey = "depth3";
  } else {
    ledgerKey = "depth1";
  }

  const [ledgerMin, ledgerMax] = LEDGER_BOUNDS[ledgerKey]!;
  return [Math.max(rangeMin, ledgerMin), Math.min(rangeMax, ledgerMax)];
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

// Deterministic 3-note queue used only when VITE_E2E_MODE=true so E2E tests can
// press a known correct key, a known wrong key, and let the timer expire.
const E2E_NOTE_QUEUE: GameNote[] = [
  { pitch: { step: "C", accidental: "natural", octave: 4 }, slot: -2 },
  { pitch: { step: "E", accidental: "natural", octave: 4 }, slot: 0 },
  { pitch: { step: "G", accidental: "natural", octave: 4 }, slot: 2 },
];

export function buildNoteQueue(settings: PracticeSettings, scale: Scale): GameNote[] {
  if (import.meta.env.VITE_E2E_MODE === "true") {
    return E2E_NOTE_QUEUE;
  }

  const [minSlot, maxSlot] = getSlotRange(settings);
  const slotMap = settings.staff === "treble" ? TREBLE_SLOT_NOTES : BASS_SLOT_NOTES;
  const sharpenedSet = new Set<NoteStep>(scale.sharpenedSteps);

  const pool: GameNote[] = [];
  for (let slot = minSlot; slot <= maxSlot; slot++) {
    const slotNote = slotMap[slot];
    if (!slotNote) continue;
    const accidental: Accidental = sharpenedSet.has(slotNote.step) ? "sharp" : "natural";
    pool.push({ pitch: { step: slotNote.step, accidental, octave: slotNote.octave }, slot });
  }

  if (pool.length === 0) return [];

  const shuffled = shuffle(pool);
  if (shuffled.length >= 25) return shuffled.slice(0, 25);

  // Fill to 25 with repeated shuffled rounds
  const result: GameNote[] = [...shuffled];
  while (result.length < 25) {
    result.push(...shuffle(pool));
  }
  return result.slice(0, 25);
}
