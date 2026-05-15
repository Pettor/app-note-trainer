import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";
import type { NoteRange } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  label: {
    id: "2/NMI4",
    description: "HomeSessionCard: note range row label",
    defaultMessage: "Note range",
  },
  desc: {
    id: "lWx3Yf",
    description: "HomeSessionCard: note range row description",
    defaultMessage: "How wide a range of pitches gets thrown at you.",
  },
  narrow: {
    id: "xVZD1q",
    description: "HomeSessionCard: note range narrow option",
    defaultMessage: "Narrow",
  },
  standard: {
    id: "8yLGFi",
    description: "HomeSessionCard: note range standard option",
    defaultMessage: "Standard",
  },
  wide: {
    id: "aVMyt3",
    description: "HomeSessionCard: note range wide option",
    defaultMessage: "Wide",
  },
  extended: {
    id: "Mx/GPZ",
    description: "HomeSessionCard: note range extended option",
    defaultMessage: "Extended",
  },
});

const OPTIONS: { value: NoteRange; messageKey: keyof typeof messages }[] = [
  { value: "narrow", messageKey: "narrow" },
  { value: "standard", messageKey: "standard" },
  { value: "wide", messageKey: "wide" },
  { value: "extended", messageKey: "extended" },
];

export interface HomeSessionCardNoteRangeRowProps {
  noteRange: NoteRange;
  onNoteRangeChange: (value: NoteRange) => void;
}

export function HomeSessionCardNoteRangeRow({
  noteRange,
  onNoteRangeChange,
}: HomeSessionCardNoteRangeRowProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="border-separator grid grid-cols-1 items-center gap-6 border-t py-4.5 sm:grid-cols-[180px_1fr]">
      <div>
        <p className="text-sm font-semibold">{intl.formatMessage(messages.label)}</p>
        <p className="text-muted mt-0.5 text-xs leading-snug">{intl.formatMessage(messages.desc)}</p>
      </div>
      <div
        role="radiogroup"
        aria-label={intl.formatMessage(messages.label)}
        className="border-border bg-surface-secondary grid grid-cols-4 gap-1 rounded-xl border p-1"
      >
        {OPTIONS.map(({ value, messageKey }) => {
          const isActive = noteRange === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onNoteRangeChange(value)}
              className="cursor-pointer rounded-[9px] py-2 text-center text-xs font-medium transition-all duration-150"
              style={
                isActive
                  ? {
                      background: "var(--surface)",
                      color: "var(--foreground)",
                      boxShadow: "0 1px 2px rgba(15,12,30,0.04), 0 4px 10px rgba(15,12,30,0.06)",
                    }
                  : { color: "var(--muted)" }
              }
            >
              {intl.formatMessage(messages[messageKey])}
            </button>
          );
        })}
      </div>
    </div>
  );
}
