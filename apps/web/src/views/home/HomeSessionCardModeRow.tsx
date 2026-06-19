import type { ReactElement } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { defineMessages, useIntl } from "react-intl";
import type { ChordPool, PracticeMode } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  label: {
    id: "jHmQeA",
    description: "HomeSessionCard: mode row label",
    defaultMessage: "Mode",
  },
  desc: {
    id: "gn6zwb",
    description: "HomeSessionCard: mode row description",
    defaultMessage: "Name one pitch, or identify a whole chord.",
  },
  singleName: {
    id: "G4/3lg",
    description: "HomeSessionCard: single note mode name",
    defaultMessage: "Single note",
  },
  singleDesc: {
    id: "1WN1dH",
    description: "HomeSessionCard: single note mode sublabel",
    defaultMessage: "Name one pitch",
  },
  chordName: {
    id: "W5GgPL",
    description: "HomeSessionCard: chord mode name",
    defaultMessage: "Chords",
  },
  chordDesc: {
    id: "AB8mqd",
    description: "HomeSessionCard: chord mode sublabel",
    defaultMessage: "Identify the chord",
  },
  chordPoolLabel: {
    id: "AZxbeR",
    description: "HomeSessionCard: chord pool picker aria-label",
    defaultMessage: "Chord pool",
  },
  poolTriads: {
    id: "8m7vSM",
    description: "HomeSessionCard: triads chord pool option",
    defaultMessage: "Triads",
  },
  poolSevenths: {
    id: "d/Pzcf",
    description: "HomeSessionCard: triads plus sevenths chord pool option",
    defaultMessage: "Triads + 7ths",
  },
});

function SingleNoteGlyph(): ReactElement {
  return (
    <svg width={22} height={28} viewBox="0 0 24 32" fill="none" aria-hidden="true">
      <line x1="16.5" y1="9" x2="16.5" y2="26" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
      <ellipse cx="11.5" cy="24.5" rx="5" ry="3.6" fill="currentColor" transform="rotate(-22 11.5 24.5)" />
    </svg>
  );
}

function ChordGlyph(): ReactElement {
  return (
    <svg width={24} height={28} viewBox="0 0 26 32" fill="none" aria-hidden="true">
      <line x1="18" y1="6" x2="18" y2="27" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
      <ellipse cx="13" cy="25" rx="4.6" ry="3.3" fill="currentColor" transform="rotate(-22 13 25)" />
      <ellipse cx="13" cy="19" rx="4.6" ry="3.3" fill="currentColor" transform="rotate(-22 13 19)" />
      <ellipse cx="13" cy="13" rx="4.6" ry="3.3" fill="currentColor" transform="rotate(-22 13 13)" />
    </svg>
  );
}

export interface HomeSessionCardModeRowProps {
  mode: PracticeMode;
  chordPool: ChordPool;
  onModeChange: (value: PracticeMode) => void;
  onChordPoolChange: (value: ChordPool) => void;
}

export function HomeSessionCardModeRow({
  mode,
  chordPool,
  onModeChange,
  onChordPoolChange,
}: HomeSessionCardModeRowProps): ReactElement {
  const intl = useIntl();

  const options: { value: PracticeMode; name: string; desc: string; glyph: ReactElement }[] = [
    {
      value: "single",
      name: intl.formatMessage(messages.singleName),
      desc: intl.formatMessage(messages.singleDesc),
      glyph: <SingleNoteGlyph />,
    },
    {
      value: "chord",
      name: intl.formatMessage(messages.chordName),
      desc: intl.formatMessage(messages.chordDesc),
      glyph: <ChordGlyph />,
    },
  ];

  const pools: { value: ChordPool; label: string }[] = [
    { value: "triads", label: intl.formatMessage(messages.poolTriads) },
    { value: "sevenths", label: intl.formatMessage(messages.poolSevenths) },
  ];

  const chordSelected = mode === "chord";

  return (
    <div className="border-separator grid grid-cols-1 items-start gap-6 border-t py-4.5 sm:grid-cols-[180px_1fr]">
      <div>
        <p className="text-sm font-semibold">{intl.formatMessage(messages.label)}</p>
        <p className="text-muted mt-0.5 text-xs leading-snug">{intl.formatMessage(messages.desc)}</p>
      </div>
      <div>
        <div
          role="radiogroup"
          aria-label={intl.formatMessage(messages.label)}
          className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
        >
          {options.map(({ value, name, desc, glyph }) => {
            const isActive = mode === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => onModeChange(value)}
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
                  {glyph}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{name}</span>
                  <span className="text-muted mt-0.5 block text-[11px]">{desc}</span>
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
        <div
          style={{
            maxHeight: chordSelected ? 60 : 0,
            opacity: chordSelected ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.3s ease, opacity 0.25s ease",
            marginTop: chordSelected ? 12 : 0,
            pointerEvents: chordSelected ? "auto" : "none",
          }}
        >
          <div
            role="radiogroup"
            aria-label={intl.formatMessage(messages.chordPoolLabel)}
            className="border-border bg-surface-secondary grid grid-cols-2 gap-1 overflow-hidden rounded-xl border p-1"
          >
            {pools.map(({ value, label }) => {
              const isActive = chordPool === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={chordSelected ? 0 : -1}
                  onClick={() => onChordPoolChange(value)}
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
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
