import { useMemo } from "react";
import { MUSIC_GLYPHS } from "~/components/display/music-glyph/MusicGlyph";
import type { Staff } from "~/core/practice-settings/PracticeSettings";

// SVG coordinate system — all values in SVG user units (viewBox space)
const STAFF_SPACE = 10; // 1 staff space = 10 SVG user units
const LINE_COUNT = 5;
const MARGIN_TOP = 20; // 2 staff spaces above top line
const MARGIN_BOTTOM = 20; // 2 staff spaces below bottom line
const VIEWBOX_WIDTH = 600;
const VIEWBOX_HEIGHT = MARGIN_TOP + (LINE_COUNT - 1) * STAFF_SPACE + MARGIN_BOTTOM; // 80
const CLEF_FONT_SIZE = 4 * STAFF_SPACE; // SMuFL standard: 1 em = 4 staff spaces
const CLEF_X = 4;
const LINE_THICKNESS = 0.6;

// SMuFL anchor line indices (line index from top, 0-based):
// - gClef (treble): anchor at G4 = 3rd line from top (index 3)
// - fClef (bass): anchor at F4 = 2nd line from top (index 1)
const CLEF_ANCHOR_LINE: Record<Staff, number> = {
  treble: 3,
  bass: 1,
};

const CLEF_GLYPH: Record<Staff, string> = {
  treble: MUSIC_GLYPHS.gClef,
  bass: MUSIC_GLYPHS.fClef,
};

// Stable reference — no closure over mutable values
function staffLineY(lineIndex: number): number {
  return MARGIN_TOP + lineIndex * STAFF_SPACE;
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
  // Extension points for future note rendering
  staffSpaceSize: number;
  marginTop: number;
  // Approximate x after the clef — replace with SVGTextElement.getBBox() when adding notes
  noteAreaStartX: number;
  // Maps any line index (including negative for above-staff / >4 for below) to a y-coordinate
  staffLineY: (lineIndex: number) => number;
}

export function useSheetMusicStaff(staff: Staff): StaffMetrics {
  return useMemo<StaffMetrics>(() => {
    const lineYPositions = Array.from({ length: LINE_COUNT }, (_, i) => staffLineY(i));
    const clefBaselineY = staffLineY(CLEF_ANCHOR_LINE[staff]);

    return {
      viewBoxWidth: VIEWBOX_WIDTH,
      viewBoxHeight: VIEWBOX_HEIGHT,
      viewBox: `0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`,
      lineCount: LINE_COUNT,
      lineThickness: LINE_THICKNESS,
      lineYPositions,
      clefGlyph: CLEF_GLYPH[staff],
      clefX: CLEF_X,
      clefBaselineY,
      clefFontSize: CLEF_FONT_SIZE,
      staffSpaceSize: STAFF_SPACE,
      marginTop: MARGIN_TOP,
      noteAreaStartX: CLEF_X + CLEF_FONT_SIZE * 1.2,
      staffLineY,
    };
  }, [staff]);
}
