import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";
import { SheetMusicStaffNote } from "./SheetMusicStaffNote";
import { useSheetMusicStaff } from "./UseSheetMusicStaff";
import type { StaffNoteData } from "./UseSheetMusicStaff";
import type { Staff } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  ariaLabel: {
    id: "XmVdlT",
    description: "SheetMusicStaff: SVG aria-label — describes the staff type to screen readers",
    defaultMessage: "{clefName} clef staff",
  },
  trebleClefName: {
    id: "s99SGX",
    description: "SheetMusicStaff: treble clef name for aria-label",
    defaultMessage: "Treble",
  },
  bassClefName: {
    id: "AaZgLh",
    description: "SheetMusicStaff: bass clef name for aria-label",
    defaultMessage: "Bass",
  },
});

export interface SheetMusicStaffProps {
  staff: Staff;
  notes?: StaffNoteData[];
  className?: string;
}

export function SheetMusicStaff({ staff, notes, className }: SheetMusicStaffProps): ReactElement {
  const intl = useIntl();
  const metrics = useSheetMusicStaff(staff);

  const clefName = intl.formatMessage(staff === "treble" ? messages.trebleClefName : messages.bassClefName);
  const ariaLabel = intl.formatMessage(messages.ariaLabel, { clefName });

  return (
    // aspect-ratio + maxHeight:"100%" lets the SVG shrink to fit the parent's height in
    // constrained layouts (e.g. landscape phone) while preserving the correct aspect ratio.
    // In unconstrained contexts (Storybook, auto-height divs) maxHeight:100% resolves to
    // none, so the SVG expands naturally via the viewBox aspect ratio as before.
    <div
      className={className}
      style={{ aspectRatio: `${metrics.viewBoxWidth} / ${metrics.viewBoxHeight}`, maxHeight: "100%" }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={metrics.viewBox}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={ariaLabel}
      >
        {metrics.lineYPositions.map((y, i) => (
          <line
            key={i}
            x1={0}
            x2={metrics.viewBoxWidth}
            y1={y}
            y2={y}
            stroke="currentColor"
            strokeWidth={metrics.lineThickness}
          />
        ))}
        {/* Left bar line */}
        <line
          x1={metrics.lineThickness / 2}
          x2={metrics.lineThickness / 2}
          y1={metrics.lineYPositions[0]}
          y2={metrics.lineYPositions[metrics.lineYPositions.length - 1]}
          stroke="currentColor"
          strokeWidth={metrics.lineThickness}
          strokeLinecap="square"
        />
        {/* Right bar line */}
        <line
          x1={metrics.viewBoxWidth - metrics.lineThickness / 2}
          x2={metrics.viewBoxWidth - metrics.lineThickness / 2}
          y1={metrics.lineYPositions[0]}
          y2={metrics.lineYPositions[metrics.lineYPositions.length - 1]}
          stroke="currentColor"
          strokeWidth={metrics.lineThickness}
          strokeLinecap="square"
        />
        <text
          x={metrics.clefX}
          y={metrics.clefBaselineY}
          fontFamily="Leland"
          fontSize={metrics.clefFontSize}
          fill="currentColor"
          aria-hidden="true"
          style={{ userSelect: "none" }}
        >
          {metrics.clefGlyph}
        </text>
        {notes?.map((note, i) => (
          <SheetMusicStaffNote
            key={i}
            slot={note.slot}
            type={note.type ?? "quarter"}
            x={note.x ?? metrics.noteAreaStartX + metrics.staffSpaceSize * 4}
            active={note.active}
            metrics={metrics}
          />
        ))}
      </svg>
    </div>
  );
}
