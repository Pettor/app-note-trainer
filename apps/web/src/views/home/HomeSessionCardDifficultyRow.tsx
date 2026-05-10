import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";
import type { Difficulty } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  label: {
    id: "rBNVrs",
    description: "HomeSessionCard: difficulty row label",
    defaultMessage: "Difficulty",
  },
  desc: {
    id: "YsKhx9",
    description: "HomeSessionCard: difficulty row description",
    defaultMessage: "Range of notes & ledger lines.",
  },
  low: {
    id: "Yc0s9X",
    description: "HomeSessionCard: difficulty low option",
    defaultMessage: "Low",
  },
  medium: {
    id: "5EFJsA",
    description: "HomeSessionCard: difficulty medium option",
    defaultMessage: "Medium",
  },
  high: {
    id: "FiQKBF",
    description: "HomeSessionCard: difficulty high option",
    defaultMessage: "High",
  },
});

interface LevelBarsProps {
  level: Difficulty;
  active: boolean;
}

function LevelBars({ level, active }: LevelBarsProps): ReactElement {
  const activeColor = active
    ? level === "low"
      ? "text-[var(--success)]"
      : level === "medium"
        ? "text-[var(--accent)]"
        : "text-[var(--secondary)]"
    : "text-muted";

  return (
    <span className={`flex items-end gap-0.75 ${activeColor}`} aria-hidden="true">
      <span className="block w-0.75 rounded-sm bg-current" style={{ height: 4 }} />
      <span
        className="block w-0.75 rounded-sm bg-current"
        style={{ height: 8, opacity: level === "low" ? 0.25 : undefined }}
      />
      <span
        className="block w-0.75 rounded-sm bg-current"
        style={{ height: 12, opacity: level !== "high" ? 0.25 : undefined }}
      />
    </span>
  );
}

export interface HomeSessionCardDifficultyRowProps {
  difficulty: Difficulty;
  onDifficultyChange: (value: Difficulty) => void;
}

export function HomeSessionCardDifficultyRow({
  difficulty,
  onDifficultyChange,
}: HomeSessionCardDifficultyRowProps): ReactElement {
  const intl = useIntl();

  const options: { value: Difficulty; label: string }[] = [
    { value: "low", label: intl.formatMessage(messages.low) },
    { value: "medium", label: intl.formatMessage(messages.medium) },
    { value: "high", label: intl.formatMessage(messages.high) },
  ];

  return (
    <div className="border-separator grid grid-cols-1 items-center gap-6 border-t py-4.5 sm:grid-cols-[180px_1fr]">
      <div>
        <p className="text-sm font-semibold">{intl.formatMessage(messages.label)}</p>
        <p className="text-muted mt-0.5 text-xs leading-snug">{intl.formatMessage(messages.desc)}</p>
      </div>
      <div
        role="radiogroup"
        aria-label={intl.formatMessage(messages.label)}
        className="border-border bg-surface-secondary grid grid-cols-3 gap-1 rounded-[14px] border p-1"
      >
        {options.map(({ value, label }) => {
          const isActive = difficulty === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onDifficultyChange(value)}
              className="flex cursor-pointer flex-col items-center gap-1 rounded-[10px] px-2 py-2.5 text-xs font-medium transition-all duration-150"
              style={
                isActive
                  ? {
                      background: "var(--surface)",
                      boxShadow: "0 1px 2px rgba(15,12,30,0.04), 0 4px 10px rgba(15,12,30,0.06)",
                    }
                  : undefined
              }
            >
              <LevelBars level={value} active={isActive} />
              <span className={isActive ? "text-foreground" : "text-muted"}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
