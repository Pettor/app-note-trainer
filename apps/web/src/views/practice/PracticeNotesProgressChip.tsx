import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  notes: {
    id: "slyQ2v",
    description: "PracticeNotesProgressChip: notes-progress label",
    defaultMessage: "Notes",
  },
});

export interface PracticeNotesProgressChipProps {
  done: number;
  total: number;
}

export function PracticeNotesProgressChip({ done, total }: PracticeNotesProgressChipProps): ReactElement {
  const intl = useIntl();
  const cells = Array.from({ length: total }, (_, i) => i < done);

  return (
    <div
      className="min-w-0 flex-1 flex-col gap-1.5 px-3 py-2.5 sm:px-4 sm:py-3"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        boxShadow: "0 1px 2px rgba(15,12,30,0.04)",
      }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-muted text-[10px] font-semibold tracking-[0.14em] uppercase">
          {intl.formatMessage(messages.notes)}
        </span>
        <span className="text-foreground shrink-0 text-xs font-bold tabular-nums sm:text-sm">
          {done}
          <span className="text-muted font-medium">/{total}</span>
        </span>
      </div>
      <div className="flex gap-0.75" aria-hidden="true">
        {cells.map((filled, i) => (
          <div
            key={i}
            className="h-1 min-w-0 flex-1 rounded-full"
            style={{ background: filled ? "var(--accent)" : "var(--surface-tertiary)" }}
          />
        ))}
      </div>
    </div>
  );
}
