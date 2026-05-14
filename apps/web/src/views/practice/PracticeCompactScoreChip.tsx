import type { ReactElement } from "react";

export interface PracticeCompactScoreChipProps {
  correct: number;
  wrong: number;
}

export function PracticeCompactScoreChip({ correct, wrong }: PracticeCompactScoreChipProps): ReactElement {
  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        boxShadow: "0 1px 2px rgba(15,12,30,0.04)",
      }}
    >
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--success)" }} aria-hidden="true" />
        <span className="text-foreground text-sm font-bold tabular-nums">{correct}</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--danger)" }} aria-hidden="true" />
        <span className="text-foreground text-sm font-bold tabular-nums">{wrong}</span>
      </span>
    </div>
  );
}
