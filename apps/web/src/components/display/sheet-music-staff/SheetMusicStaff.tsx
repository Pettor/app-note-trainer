import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";
import { SheetMusicStaffNote } from "./SheetMusicStaffNote";
import { useSheetMusicStaff } from "./UseSheetMusicStaff";
import type { StaffNoteData } from "./UseSheetMusicStaff";
import type { KeySignatureInfo } from "~/core/game/MusicScale";
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
  keySignature?: KeySignatureInfo;
  className?: string;
  /** Fixed slot bounds for the viewBox — prevents layout shift when notes change.
   *  When omitted, bounds are auto-detected from the notes array each render. */
  minSlot?: number;
  maxSlot?: number;
}

export function SheetMusicStaff({
  staff,
  notes,
  keySignature,
  className,
  minSlot: minSlotProp,
  maxSlot: maxSlotProp,
}: SheetMusicStaffProps): ReactElement {
  const intl = useIntl();
  // Use explicit bounds when provided (stable viewBox); fall back to auto-detection from notes.
  const slots = notes?.map((n) => n.slot) ?? [];
  const minSlot = minSlotProp ?? (slots.length > 0 ? Math.min(...slots) : 0);
  const maxSlot = maxSlotProp ?? (slots.length > 0 ? Math.max(...slots) : 8);
  const metrics = useSheetMusicStaff(staff, minSlot, maxSlot, keySignature);

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
        {/* Clef */}
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
        {/* Key signature accidentals */}
        {metrics.keySigGlyphs.map(({ x, slot }, i) => (
          <text
            key={i}
            x={x}
            y={metrics.slotToY(slot)}
            fontFamily="Leland"
            fontSize={metrics.keySigFontSize}
            fill="currentColor"
            aria-hidden="true"
            style={{ userSelect: "none" }}
          >
            {metrics.keySigAccidentalGlyph}
          </text>
        ))}
        {/* Notes */}
        {notes?.map((note, i) => (
          <SheetMusicStaffNote
            key={i}
            slot={note.slot}
            type={note.type ?? "quarter"}
            x={note.x ?? metrics.defaultNoteX}
            active={note.active}
            accidental={note.accidental}
            metrics={metrics}
          />
        ))}
      </svg>
    </div>
  );
}
