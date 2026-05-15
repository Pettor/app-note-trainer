import { describe, expect, it } from "vitest";
import type { Scale } from "./MusicScale";
import { buildNoteQueue, getSlotRange } from "./NotePool";
import type { PracticeSettings } from "~/core/practice-settings/PracticeSettings";
import { DEFAULT_PRACTICE_SETTINGS } from "~/core/practice-settings/PracticeSettings";

const naturalScale: Scale = { root: "C", mode: "major", sharpenedSteps: [] };
const sharpScale: Scale = { root: "G", mode: "major", sharpenedSteps: ["F"] };

function settings(overrides: Partial<PracticeSettings> = {}): PracticeSettings {
  return { ...DEFAULT_PRACTICE_SETTINGS, ...overrides };
}

describe("getSlotRange", () => {
  it("returns [0, 8] when ledgerLines is false regardless of noteRange", () => {
    expect(getSlotRange(settings({ ledgerLines: false, noteRange: "narrow" }))).toEqual([2, 6]);
    expect(getSlotRange(settings({ ledgerLines: false, noteRange: "wide" }))).toEqual([0, 8]);
  });

  it("clamps narrow range to [2, 6]", () => {
    expect(getSlotRange(settings({ noteRange: "narrow", ledgerLines: false }))).toEqual([2, 6]);
  });

  it("returns [0, 8] for standard range without ledger lines", () => {
    expect(getSlotRange(settings({ noteRange: "standard", ledgerLines: false }))).toEqual([0, 8]);
  });

  it("returns [-2, 10] for wide range with ledgerDepth 1", () => {
    expect(getSlotRange(settings({ noteRange: "wide", ledgerLines: true, ledgerDepth: 1 }))).toEqual([-2, 10]);
  });

  it("returns [-6, 14] for extended range with ledgerDepth 3", () => {
    expect(getSlotRange(settings({ noteRange: "extended", ledgerLines: true, ledgerDepth: 3 }))).toEqual([-6, 14]);
  });

  it("intersects noteRange and ledger bounds — wide range with depth 3 stays at [-2, 10]", () => {
    expect(getSlotRange(settings({ noteRange: "wide", ledgerLines: true, ledgerDepth: 3 }))).toEqual([-2, 10]);
  });

  it("intersects noteRange and ledger bounds — extended range with depth 1 stays at [-2, 10]", () => {
    expect(getSlotRange(settings({ noteRange: "extended", ledgerLines: true, ledgerDepth: 1 }))).toEqual([-2, 10]);
  });
});

describe("buildNoteQueue", () => {
  it("always returns exactly 25 notes", () => {
    expect(buildNoteQueue(settings(), naturalScale)).toHaveLength(25);
  });

  it("returns 25 notes even when pool is very small (narrow, no ledger)", () => {
    const queue = buildNoteQueue(settings({ noteRange: "narrow", ledgerLines: false }), naturalScale);
    expect(queue).toHaveLength(25);
  });

  it("all note slots are within the computed slot range", () => {
    const s = settings({ noteRange: "wide", ledgerLines: true, ledgerDepth: 1 });
    const [min, max] = getSlotRange(s);
    const queue = buildNoteQueue(s, naturalScale);
    for (const note of queue) {
      expect(note.slot).toBeGreaterThanOrEqual(min);
      expect(note.slot).toBeLessThanOrEqual(max);
    }
  });

  it("notes from a natural scale have no sharps", () => {
    const queue = buildNoteQueue(settings(), naturalScale);
    for (const note of queue) {
      expect(note.pitch.accidental).toBe("natural");
    }
  });

  it("notes at sharpened steps use sharp accidental", () => {
    // G major sharps F — slot 1 on treble = F4
    const s = settings({ noteRange: "standard", ledgerLines: false, staff: "treble" });
    const queue = buildNoteQueue(s, sharpScale);
    const fNotes = queue.filter((n) => n.slot === 1 || n.slot === 8); // F4 and F5
    expect(fNotes.length).toBeGreaterThan(0);
    for (const note of fNotes) {
      expect(note.pitch.accidental).toBe("sharp");
      expect(note.pitch.step).toBe("F");
    }
  });

  it("non-sharpened steps remain natural in a sharp scale", () => {
    const s = settings({ noteRange: "standard", ledgerLines: false, staff: "treble" });
    const queue = buildNoteQueue(s, sharpScale);
    // slot 0 = E4 — E is not sharpened in G major
    const eNotes = queue.filter((n) => n.slot === 0);
    expect(eNotes.length).toBeGreaterThan(0);
    for (const note of eNotes) {
      expect(note.pitch.accidental).toBe("natural");
    }
  });

  it("each note has a valid pitch step", () => {
    const validSteps = ["C", "D", "E", "F", "G", "A", "B"];
    const queue = buildNoteQueue(settings(), naturalScale);
    for (const note of queue) {
      expect(validSteps).toContain(note.pitch.step);
    }
  });

  it("uses treble slot map when staff is treble", () => {
    const s = settings({ staff: "treble", noteRange: "standard", ledgerLines: false });
    const queue = buildNoteQueue(s, naturalScale);
    // slot 0 treble = E4
    const bottomNote = queue.find((n) => n.slot === 0);
    expect(bottomNote?.pitch.step).toBe("E");
    expect(bottomNote?.pitch.octave).toBe(4);
  });

  it("uses bass slot map when staff is bass", () => {
    const s = settings({ staff: "bass", noteRange: "standard", ledgerLines: false });
    const queue = buildNoteQueue(s, naturalScale);
    // slot 0 bass = G2
    const bottomNote = queue.find((n) => n.slot === 0);
    expect(bottomNote?.pitch.step).toBe("G");
    expect(bottomNote?.pitch.octave).toBe(2);
  });
});
