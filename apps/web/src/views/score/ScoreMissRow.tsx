import type { ReactElement } from "react";
import type { MissRecord } from "~/core/game/GameLoop";

function formatCorrectNote(miss: MissRecord): string {
  if (miss.correctAccidental === "sharp") return `${miss.correctStep}#`;
  if (miss.correctAccidental === "flat") return `${miss.correctStep}b`;
  return miss.correctStep;
}

function formatGuessNote(miss: MissRecord): string {
  if (miss.guessNote === null) return "—";
  return miss.guessNote;
}

export interface ScoreMissRowProps {
  miss: MissRecord;
  index: number;
  selected: boolean;
  onSelect: (index: number) => void;
}

export function ScoreMissRow({ miss, index, selected, onSelect }: ScoreMissRowProps): ReactElement {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
      style={{
        background: selected ? "var(--surface-secondary)" : "transparent",
        border: `1px solid ${selected ? "var(--border)" : "transparent"}`,
        font: "inherit",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      {/* Index badge */}
      <div
        className="grid shrink-0 place-items-center rounded-lg font-bold tabular-nums"
        style={{
          width: 28,
          height: 28,
          fontSize: 12,
          background: selected ? "var(--brand-gradient)" : "var(--surface-tertiary)",
          color: selected ? "white" : "var(--muted)",
        }}
      >
        {index + 1}
      </div>

      {/* Note info */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-tight">
        <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>
          <span
            className="inline-block rounded-full"
            style={{ width: 7, height: 7, background: "var(--success)", flexShrink: 0 }}
          />
          <span>
            Shown <span className="text-foreground font-bold tabular-nums">{formatCorrectNote(miss)}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>
          <span
            className="inline-block rounded-full"
            style={{ width: 7, height: 7, background: "var(--danger)", flexShrink: 0 }}
          />
          <span>
            {miss.guessNote ? "You played" : "Timed out"}{" "}
            {miss.guessNote && <span className="text-foreground font-bold tabular-nums">{formatGuessNote(miss)}</span>}
          </span>
        </div>
      </div>

      {/* Time pill */}
      <div
        className="shrink-0 rounded-md px-1.5 py-0.5 font-semibold tabular-nums"
        style={{
          fontSize: 11,
          color: "var(--muted)",
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {miss.timeTaken.toFixed(1)}s
      </div>
    </button>
  );
}
