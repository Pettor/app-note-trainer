import type { ReactElement } from "react";
import type { ReactNode } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Switch } from "@heroui/react";
import { defineMessages, useIntl } from "react-intl";
import { useHomeSessionCard } from "./UseHomeSessionCard";
import type { Difficulty, Duration, Staff } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  cardTitle: {
    id: "cLcs1f",
    description: "HomeSessionCard: card heading",
    defaultMessage: "Session setup",
  },
  cardSub: {
    id: "W+SA5i",
    description: "HomeSessionCard: card subtitle",
    defaultMessage: "Adjust to match where you're at today.",
  },
  difficultyLabel: {
    id: "rBNVrs",
    description: "HomeSessionCard: difficulty row label",
    defaultMessage: "Difficulty",
  },
  difficultyDesc: {
    id: "YsKhx9",
    description: "HomeSessionCard: difficulty row description",
    defaultMessage: "Range of notes & ledger lines.",
  },
  difficultyLow: {
    id: "Yc0s9X",
    description: "HomeSessionCard: difficulty low option",
    defaultMessage: "Low",
  },
  difficultyMedium: {
    id: "5EFJsA",
    description: "HomeSessionCard: difficulty medium option",
    defaultMessage: "Medium",
  },
  difficultyHigh: {
    id: "FiQKBF",
    description: "HomeSessionCard: difficulty high option",
    defaultMessage: "High",
  },
  staffLabel: {
    id: "6XovsT",
    description: "HomeSessionCard: staff row label",
    defaultMessage: "Staff",
  },
  staffDesc: {
    id: "HQvkwd",
    description: "HomeSessionCard: staff row description",
    defaultMessage: "Which clef you're reading.",
  },
  trebleName: {
    id: "XV9RqW",
    description: "HomeSessionCard: treble clef name",
    defaultMessage: "Treble",
  },
  trebleRange: {
    id: "sDbczm",
    description: "HomeSessionCard: treble clef range description",
    defaultMessage: "G clef · upper voices",
  },
  bassName: {
    id: "9sk9JS",
    description: "HomeSessionCard: bass clef name",
    defaultMessage: "Bass",
  },
  bassRange: {
    id: "59i7/T",
    description: "HomeSessionCard: bass clef range description",
    defaultMessage: "F clef · lower voices",
  },
  sharpsLabel: {
    id: "8n4wYD",
    description: "HomeSessionCard: sharps row label",
    defaultMessage: "Sharps & flats",
  },
  sharpsDesc: {
    id: "kOi55N",
    description: "HomeSessionCard: sharps row description",
    defaultMessage: "Include accidentals in the deck.",
  },
  sharpsOn: {
    id: "0pTpaY",
    description: "HomeSessionCard: sharps toggle on state label",
    defaultMessage: "On — naturals + ♯/♭",
  },
  sharpsOff: {
    id: "rml32P",
    description: "HomeSessionCard: sharps toggle off state label",
    defaultMessage: "Off — natural notes only",
  },
  sharpsToggleDesc: {
    id: "vuVDbB",
    description: "HomeSessionCard: sharps toggle hint",
    defaultMessage: "Toggle on to mix in ♯ and ♭.",
  },
  timerLabel: {
    id: "LSiYLr",
    description: "HomeSessionCard: timer row label",
    defaultMessage: "Time limit",
  },
  timerDesc: {
    id: "LZ8ffD",
    description: "HomeSessionCard: timer row description",
    defaultMessage: "Pressure builds reflexes.",
  },
  timerOn: {
    id: "7kitNA",
    description: "HomeSessionCard: timer on state label",
    defaultMessage: "On — {duration}s per note",
  },
  timerOff: {
    id: "uWV4Fg",
    description: "HomeSessionCard: timer off state label",
    defaultMessage: "Off — go at your own pace",
  },
  timerToggleDesc: {
    id: "jwtUIG",
    description: "HomeSessionCard: timer toggle hint",
    defaultMessage: "Each note must be answered before the bar runs out.",
  },
  summaryLabel: {
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

const DURATIONS: Duration[] = [3, 5, 8, 12];

function SummaryPill({ children, muted = false }: { children: ReactNode; muted?: boolean }): ReactElement {
  return (
    <span
      className={`border-border bg-surface inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${muted ? "text-muted" : ""}`}
    >
      {children}
    </span>
  );
}

function TrebleClefIcon(): ReactElement {
  return (
    <svg
      width="22"
      height="30"
      viewBox="0 0 24 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2 C 9 5 8 9 11 13 C 14 17 19 19 19 24 C 19 29 14 32 11 30 C 9 29 8 27 9 25 C 10 23 13 23 14 25 C 15 27 13 29 11 29 M11 29 L 11 33 C 11 35 13 35 13 33 M11 13 C 13 19 13 27 11 33" />
    </svg>
  );
}

function BassClefIcon(): ReactElement {
  return (
    <svg
      width="24"
      height="30"
      viewBox="0 0 24 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 22 C 5 14 13 11 18 14 C 22 17 21 23 16 25 C 13 26 9 25 7 22 M5 22 C 5 12 12 8 16 10" />
      <circle cx="20" cy="13" r="1.4" fill="currentColor" />
      <circle cx="20" cy="19" r="1.4" fill="currentColor" />
    </svg>
  );
}

function LevelBars({ level, active }: { level: Difficulty; active: boolean }): ReactElement {
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

export function HomeSessionCard(): ReactElement {
  const intl = useIntl();
  const {
    difficulty,
    staff,
    sharps,
    timerEnabled,
    duration,
    onDifficultyChange,
    onStaffChange,
    onSharpsChange,
    onTimerChange,
    onDurationChange,
  } = useHomeSessionCard();

  const difficultyOptions: { value: Difficulty; label: string }[] = [
    { value: "low", label: intl.formatMessage(messages.difficultyLow) },
    { value: "medium", label: intl.formatMessage(messages.difficultyMedium) },
    { value: "high", label: intl.formatMessage(messages.difficultyHigh) },
  ];

  const difficultyPillLabel =
    difficulty === "low"
      ? intl.formatMessage(messages.pillDifficultyLow)
      : difficulty === "medium"
        ? intl.formatMessage(messages.pillDifficultyMedium)
        : intl.formatMessage(messages.pillDifficultyHigh);

  const difficultyPillColor =
    difficulty === "low"
      ? "text-[var(--success)]"
      : difficulty === "medium"
        ? "text-[var(--accent)]"
        : "text-[var(--secondary)]";

  return (
    <div
      className="border-border bg-surface overflow-hidden rounded-[22px] border"
      style={{ boxShadow: "0 6px 16px rgba(15,12,30,0.06), 0 16px 40px rgba(15,12,30,0.06)" }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3.5">
        <div>
          <p className="text-base font-semibold tracking-tight">{intl.formatMessage(messages.cardTitle)}</p>
          <p className="text-muted text-xs">{intl.formatMessage(messages.cardSub)}</p>
        </div>
      </div>

      {/* Settings rows */}
      <div className="px-6 pb-2">
        {/* Difficulty */}
        <div className="border-separator grid grid-cols-1 items-center gap-6 border-t py-4.5 sm:grid-cols-[180px_1fr]">
          <div>
            <p className="text-sm font-semibold">{intl.formatMessage(messages.difficultyLabel)}</p>
            <p className="text-muted mt-0.5 text-xs leading-snug">{intl.formatMessage(messages.difficultyDesc)}</p>
          </div>
          <div
            role="radiogroup"
            aria-label={intl.formatMessage(messages.difficultyLabel)}
            className="border-border bg-surface-secondary grid grid-cols-3 gap-1 rounded-[14px] border p-1"
          >
            {difficultyOptions.map(({ value, label }) => {
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

        {/* Staff */}
        <div className="border-separator grid grid-cols-1 items-center gap-6 border-t py-4.5 sm:grid-cols-[180px_1fr]">
          <div>
            <p className="text-sm font-semibold">{intl.formatMessage(messages.staffLabel)}</p>
            <p className="text-muted mt-0.5 text-xs leading-snug">{intl.formatMessage(messages.staffDesc)}</p>
          </div>
          <div
            role="radiogroup"
            aria-label={intl.formatMessage(messages.staffLabel)}
            className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
          >
            {(
              [
                {
                  value: "treble" as Staff,
                  name: intl.formatMessage(messages.trebleName),
                  range: intl.formatMessage(messages.trebleRange),
                  Icon: TrebleClefIcon,
                },
                {
                  value: "bass" as Staff,
                  name: intl.formatMessage(messages.bassName),
                  range: intl.formatMessage(messages.bassRange),
                  Icon: BassClefIcon,
                },
              ] as const
            ).map(({ value, name, range, Icon }) => {
              const isActive = staff === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => onStaffChange(value)}
                  className="grid cursor-pointer grid-cols-[44px_1fr_auto] items-center gap-3 rounded-[14px] border px-3.5 py-3.5 text-left transition-all duration-150"
                  style={
                    isActive
                      ? {
                          borderColor: "color-mix(in oklab, var(--accent) 50%, var(--border))",
                          background:
                            "linear-gradient(180deg, var(--surface), color-mix(in oklab, var(--accent) 12%, var(--surface)))",
                          boxShadow: "0 0 0 3px color-mix(in oklab, var(--accent) 14%, transparent)",
                        }
                      : {
                          borderColor: "var(--border)",
                          background: "var(--surface)",
                        }
                  }
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={
                      isActive
                        ? { background: "var(--brand-gradient)", color: "white" }
                        : { background: "var(--surface-secondary)", color: "var(--foreground)" }
                    }
                  >
                    <Icon />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{name}</span>
                    <span className="text-muted mt-0.5 block text-[11px]">{range}</span>
                  </span>
                  <span
                    className="flex h-5.5 w-5.5 items-center justify-center rounded-full border transition-all duration-150"
                    style={
                      isActive
                        ? { background: "var(--accent)", borderColor: "var(--accent)", color: "white" }
                        : { borderColor: "var(--border)", color: "transparent" }
                    }
                  >
                    <CheckIcon className="h-3 w-3" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sharps & flats */}
        <div className="border-separator grid grid-cols-1 items-center gap-6 border-t py-4.5 sm:grid-cols-[180px_1fr]">
          <div>
            <p className="text-sm font-semibold">{intl.formatMessage(messages.sharpsLabel)}</p>
            <p className="text-muted mt-0.5 text-xs leading-snug">{intl.formatMessage(messages.sharpsDesc)}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">
                {sharps ? intl.formatMessage(messages.sharpsOn) : intl.formatMessage(messages.sharpsOff)}
              </p>
              <p className="text-muted mt-0.5 text-xs">{intl.formatMessage(messages.sharpsToggleDesc)}</p>
            </div>
            <Switch isSelected={sharps} onChange={onSharpsChange} aria-label={intl.formatMessage(messages.sharpsLabel)}>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch>
          </div>
        </div>

        {/* Time limit */}
        <div className="border-separator grid grid-cols-1 items-start gap-6 border-t py-4.5 sm:grid-cols-[180px_1fr]">
          <div>
            <p className="text-sm font-semibold">{intl.formatMessage(messages.timerLabel)}</p>
            <p className="text-muted mt-0.5 text-xs leading-snug">{intl.formatMessage(messages.timerDesc)}</p>
          </div>
          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">
                  {timerEnabled
                    ? intl.formatMessage(messages.timerOn, { duration })
                    : intl.formatMessage(messages.timerOff)}
                </p>
                <p className="text-muted mt-0.5 text-xs">{intl.formatMessage(messages.timerToggleDesc)}</p>
              </div>
              <Switch
                isSelected={timerEnabled}
                onChange={onTimerChange}
                aria-label={intl.formatMessage(messages.timerLabel)}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            </div>
            {/* Duration picker — rendered only when timer is enabled to keep the DOM focusable-element-free when hidden */}
            {timerEnabled && (
              <div
                role="radiogroup"
                aria-label="Time per note"
                className="border-border bg-surface-secondary mt-3.5 grid grid-cols-4 gap-1.5 overflow-hidden rounded-xl border p-1"
              >
                {DURATIONS.map((d) => {
                  const isActive = duration === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => onDurationChange(d)}
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
                      {d}s
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live summary strip */}
      <div
        className="border-separator flex flex-wrap items-center gap-2 border-t px-6 py-3.5"
        style={{ background: "linear-gradient(180deg, var(--surface-secondary), var(--surface))" }}
      >
        <span className="text-muted mr-1 text-[10px] tracking-[0.14em] uppercase">
          {intl.formatMessage(messages.summaryLabel)}
        </span>
        <SummaryPill>
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${difficultyPillColor}`} />
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
            style={{ background: timerEnabled ? "var(--warning)" : "var(--muted)", opacity: timerEnabled ? 1 : 0.5 }}
          />
          {timerEnabled
            ? intl.formatMessage(messages.pillTimerOn, { duration })
            : intl.formatMessage(messages.pillTimerOff)}
        </SummaryPill>
      </div>
    </div>
  );
}
