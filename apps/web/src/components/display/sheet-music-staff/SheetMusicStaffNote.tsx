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
  active?: boolean;
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

// Horizontal center of the notehead: x is the glyph left edge, spans NOTEHEAD_WIDTH_RATIO staff spaces.
const NOTEHEAD_CX_OFFSET = NOTEHEAD_WIDTH_RATIO / 2; // staff-space units from x
// Glow ellipse dimensions — matched to the design (headW=spacing*1.05, headH=spacing*0.78):
//   rx: headW*0.78 → headW*1.05  (= spacing*0.819 → spacing*1.103)
//   ry: headH*0.70 → headH*0.95  (= spacing*0.546 → spacing*0.741)
const GLOW_RX_START = 0.819;
const GLOW_RX_END = 1.103;
const GLOW_RY_START = 0.546;
const GLOW_RY_END = 0.741;

export function SheetMusicStaffNote({ slot, type, x, active, metrics }: SheetMusicStaffNoteProps): ReactElement {
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

  const glowCx = x + NOTEHEAD_CX_OFFSET * staffSpaceSize;
  const glowCy = noteY;
  const glowRxStart = GLOW_RX_START * staffSpaceSize;
  const glowRxEnd = GLOW_RX_END * staffSpaceSize;
  const glowRyStart = GLOW_RY_START * staffSpaceSize;
  const glowRyEnd = GLOW_RY_END * staffSpaceSize;

  // Blur radius scales with staff size so it looks consistent on desktop and phone
  const glowBlur = staffSpaceSize * 0.02;
  // ease-in-out cubic-bezier(0.42, 0, 0.58, 1) expressed as SVG keySplines (two segments)
  const easeInOut = "0.42 0 0.58 1;0.42 0 0.58 1";

  return (
    <g aria-hidden="true">
      {active && (
        <>
          <defs>
            <filter id="smstaff-note-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation={glowBlur} />
            </filter>
          </defs>
          <ellipse
            cx={glowCx}
            cy={glowCy}
            rx={glowRxStart}
            ry={glowRyStart}
            fill="currentColor"
            opacity="0.18"
            filter="url(#smstaff-note-glow)"
          >
            <animate
              attributeName="rx"
              values={`${glowRxStart};${glowRxEnd};${glowRxStart}`}
              dur="1.8s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines={easeInOut}
            />
            <animate
              attributeName="ry"
              values={`${glowRyStart};${glowRyEnd};${glowRyStart}`}
              dur="1.8s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines={easeInOut}
            />
            <animate
              attributeName="opacity"
              values="0.18;0.32;0.18"
              dur="1.8s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines={easeInOut}
            />
          </ellipse>
        </>
      )}
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
