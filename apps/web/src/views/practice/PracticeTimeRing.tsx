import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";
import type { Duration } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  timeLeft: {
    id: "Eau/ae",
    description: "PracticeTimeRing: time-left label",
    defaultMessage: "Time left",
  },
});

export interface PracticeTimeRingProps {
  remaining: number;
  total: Duration;
  urgent: boolean;
}

export function PracticeTimeRing({ remaining, total, urgent }: PracticeTimeRingProps): ReactElement {
  const intl = useIntl();
  const r = 17;
  const circumference = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, remaining / total));
  const dash = circumference * pct;
  const ringColor = urgent ? "var(--danger)" : pct < 0.4 ? "var(--warning)" : "var(--accent)";

  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        boxShadow: "0 1px 2px rgba(15,12,30,0.04)",
      }}
    >
      <div className="relative h-11 w-11 shrink-0">
        <svg width={44} height={44} aria-hidden="true">
          <circle cx={22} cy={22} r={r} stroke="var(--surface-tertiary)" strokeWidth={3.5} fill="none" />
          <circle
            cx={22}
            cy={22}
            r={r}
            stroke={ringColor}
            strokeWidth={3.5}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${dash} ${circumference}`}
            transform="rotate(-90 22 22)"
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums"
          style={{ color: ringColor }}
          aria-live="polite"
        >
          {Math.ceil(remaining)}
        </div>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-muted text-[10px] font-semibold tracking-[0.14em] uppercase">
          {intl.formatMessage(messages.timeLeft)}
        </span>
        <span className="text-foreground text-[15px] font-bold tabular-nums">{remaining.toFixed(1)}s</span>
      </div>
    </div>
  );
}
