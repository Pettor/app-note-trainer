import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";
import { ScoreMissRow } from "./ScoreMissRow";
import type { MissRecord } from "~/core/game/GameLoop";

const messages = defineMessages({
  header: {
    id: "score.missList.header",
    description: "ScoreMissList: header label",
    defaultMessage: "Missed notes",
  },
});

export interface ScoreMissListProps {
  misses: MissRecord[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  compact?: boolean;
}

export function ScoreMissList({ misses, selectedIndex, onSelect, compact }: ScoreMissListProps): ReactElement {
  const intl = useIntl();
  return (
    <div
      className="flex flex-col gap-1.5 rounded-2xl p-3"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        overflowY: "auto",
        maxHeight: compact ? 192 : undefined,
      }}
    >
      <div
        className="flex items-center justify-between px-2 pb-1.5 font-bold tracking-[0.18em] uppercase"
        style={{ fontSize: 10, color: "var(--muted)" }}
      >
        <span>{intl.formatMessage(messages.header)}</span>
        <span className="text-foreground tabular-nums">{misses.length}</span>
      </div>
      {misses.map((miss, i) => (
        <ScoreMissRow key={i} miss={miss} index={i} selected={i === selectedIndex} onSelect={onSelect} />
      ))}
    </div>
  );
}
