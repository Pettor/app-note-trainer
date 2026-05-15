import { useMemo } from "react";
import { MUSIC_GLYPHS } from "~/components/display/music-glyph/MusicGlyph";
import type { Staff } from "~/core/practice-settings/PracticeSettings";
import { useViewport } from "~/core/UseViewport";

// Desktop layout
const DESKTOP_STAFF_SPACE = 30;
const DESKTOP_LINE_THICKNESS = 2.0;
const DESKTOP_MARGIN_MULTIPLIER = 2.0;

// Phone layout — STAFF_SPACE=50 targets ~35% of iPhone X viewport height
// (375px × (2.5+4+2.5)×50 / 600 ≈ 281px ≈ 34.6% of 812px)
const PHONE_STAFF_SPACE = 50;
const PHONE_LINE_THICKNESS = 3.5;
const PHONE_MARGIN_MULTIPLIER = 2.5;

const VIEWBOX_WIDTH = 600;
const LINE_COUNT = 5;
const CLEF_LEFT_PADDING = 0.4; // staff-space multiplier — gap between bar line and clef

// SMuFL anchor line indices (from top, 0-based):
// - gClef: anchor at G4 = 3rd line from top = index 3
// - fClef: anchor at F4 = 2nd line from top = index 1
const CLEF_ANCHOR_LINE: Record<Staff, number> = {
  treble: 3,
  bass: 1,
};

const CLEF_GLYPH: Record<Staff, string> = {
  treble: MUSIC_GLYPHS.gClef,
  bass: MUSIC_GLYPHS.fClef,
};

export type NoteType = "whole" | "quarter";

// Staff position slot — visual position on the staff:
//   0 = bottom line (E4 treble / G2 bass)
//   Each step up = one diatonic position (line or space)
//   8 = top line (F5 treble / A3 bass)
//   Negative = below staff (-2 = first ledger line below, i.e. middle C for treble)
//   >8 = above staff (10 = first ledger line above)
export interface StaffNoteData {
  slot: number;
  type?: NoteType; // defaults to "quarter"
  x?: number; // SVG user-unit x; auto-placed at first beat position if omitted
  active?: boolean; // marks this as the current note to guess — shows pulsating animation
  accidental?: "sharp"; // renders a ♯ glyph to the left of the notehead
}

export interface StaffMetrics {
  viewBoxWidth: number;
  viewBoxHeight: number;
  viewBox: string;
  lineCount: number;
  lineThickness: number;
  lineYPositions: number[];
  clefGlyph: string;
  clefX: number;
  clefBaselineY: number;
  clefFontSize: number;
  staffSpaceSize: number;
  marginTop: number;
  // Approximate x after the clef — replace with SVGTextElement.getBBox() when adding note layout
  noteAreaStartX: number;
  // Maps any slot (including negative / >8 for ledger lines) to a y-coordinate
  staffLineY: (lineIndex: number) => number;
  // Maps a slot position to a y-coordinate (0=bottom line, 8=top line)
  slotToY: (slot: number) => number;
}

// Extra viewBox space needed for notes that overflow the base margin.
// The base margin already covers some ledger territory — only add what's missing,
// plus a 0.75-staff-space notehead/glow buffer.
// Must exceed GLOW_RY_END (0.841) from UseSheetMusicStaffNote so the pulse animation
// never clips the viewBox edge. 1.2 gives ~10px headroom on desktop.
const LEDGER_BUFFER = 1.2;

function extraMargin(slotsOutside: number, marginMultiplier: number, staffSpace: number): number {
  if (slotsOutside <= 0) return 0;
  // note extends slotsOutside/2 staff-spaces past the staff edge; base margin covers marginMultiplier
  return Math.max(0, (slotsOutside / 2 + LEDGER_BUFFER - marginMultiplier) * staffSpace);
}

export function useSheetMusicStaff(staff: Staff, minSlot = 0, maxSlot = 8): StaffMetrics {
  const { isPhone } = useViewport();

  return useMemo<StaffMetrics>(() => {
    const staffSpace = isPhone ? PHONE_STAFF_SPACE : DESKTOP_STAFF_SPACE;
    const lineThickness = isPhone ? PHONE_LINE_THICKNESS : DESKTOP_LINE_THICKNESS;
    const marginMultiplier = isPhone ? PHONE_MARGIN_MULTIPLIER : DESKTOP_MARGIN_MULTIPLIER;

    const baseMargin = marginMultiplier * staffSpace;
    const marginTop = baseMargin + extraMargin(maxSlot - 8, marginMultiplier, staffSpace);
    const marginBottom = baseMargin + extraMargin(-minSlot, marginMultiplier, staffSpace);
    const viewBoxHeight = marginTop + (LINE_COUNT - 1) * staffSpace + marginBottom;
    const clefFontSize = 4 * staffSpace; // SMuFL: 1 em = 4 staff spaces
    const clefX = lineThickness + staffSpace * CLEF_LEFT_PADDING;

    function getLineY(lineIndex: number): number {
      return marginTop + lineIndex * staffSpace;
    }

    // slot 0 = bottom line, slot 8 = top line; each step = half a staff space
    function getSlotY(slot: number): number {
      const bottomLineY = marginTop + (LINE_COUNT - 1) * staffSpace;
      return bottomLineY - (slot * staffSpace) / 2;
    }

    const lineYPositions = Array.from({ length: LINE_COUNT }, (_, i) => getLineY(i));

    return {
      viewBoxWidth: VIEWBOX_WIDTH,
      viewBoxHeight,
      viewBox: `0 0 ${VIEWBOX_WIDTH} ${viewBoxHeight}`,
      lineCount: LINE_COUNT,
      lineThickness,
      lineYPositions,
      clefGlyph: CLEF_GLYPH[staff],
      clefX,
      clefBaselineY: getLineY(CLEF_ANCHOR_LINE[staff]),
      clefFontSize,
      staffSpaceSize: staffSpace,
      marginTop,
      // gClef/fClef advance width ≈ 2.4 staff spaces (0.6 × fontSize in SMuFL/Leland)
      noteAreaStartX: clefX + clefFontSize * 0.6,
      staffLineY: getLineY,
      slotToY: getSlotY,
    };
  }, [staff, isPhone, minSlot, maxSlot]);
}
