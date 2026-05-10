import { useMemo } from "react";
import { useMediaQuery } from "@package/react";
import { MUSIC_GLYPHS } from "~/components/display/music-glyph/MusicGlyph";
import type { Staff } from "~/core/practice-settings/PracticeSettings";

// Desktop layout
const DESKTOP_STAFF_SPACE = 15;
const DESKTOP_LINE_THICKNESS = 0.9;
const DESKTOP_MARGIN_MULTIPLIER = 2.0;

// Phone layout — STAFF_SPACE=50 targets ~35% of iPhone X viewport height
// (375px × (2.5+4+2.5)×50 / 600 ≈ 281px ≈ 34.6% of 812px)
const PHONE_STAFF_SPACE = 50;
const PHONE_LINE_THICKNESS = 3.5;
const PHONE_MARGIN_MULTIPLIER = 2.5;

const VIEWBOX_WIDTH = 600;
const LINE_COUNT = 5;
const CLEF_X = 4;

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
  // Maps any line index (including negative / >4 for ledger lines) to a y-coordinate
  staffLineY: (lineIndex: number) => number;
}

export function useSheetMusicStaff(staff: Staff): StaffMetrics {
  const isPhone = useMediaQuery("(max-width: 639px)");

  return useMemo<StaffMetrics>(() => {
    const staffSpace = isPhone ? PHONE_STAFF_SPACE : DESKTOP_STAFF_SPACE;
    const lineThickness = isPhone ? PHONE_LINE_THICKNESS : DESKTOP_LINE_THICKNESS;
    const marginMultiplier = isPhone ? PHONE_MARGIN_MULTIPLIER : DESKTOP_MARGIN_MULTIPLIER;

    const marginTop = marginMultiplier * staffSpace;
    const marginBottom = marginMultiplier * staffSpace;
    const viewBoxHeight = marginTop + (LINE_COUNT - 1) * staffSpace + marginBottom;
    const clefFontSize = 4 * staffSpace; // SMuFL: 1 em = 4 staff spaces

    function getY(lineIndex: number): number {
      return marginTop + lineIndex * staffSpace;
    }
    const lineYPositions = Array.from({ length: LINE_COUNT }, (_, i) => getY(i));

    return {
      viewBoxWidth: VIEWBOX_WIDTH,
      viewBoxHeight,
      viewBox: `0 0 ${VIEWBOX_WIDTH} ${viewBoxHeight}`,
      lineCount: LINE_COUNT,
      lineThickness,
      lineYPositions,
      clefGlyph: CLEF_GLYPH[staff],
      clefX: CLEF_X,
      clefBaselineY: getY(CLEF_ANCHOR_LINE[staff]),
      clefFontSize,
      staffSpaceSize: staffSpace,
      marginTop,
      noteAreaStartX: CLEF_X + clefFontSize * 1.2,
      staffLineY: getY,
    };
  }, [staff, isPhone]);
}
