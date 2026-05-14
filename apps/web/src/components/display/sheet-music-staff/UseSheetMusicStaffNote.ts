import { useMemo } from "react";
import type { NoteType, StaffMetrics } from "./UseSheetMusicStaff";
import { MUSIC_GLYPHS } from "~/components/display/music-glyph/MusicGlyph";

// ─── Notehead (Leland font) ───────────────────────────────────────────────────
const NOTEHEAD_WIDTH_RATIO = 1.3; // staff spaces — Leland noteheadBlack advance width
const LEDGER_EXTEND_RATIO = 0.2; // staff spaces — how far ledger lines extend past the notehead

// ─── Stem ─────────────────────────────────────────────────────────────────────
const STEM_WIDTH_RATIO = 0.12; // staff spaces
const STEM_LENGTH_RATIO = 3.5; // staff spaces (standard notation)
// Derived from Leland noteheadBlack CFF path on-curve attachment points.
// Font y+ = up; SVG y+ = down — signs are opposite.
const STEM_DOWN_Y_OFFSET = 0.168; // staff spaces — leftmost pt  (0.00, -0.168) → stem goes down-left
const STEM_UP_Y_OFFSET = 0.16; // staff spaces — rightmost pt (1.30, +0.160) → stem goes up-right
// Notes below the middle line (slot 4) point stem up; at or above point stem down
const STEM_UP_THRESHOLD = 4;

// ─── Glow animation ──────────────────────────────────────────────────────────
// Dimensions matched to the claude design (headW = spacing*1.05, headH = spacing*0.78):
//   rx: headW*0.78 → headW*1.05  (spacing * 0.819 → spacing * 1.103)
//   ry: headH*0.70 → headH*0.95  (spacing * 0.546 → spacing * 0.741)
const GLOW_RX_START = 0.819; // staff spaces
const GLOW_RX_END = 1.103; // staff spaces
const GLOW_RY_START = 0.546; // staff spaces
const GLOW_RY_END = 0.741; // staff spaces
const GLOW_BLUR_RATIO = 0.02; // feGaussianBlur stdDeviation as a fraction of staffSpaceSize
const GLOW_OPACITY_START = 0.18;
const GLOW_OPACITY_END = 0.32;
const GLOW_DURATION = "1.8s";
// ease-in-out cubic-bezier(0.42, 0, 0.58, 1) — two segments for the 0→0.5→1 keyTimes
const GLOW_EASE_IN_OUT = "0.42 0 0.58 1;0.42 0 0.58 1";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SheetMusicStaffNoteLayout {
  // Notehead
  noteY: number;
  noteheadWidth: number;
  notehead: string;
  hasWholehead: boolean;
  // Ledger lines
  ledgerSlots: number[];
  ledgerExtend: number;
  // Stem
  stemUp: boolean;
  stemX: number;
  stemY1: number;
  stemY2: number;
  stemWidth: number;
  // Glow animation
  glowCx: number;
  glowCy: number;
  glowRxStart: number;
  glowRxEnd: number;
  glowRyStart: number;
  glowRyEnd: number;
  glowBlur: number;
  glowOpacityStart: number;
  glowOpacityEnd: number;
  glowDuration: string;
  glowEaseInOut: string;
}

function getLedgerLineSlots(slot: number): number[] {
  const lines: number[] = [];
  if (slot < 0) {
    const effectiveSlot = slot % 2 === 0 ? slot : slot + 1;
    for (let ls = -2; ls >= effectiveSlot; ls -= 2) lines.push(ls);
  } else if (slot > 8) {
    const effectiveSlot = slot % 2 === 0 ? slot : slot - 1;
    for (let ls = 10; ls <= effectiveSlot; ls += 2) lines.push(ls);
  }
  return lines;
}

export function useSheetMusicStaffNote(
  slot: number,
  type: NoteType,
  x: number,
  metrics: StaffMetrics
): SheetMusicStaffNoteLayout {
  const { staffSpaceSize, slotToY } = metrics;

  return useMemo<SheetMusicStaffNoteLayout>(() => {
    const noteY = slotToY(slot);
    const noteheadWidth = NOTEHEAD_WIDTH_RATIO * staffSpaceSize;
    const hasWholehead = type === "whole";

    const stemUp = slot < STEM_UP_THRESHOLD;
    const stemWidth = STEM_WIDTH_RATIO * staffSpaceSize;
    const stemLength = STEM_LENGTH_RATIO * staffSpaceSize;
    const stemX = stemUp ? x + noteheadWidth - stemWidth / 2 : x + stemWidth / 2;
    const stemY1 = stemUp ? noteY - STEM_UP_Y_OFFSET * staffSpaceSize : noteY + STEM_DOWN_Y_OFFSET * staffSpaceSize;
    const stemY2 = stemUp ? stemY1 - stemLength : stemY1 + stemLength;

    // Glow center: x is the left edge of the glyph, center is half the notehead width in
    const glowCx = x + (NOTEHEAD_WIDTH_RATIO / 2) * staffSpaceSize;
    const glowCy = noteY;

    return {
      noteY,
      noteheadWidth,
      notehead: hasWholehead ? MUSIC_GLYPHS.noteheadWhole : MUSIC_GLYPHS.noteheadBlack,
      hasWholehead,
      ledgerSlots: getLedgerLineSlots(slot),
      ledgerExtend: LEDGER_EXTEND_RATIO * staffSpaceSize,
      stemUp,
      stemX,
      stemY1,
      stemY2,
      stemWidth,
      glowCx,
      glowCy,
      glowRxStart: GLOW_RX_START * staffSpaceSize,
      glowRxEnd: GLOW_RX_END * staffSpaceSize,
      glowRyStart: GLOW_RY_START * staffSpaceSize,
      glowRyEnd: GLOW_RY_END * staffSpaceSize,
      glowBlur: GLOW_BLUR_RATIO * staffSpaceSize,
      glowOpacityStart: GLOW_OPACITY_START,
      glowOpacityEnd: GLOW_OPACITY_END,
      glowDuration: GLOW_DURATION,
      glowEaseInOut: GLOW_EASE_IN_OUT,
    };
  }, [slot, type, x, staffSpaceSize, slotToY]);
}
