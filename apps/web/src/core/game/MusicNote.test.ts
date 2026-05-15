import { describe, expect, it } from "vitest";
import { matchesPianoKey, pitchToLabel } from "./MusicNote";
import type { GameNotePitch } from "./MusicNote";
import type { PianoKeyData } from "~/components/input/piano-keyboard/UsePianoKeyboard";

function key(label: string): PianoKeyData {
  const isBlack = label.includes("#");
  const note = label.replace(/\d/, "") as PianoKeyData["note"];
  const octave = parseInt(label.slice(-1));
  return { note, octave, label, isBlack };
}

describe("pitchToLabel", () => {
  it("formats a natural note", () => {
    const pitch: GameNotePitch = { step: "C", accidental: "natural", octave: 4 };
    expect(pitchToLabel(pitch)).toBe("C4");
  });

  it("formats a sharp note", () => {
    const pitch: GameNotePitch = { step: "F", accidental: "sharp", octave: 4 };
    expect(pitchToLabel(pitch)).toBe("F#4");
  });

  it("includes the octave number", () => {
    const pitch: GameNotePitch = { step: "A", accidental: "natural", octave: 5 };
    expect(pitchToLabel(pitch)).toBe("A5");
  });
});

describe("matchesPianoKey", () => {
  it("returns true when the key label matches the natural pitch", () => {
    const pitch: GameNotePitch = { step: "G", accidental: "natural", octave: 4 };
    expect(matchesPianoKey(pitch, key("G4"))).toBe(true);
  });

  it("returns true when the key label matches the sharp pitch", () => {
    const pitch: GameNotePitch = { step: "F", accidental: "sharp", octave: 4 };
    expect(matchesPianoKey(pitch, key("F#4"))).toBe(true);
  });

  it("returns false when the note name differs", () => {
    const pitch: GameNotePitch = { step: "G", accidental: "natural", octave: 4 };
    expect(matchesPianoKey(pitch, key("A4"))).toBe(false);
  });

  it("returns true when the octave differs", () => {
    const pitch: GameNotePitch = { step: "C", accidental: "natural", octave: 4 };
    expect(matchesPianoKey(pitch, key("C5"))).toBe(true);
  });

  it("returns false when a natural pitch is matched against its sharp", () => {
    const pitch: GameNotePitch = { step: "F", accidental: "natural", octave: 4 };
    expect(matchesPianoKey(pitch, key("F#4"))).toBe(false);
  });

  it("returns false when a sharp pitch is matched against the natural", () => {
    const pitch: GameNotePitch = { step: "F", accidental: "sharp", octave: 4 };
    expect(matchesPianoKey(pitch, key("F4"))).toBe(false);
  });

  it("returns true for a matching sharp note in a different octave", () => {
    const pitch: GameNotePitch = { step: "F", accidental: "sharp", octave: 4 };
    expect(matchesPianoKey(pitch, key("F#5"))).toBe(true);
  });
});
