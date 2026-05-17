import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";
import { ScoreMiniKeyboard } from "./ScoreMiniKeyboard";
import { SheetMusicStaff } from "~/components/display/sheet-music-staff/SheetMusicStaff";
import type { MissRecord } from "~/core/game/GameLoop";
import type { PianoNote } from "~/components/input/piano-keyboard/UsePianoKeyboard";
import type { Staff } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  reviewingMiss: {
    id: "score.missDetail.reviewing",
    description: "ScoreMissDetail: eyebrow label",
    defaultMessage: "Reviewing miss",
  },
  vs: {
    id: "score.missDetail.vs",
    description: "ScoreMissDetail: 'vs' separator between correct and guessed note",
    defaultMessage: "vs",
  },
  took: {
    id: "score.missDetail.took",
    description: "ScoreMissDetail: time label",
    defaultMessage: "Took",
  },
  timedOut: {
    id: "score.missDetail.timedOut",
    description: "ScoreMissDetail: label when note timed out",
    defaultMessage: "Timed out",
  },
  correctKey: {
    id: "score.missDetail.correctKey",
    description: "ScoreMissDetail: legend label for correct key",
    defaultMessage: "Correct key",
  },
  youPlayed: {
    id: "score.missDetail.youPlayed",
    description: "ScoreMissDetail: legend label for wrong key",
    defaultMessage: "What you played",
  },
});

function formatCorrectNote(miss: MissRecord): string {
  const acc = miss.correctAccidental === "sharp" ? "#" : "";
  return `${miss.correctStep}${acc}${miss.correctOctave}`;
}

function toStaffNote(miss: MissRecord) {
  return {
    slot: miss.slot,
    type: "quarter" as const,
    active: false,
    accidental: miss.correctAccidental === "sharp" ? ("sharp" as const) : undefined,
  };
}

function correctPianoNote(miss: MissRecord): PianoNote {
  const acc = miss.correctAccidental === "sharp" ? "#" : "";
  return `${miss.correctStep}${acc}` as PianoNote;
}

export interface ScoreMissDetailProps {
  miss: MissRecord;
  staff: Staff;
  keyName: string;
  isMobile?: boolean;
}

export function ScoreMissDetail({ miss, staff, keyName, isMobile }: ScoreMissDetailProps): ReactElement {
  const intl = useIntl();
  const correctLabel = formatCorrectNote(miss);
  const guessLabel = miss.guessNote ? `${miss.guessNote}${miss.guessOctave}` : intl.formatMessage(messages.timedOut);

  return (
    <div
      className="flex min-w-0 flex-1 flex-col gap-4 rounded-2xl p-4 sm:rounded-3xl sm:p-5"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold tracking-[0.2em] uppercase" style={{ fontSize: 10, color: "var(--muted)" }}>
            {intl.formatMessage(messages.reviewingMiss)}
          </p>
          <div className="mt-1 flex items-center gap-2 leading-tight font-bold" style={{ fontSize: 18 }}>
            <span
              style={{
                background: "var(--brand-gradient)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {correctLabel}
            </span>
            <span style={{ color: "var(--muted)", fontWeight: 500, fontSize: 14 }}>
              {intl.formatMessage(messages.vs)}
            </span>
            <span style={{ color: "var(--danger)" }}>{guessLabel}</span>
          </div>
        </div>
        <div
          className="shrink-0 rounded-full px-2.5 py-1.5 font-semibold"
          style={{
            fontSize: 11,
            color: "var(--muted)",
            background: "var(--surface-secondary)",
            border: "1px solid var(--border)",
            whiteSpace: "nowrap",
          }}
        >
          {intl.formatMessage(messages.took)}{" "}
          <span className="text-foreground font-bold tabular-nums">{miss.timeTaken.toFixed(1)}s</span>
        </div>
      </div>

      {/* Staff */}
      <div
        className="flex justify-center rounded-xl p-3"
        style={{
          background: "var(--surface-secondary)",
          border: "1px solid var(--border)",
        }}
      >
        <SheetMusicStaff
          staff={staff}
          notes={[toStaffNote(miss)]}
          className={isMobile ? "w-full max-w-xs" : "w-full max-w-md"}
        />
      </div>

      {/* Keyboard + legend */}
      <div className="flex flex-col items-center gap-2">
        <ScoreMiniKeyboard
          correctNote={correctPianoNote(miss)}
          correctOctave={miss.correctOctave}
          wrongNote={miss.guessNote}
          wrongOctave={miss.guessOctave}
        />
        <div className="flex gap-5" style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600 }}>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block rounded-sm"
              style={{
                width: 10,
                height: 10,
                background: "oklch(0.72 0.16 160)",
                border: "1px solid oklch(0.55 0.20 160 / 0.5)",
              }}
            />
            {intl.formatMessage(messages.correctKey)}
          </span>
          {miss.guessNote && (
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block rounded-sm"
                style={{
                  width: 10,
                  height: 10,
                  background: "oklch(0.70 0.18 25)",
                  border: "1px solid oklch(0.55 0.235 25 / 0.5)",
                }}
              />
              {intl.formatMessage(messages.youPlayed)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
