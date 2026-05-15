import type { ReactElement } from "react";
import type { NoteType, StaffMetrics } from "./UseSheetMusicStaff";
import { useSheetMusicStaffNote } from "./UseSheetMusicStaffNote";

interface SheetMusicStaffNoteProps {
  slot: number;
  type: NoteType;
  x: number;
  active?: boolean;
  accidental?: "sharp";
  metrics: StaffMetrics;
}

export function SheetMusicStaffNote({
  slot,
  type,
  x,
  active,
  accidental,
  metrics,
}: SheetMusicStaffNoteProps): ReactElement {
  const { clefFontSize, lineThickness, slotToY } = metrics;
  const n = useSheetMusicStaffNote(slot, type, x, metrics, accidental);

  return (
    <g aria-hidden="true">
      {active && (
        <>
          <defs>
            <filter id="smstaff-note-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation={n.glowBlur} />
            </filter>
          </defs>
          <ellipse
            cx={n.glowCx}
            cy={n.glowCy}
            rx={n.glowRxStart}
            ry={n.glowRyStart}
            fill="currentColor"
            opacity={n.glowOpacityStart}
            filter="url(#smstaff-note-glow)"
          >
            <animate
              attributeName="rx"
              values={`${n.glowRxStart};${n.glowRxEnd};${n.glowRxStart}`}
              dur={n.glowDuration}
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines={n.glowEaseInOut}
            />
            <animate
              attributeName="ry"
              values={`${n.glowRyStart};${n.glowRyEnd};${n.glowRyStart}`}
              dur={n.glowDuration}
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines={n.glowEaseInOut}
            />
            <animate
              attributeName="opacity"
              values={`${n.glowOpacityStart};${n.glowOpacityEnd};${n.glowOpacityStart}`}
              dur={n.glowDuration}
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines={n.glowEaseInOut}
            />
          </ellipse>
        </>
      )}
      {n.ledgerSlots.map((ls) => (
        <line
          key={ls}
          x1={x - n.ledgerExtend}
          x2={x + n.noteheadWidth + n.ledgerExtend}
          y1={slotToY(ls)}
          y2={slotToY(ls)}
          stroke="currentColor"
          strokeWidth={lineThickness}
        />
      ))}
      {n.accidentalGlyph && (
        <text
          x={n.accidentalX}
          y={n.noteY}
          fontFamily="Leland"
          fontSize={n.accidentalFontSize}
          fill="currentColor"
          style={{ userSelect: "none" }}
        >
          {n.accidentalGlyph}
        </text>
      )}
      <text
        x={x}
        y={n.noteY}
        fontFamily="Leland"
        fontSize={clefFontSize}
        fill="currentColor"
        style={{ userSelect: "none" }}
      >
        {n.notehead}
      </text>
      {!n.hasWholehead && (
        <line x1={n.stemX} x2={n.stemX} y1={n.stemY1} y2={n.stemY2} stroke="currentColor" strokeWidth={n.stemWidth} />
      )}
    </g>
  );
}
