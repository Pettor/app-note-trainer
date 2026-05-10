import type { ReactElement, ReactNode } from "react";
import { defineMessages, useIntl } from "react-intl";
import type { Difficulty, Duration, Staff } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  sectionLabel: {
    id: "AuIymx",
    description: "HomeSessionCard: summary strip section label",
    defaultMessage: "Session",
  },
  pillDifficultyLow: {
    id: "wDm3MK",
    description: "HomeSessionCard: summary pill for low difficulty",
    defaultMessage: "Low difficulty",
  },
  pillDifficultyMedium: {
    id: "lYyts3",
    description: "HomeSessionCard: summary pill for medium difficulty",
    defaultMessage: "Medium difficulty",
  },
  pillDifficultyHigh: {
    id: "phAboe",
    description: "HomeSessionCard: summary pill for high difficulty",
    defaultMessage: "High difficulty",
  },
  pillTreble: {
    id: "xlRH0i",
    description: "HomeSessionCard: summary pill for treble clef",
    defaultMessage: "Treble clef",
  },
  pillBass: {
    id: "QvE381",
    description: "HomeSessionCard: summary pill for bass clef",
    defaultMessage: "Bass clef",
  },
  pillSharpsOn: {
    id: "AhBx6f",
    description: "HomeSessionCard: summary pill when sharps are on",
    defaultMessage: "With sharps & flats",
  },
  pillSharpsOff: {
    id: "VQj49g",
    description: "HomeSessionCard: summary pill when sharps are off",
    defaultMessage: "Naturals only",
  },
  pillTimerOn: {
    id: "RVnfVV",
    description: "HomeSessionCard: summary pill when timer is on",
    defaultMessage: "{duration}s timer",
  },
  pillTimerOff: {
    id: "HyYeWk",
    description: "HomeSessionCard: summary pill when timer is off",
    defaultMessage: "No timer",
  },
});

function SummaryPill({ children, muted = false }: { children: ReactNode; muted?: boolean }): ReactElement {
  return (
    <span
      className={`border-border bg-surface inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${muted ? "text-muted" : ""}`}
    >
      {children}
    </span>
  );
}

export interface HomeSessionCardSummaryProps {
  difficulty: Difficulty;
  staff: Staff;
  sharps: boolean;
  timerEnabled: boolean;
  duration: Duration;
}

export function HomeSessionCardSummary({
  difficulty,
  staff,
  sharps,
  timerEnabled,
  duration,
}: HomeSessionCardSummaryProps): ReactElement {
  const intl = useIntl();

  const difficultyPillLabel =
    difficulty === "low"
      ? intl.formatMessage(messages.pillDifficultyLow)
      : difficulty === "medium"
        ? intl.formatMessage(messages.pillDifficultyMedium)
        : intl.formatMessage(messages.pillDifficultyHigh);

  const difficultyDotBg =
    difficulty === "low" ? "var(--success)" : difficulty === "medium" ? "var(--accent)" : "var(--danger)";

  return (
    <div
      className="border-separator flex flex-col gap-2 border-t px-6 py-3.5 sm:flex-row sm:flex-wrap sm:items-center"
      style={{ background: "linear-gradient(180deg, var(--surface-secondary), var(--surface))" }}
    >
      <span className="text-muted shrink-0 text-[10px] tracking-[0.14em] uppercase sm:mr-1">
        {intl.formatMessage(messages.sectionLabel)}
      </span>
      <div className="grid grid-cols-2 justify-items-start gap-2 sm:flex sm:flex-wrap sm:items-center">
        <SummaryPill>
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: difficultyDotBg }} />
          {difficultyPillLabel}
        </SummaryPill>
        <SummaryPill>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-(--secondary)" />
          {staff === "treble" ? intl.formatMessage(messages.pillTreble) : intl.formatMessage(messages.pillBass)}
        </SummaryPill>
        <SummaryPill muted={!sharps}>
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: sharps ? "var(--warning)" : "var(--muted)", opacity: sharps ? 1 : 0.5 }}
          />
          {sharps ? intl.formatMessage(messages.pillSharpsOn) : intl.formatMessage(messages.pillSharpsOff)}
        </SummaryPill>
        <SummaryPill muted={!timerEnabled}>
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: timerEnabled ? "var(--accent)" : "var(--muted)", opacity: timerEnabled ? 1 : 0.5 }}
          />
          {timerEnabled
            ? intl.formatMessage(messages.pillTimerOn, { duration })
            : intl.formatMessage(messages.pillTimerOff)}
        </SummaryPill>
      </div>
    </div>
  );
}
