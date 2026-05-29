import type { ReactElement, ReactNode } from "react";
import { defineMessages, useIntl } from "react-intl";
import type { Duration, LedgerDepth, NoteRange, Staff } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  sectionLabel: {
    id: "AuIymx",
    description: "HomeSessionCard: summary strip section label",
    defaultMessage: "Session",
  },
  pillDifficultyLow: {
    id: "Dim8Mk",
    description: "HomeSessionCard: summary pill for low difficulty",
    defaultMessage: "Low",
  },
  pillDifficultyMedium: {
    id: "oVM0cE",
    description: "HomeSessionCard: summary pill for medium difficulty",
    defaultMessage: "Medium",
  },
  pillDifficultyHigh: {
    id: "7zvIiG",
    description: "HomeSessionCard: summary pill for high difficulty",
    defaultMessage: "High",
  },
  pillDifficultyNightmare: {
    id: "3zutUC",
    description: "HomeSessionCard: summary pill for nightmare difficulty",
    defaultMessage: "Nightmare",
  },
  pillDifficultyCustom: {
    id: "NYXAR8",
    description: "HomeSessionCard: summary pill for custom difficulty",
    defaultMessage: "Custom",
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
  pillRangeNarrow: {
    id: "I/4oDo",
    description: "HomeSessionCard: summary pill for narrow note range",
    defaultMessage: "Narrow range",
  },
  pillRangeStandard: {
    id: "RuI0qJ",
    description: "HomeSessionCard: summary pill for standard note range",
    defaultMessage: "Standard range",
  },
  pillRangeWide: {
    id: "JF2KUH",
    description: "HomeSessionCard: summary pill for wide note range",
    defaultMessage: "Wide range",
  },
  pillRangeExtended: {
    id: "4gGhl1",
    description: "HomeSessionCard: summary pill for extended note range",
    defaultMessage: "Extended range",
  },
  pillLedger1: {
    id: "zogfAR",
    description: "HomeSessionCard: summary pill for 1 ledger line",
    defaultMessage: "1 ledger line",
  },
  pillLedger3: {
    id: "DVruhr",
    description: "HomeSessionCard: summary pill for 2-3 ledger lines",
    defaultMessage: "2–3 ledger lines",
  },
  pillNoLedger: {
    id: "coeNeo",
    description: "HomeSessionCard: summary pill when ledger lines off",
    defaultMessage: "No ledger",
  },
  pillSharpsOn: {
    id: "LhtHYr",
    description: "HomeSessionCard: summary pill when sharps are on",
    defaultMessage: "With ♯/♭",
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
  pillScaleOn: {
    id: "UTYxfe",
    description: "HomeSessionCard: summary pill when guess scale first is on",
    defaultMessage: "Guess scale first",
  },
  pillScaleOff: {
    id: "1ARBHa",
    description: "HomeSessionCard: summary pill when guess scale first is off",
    defaultMessage: "No scale guess",
  },
  pillNaturalsOn: {
    id: "Aq8JZc",
    description: "HomeSessionCard: summary pill when naturals are on",
    defaultMessage: "With ♮",
  },
  pillNaturalsOff: {
    id: "TmdIca",
    description: "HomeSessionCard: summary pill when naturals are off",
    defaultMessage: "No ♮",
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

function Dot({ color }: { color: string }): ReactElement {
  return <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: color }} />;
}

export interface HomeSessionCardSummaryProps {
  staff: Staff;
  noteRange: NoteRange;
  ledgerLines: boolean;
  ledgerDepth: LedgerDepth;
  sharps: boolean;
  naturals: boolean;
  timerEnabled: boolean;
  duration: Duration;
  guessScaleFirst: boolean;
}

export function HomeSessionCardSummary({
  staff,
  noteRange,
  ledgerLines,
  ledgerDepth,
  sharps,
  naturals,
  timerEnabled,
  duration,
  guessScaleFirst,
}: HomeSessionCardSummaryProps): ReactElement {
  const intl = useIntl();

  const rangeLabel =
    noteRange === "narrow"
      ? intl.formatMessage(messages.pillRangeNarrow)
      : noteRange === "standard"
        ? intl.formatMessage(messages.pillRangeStandard)
        : noteRange === "wide"
          ? intl.formatMessage(messages.pillRangeWide)
          : intl.formatMessage(messages.pillRangeExtended);

  const ledgerLabel = ledgerLines
    ? ledgerDepth === 1
      ? intl.formatMessage(messages.pillLedger1)
      : intl.formatMessage(messages.pillLedger3)
    : intl.formatMessage(messages.pillNoLedger);

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
          <Dot color="var(--secondary)" />
          {staff === "treble" ? intl.formatMessage(messages.pillTreble) : intl.formatMessage(messages.pillBass)}
        </SummaryPill>
        <SummaryPill>
          <Dot color="var(--accent)" />
          {rangeLabel}
        </SummaryPill>
        <SummaryPill muted={!ledgerLines}>
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: ledgerLines ? "var(--accent)" : "var(--muted)", opacity: ledgerLines ? 1 : 0.5 }}
          />
          {ledgerLabel}
        </SummaryPill>
        <SummaryPill muted={!timerEnabled}>
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: timerEnabled ? "var(--warning)" : "var(--muted)", opacity: timerEnabled ? 1 : 0.5 }}
          />
          {timerEnabled
            ? intl.formatMessage(messages.pillTimerOn, { duration })
            : intl.formatMessage(messages.pillTimerOff)}
        </SummaryPill>
        <SummaryPill muted={!sharps}>
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: sharps ? "var(--warning)" : "var(--muted)", opacity: sharps ? 1 : 0.5 }}
          />
          {sharps ? intl.formatMessage(messages.pillSharpsOn) : intl.formatMessage(messages.pillSharpsOff)}
        </SummaryPill>
        {sharps && (
          <SummaryPill muted={!naturals}>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: naturals ? "var(--warning)" : "var(--muted)", opacity: naturals ? 1 : 0.5 }}
            />
            {naturals ? intl.formatMessage(messages.pillNaturalsOn) : intl.formatMessage(messages.pillNaturalsOff)}
          </SummaryPill>
        )}
        <SummaryPill muted={!guessScaleFirst}>
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{
              background: guessScaleFirst ? "var(--secondary)" : "var(--muted)",
              opacity: guessScaleFirst ? 1 : 0.5,
            }}
          />
          {guessScaleFirst ? intl.formatMessage(messages.pillScaleOn) : intl.formatMessage(messages.pillScaleOff)}
        </SummaryPill>
      </div>
    </div>
  );
}
