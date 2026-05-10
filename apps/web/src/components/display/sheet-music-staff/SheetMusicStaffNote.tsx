import type { ReactElement } from "react";
import type { NoteType, StaffMetrics } from "./UseSheetMusicStaff";
import { MUSIC_GLYPHS } from "~/components/display/music-glyph/MusicGlyph";

// Leland noteheadBlack: advance width 1.30 sp, LSB=0 (measured from font)
const NOTEHEAD_WIDTH_RATIO = 1.3;
const LEDGER_EXTEND_RATIO = 0.2;
const STEM_WIDTH_RATIO = 0.12; // staff spaces
const STEM_LENGTH_RATIO = 3.5; // staff spaces (standard notation)
// Derived from Leland noteheadBlack CFF path:
//   leftmost on-curve pt  = (0.00,  -0.168) font-y  →  stem-down connects BELOW center
//   rightmost on-curve pt = (1.30,  +0.160) font-y  →  stem-up  connects ABOVE center
// Font y positive = up; SVG y positive = down — signs are opposite.
const STEM_DOWN_Y_OFFSET = 0.168; // add to noteY (moves down in SVG = correct lower-left)
const STEM_UP_Y_OFFSET = 0.16; // subtract from noteY (moves up in SVG = correct upper-right)

// Middle line of a 5-line staff = slot 4; notes below it point stem up, at or above point stem down
const STEM_UP_THRESHOLD = 4;

interface SheetMusicStaffNoteProps {
  slot: number;
  type: NoteType;
  x: number;
  metrics: StaffMetrics;
}

// Returns the even-numbered slots where ledger lines must be drawn for a given note slot.
// Below staff: even slots -2, -4, … down to the note's nearest even slot.
// Above staff: even slots 10, 12, … up to the note's nearest even slot.
function getLedgerLineSlots(slot: number): number[] {
  const lines: number[] = [];
  if (slot < 0) {
    const effectiveSlot = slot % 2 === 0 ? slot : slot + 1;
    for (let ls = -2; ls >= effectiveSlot; ls -= 2) {
      lines.push(ls);
    }
  } else if (slot > 8) {
    const effectiveSlot = slot % 2 === 0 ? slot : slot - 1;
    for (let ls = 10; ls <= effectiveSlot; ls += 2) {
      lines.push(ls);
    }
  }
  return lines;
}

export function SheetMusicStaffNote({ slot, type, x, metrics }: SheetMusicStaffNoteProps): ReactElement {
  const { staffSpaceSize, lineThickness, clefFontSize, slotToY } = metrics;
  const noteY = slotToY(slot);
  const noteheadWidth = NOTEHEAD_WIDTH_RATIO * staffSpaceSize;
  const ledgerExtend = LEDGER_EXTEND_RATIO * staffSpaceSize;
  const ledgerSlots = getLedgerLineSlots(slot);

  const hasWholehead = type === "whole";
  const notehead = hasWholehead ? MUSIC_GLYPHS.noteheadWhole : MUSIC_GLYPHS.noteheadBlack;

  const stemUp = slot < STEM_UP_THRESHOLD;
  const stemLength = STEM_LENGTH_RATIO * staffSpaceSize;
  const stemWidth = STEM_WIDTH_RATIO * staffSpaceSize;
  // Stem x: outer edge flush with oval edge (center shifted inward by stemWidth/2)
  // Stem y: derived from the actual on-curve attachment points of the Leland glyph path
  const stemX = stemUp ? x + noteheadWidth - stemWidth / 2 : x + stemWidth / 2;
  const stemY1 = stemUp ? noteY - STEM_UP_Y_OFFSET * staffSpaceSize : noteY + STEM_DOWN_Y_OFFSET * staffSpaceSize;
  const stemY2 = stemUp ? stemY1 - stemLength : stemY1 + stemLength;

  return (
    <g aria-hidden="true">
      {ledgerSlots.map((ls) => (
        <line
          key={ls}
          x1={x - ledgerExtend}
          x2={x + noteheadWidth + ledgerExtend}
          y1={slotToY(ls)}
          y2={slotToY(ls)}
          stroke="currentColor"
          strokeWidth={lineThickness}
        />
      ))}
      <text
        x={x}
        y={noteY}
        fontFamily="Leland"
        fontSize={clefFontSize}
        fill="currentColor"
        style={{ userSelect: "none" }}
      >
        {notehead}
      </text>
      {!hasWholehead && (
        <line x1={stemX} x2={stemX} y1={stemY1} y2={stemY2} stroke="currentColor" strokeWidth={stemWidth} />
      )}
    </g>
  );
}
