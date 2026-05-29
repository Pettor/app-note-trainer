import { describe, expect, it } from "vitest";
import { getKeySignature, pickRandomScale, scaleDisplayName } from "./MusicScale";

describe("pickRandomScale", () => {
  it("returns a scale with root, mode, sharpenedSteps, and flattenedSteps", () => {
    const scale = pickRandomScale(false);
    expect(scale).toHaveProperty("root");
    expect(scale).toHaveProperty("mode");
    expect(Array.isArray(scale.sharpenedSteps)).toBe(true);
    expect(Array.isArray(scale.flattenedSteps)).toBe(true);
  });

  it("returns only natural (no-accidental) scales when sharpsEnabled is false", () => {
    for (let i = 0; i < 20; i++) {
      const scale = pickRandomScale(false);
      expect(scale.sharpenedSteps).toHaveLength(0);
      expect(scale.flattenedSteps).toHaveLength(0);
    }
  });

  it("can return sharp scales when sharpsEnabled is true", () => {
    const scales = Array.from({ length: 100 }, () => pickRandomScale(true));
    const hasSharpScale = scales.some((s) => s.sharpenedSteps.length > 0);
    expect(hasSharpScale).toBe(true);
  });

  it("can return flat scales when sharpsEnabled is true", () => {
    const scales = Array.from({ length: 100 }, () => pickRandomScale(true));
    const hasFlatScale = scales.some((s) => s.flattenedSteps.length > 0);
    expect(hasFlatScale).toBe(true);
  });

  it("can also return natural scales when sharpsEnabled is true", () => {
    const scales = Array.from({ length: 100 }, () => pickRandomScale(true));
    const hasNaturalScale = scales.some((s) => s.sharpenedSteps.length === 0 && s.flattenedSteps.length === 0);
    expect(hasNaturalScale).toBe(true);
  });
});

describe("scaleDisplayName", () => {
  it("returns the root as keyName for a natural scale", () => {
    const { keyName } = scaleDisplayName({ root: "C", mode: "major", sharpenedSteps: [], flattenedSteps: [] });
    expect(keyName).toBe("C");
  });

  it("appends # to keyName only when the root itself is sharpened", () => {
    // G major has F sharpened, but G is not — key name stays 'G'
    const { keyName } = scaleDisplayName({ root: "G", mode: "major", sharpenedSteps: ["F"], flattenedSteps: [] });
    expect(keyName).toBe("G");
  });

  it("appends # when the root is in sharpenedSteps (e.g. F# major)", () => {
    const { keyName } = scaleDisplayName({
      root: "F",
      mode: "major",
      sharpenedSteps: ["F", "C", "G", "D", "A", "E"],
      flattenedSteps: [],
    });
    expect(keyName).toBe("F#");
  });

  it("appends b when the root is in flattenedSteps (e.g. Bb major)", () => {
    const { keyName } = scaleDisplayName({
      root: "B",
      mode: "major",
      sharpenedSteps: [],
      flattenedSteps: ["B", "E"],
    });
    expect(keyName).toBe("Bb");
  });

  it("does not append b when root is not in flattenedSteps (e.g. F major)", () => {
    const { keyName } = scaleDisplayName({ root: "F", mode: "major", sharpenedSteps: [], flattenedSteps: ["B"] });
    expect(keyName).toBe("F");
  });

  it("returns the mode as scaleType", () => {
    const { scaleType } = scaleDisplayName({ root: "A", mode: "minor", sharpenedSteps: [], flattenedSteps: [] });
    expect(scaleType).toBe("minor");
  });

  it("returns major as scaleType for major scales", () => {
    const { scaleType } = scaleDisplayName({ root: "C", mode: "major", sharpenedSteps: [], flattenedSteps: [] });
    expect(scaleType).toBe("major");
  });
});

describe("getKeySignature", () => {
  it("returns count 0 for a natural scale", () => {
    const ks = getKeySignature({ root: "C", mode: "major", sharpenedSteps: [], flattenedSteps: [] });
    expect(ks.count).toBe(0);
  });

  it("returns sharp type and correct count for a sharp scale", () => {
    const ks = getKeySignature({ root: "D", mode: "major", sharpenedSteps: ["F", "C"], flattenedSteps: [] });
    expect(ks.type).toBe("sharp");
    expect(ks.count).toBe(2);
  });

  it("returns flat type and correct count for a flat scale", () => {
    const ks = getKeySignature({ root: "B", mode: "major", sharpenedSteps: [], flattenedSteps: ["B", "E"] });
    expect(ks.type).toBe("flat");
    expect(ks.count).toBe(2);
  });
});
