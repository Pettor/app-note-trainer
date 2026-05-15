import { describe, expect, it } from "vitest";
import { pickRandomScale, scaleDisplayName } from "./MusicScale";

describe("pickRandomScale", () => {
  it("returns a scale with root, mode, and sharpenedSteps", () => {
    const scale = pickRandomScale(false);
    expect(scale).toHaveProperty("root");
    expect(scale).toHaveProperty("mode");
    expect(Array.isArray(scale.sharpenedSteps)).toBe(true);
  });

  it("returns only natural (no-sharp) scales when sharpsEnabled is false", () => {
    for (let i = 0; i < 20; i++) {
      const scale = pickRandomScale(false);
      expect(scale.sharpenedSteps).toHaveLength(0);
    }
  });

  it("can return sharp scales when sharpsEnabled is true", () => {
    const scales = Array.from({ length: 50 }, () => pickRandomScale(true));
    const hasSharpScale = scales.some((s) => s.sharpenedSteps.length > 0);
    expect(hasSharpScale).toBe(true);
  });

  it("can also return natural scales when sharpsEnabled is true", () => {
    const scales = Array.from({ length: 50 }, () => pickRandomScale(true));
    const hasNaturalScale = scales.some((s) => s.sharpenedSteps.length === 0);
    expect(hasNaturalScale).toBe(true);
  });
});

describe("scaleDisplayName", () => {
  it("returns the root as keyName for a natural scale", () => {
    const { keyName } = scaleDisplayName({ root: "C", mode: "major", sharpenedSteps: [] });
    expect(keyName).toBe("C");
  });

  it("appends # to keyName when the scale has sharpened steps", () => {
    const { keyName } = scaleDisplayName({ root: "G", mode: "major", sharpenedSteps: ["F"] });
    expect(keyName).toBe("G#");
  });

  it("returns the mode as scaleType", () => {
    const { scaleType } = scaleDisplayName({ root: "A", mode: "minor", sharpenedSteps: [] });
    expect(scaleType).toBe("minor");
  });

  it("returns major as scaleType for major scales", () => {
    const { scaleType } = scaleDisplayName({ root: "C", mode: "major", sharpenedSteps: [] });
    expect(scaleType).toBe("major");
  });
});
