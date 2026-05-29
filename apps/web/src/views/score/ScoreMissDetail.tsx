import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";
import { ScoreMiniKeyboard } from "./ScoreMiniKeyboard";
import { SheetMusicStaff } from "~/components/display/sheet-music-staff/SheetMusicStaff";
import type { StaffNoteData } from "~/components/display/sheet-music-staff/UseSheetMusicStaff";
import type { PianoNote } from "~/components/input/piano-keyboard/UsePianoKeyboard";
import type { MissRecord } from "~/core/game/GameLoop";
import type { NoteStep } from "~/core/game/MusicNote";
import type { KeySignatureInfo } from "~/core/game/MusicScale";
import type { Staff } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  reviewingMiss: {
    id: "nPKdAm",
    description: "ScoreMissDetail: eyebrow label",
    defaultMessage: "Reviewing miss",
  },
  vs: {
    id: "dG3smU",
    description: "ScoreMissDetail: 'vs' separator between correct and guessed note",
    defaultMessage: "vs",
  },
  took: {
    id: "43r0OR",
    description: "ScoreMissDetail: time label",
    defaultMessage: "Took",
  },
  timedOut: {
    id: "fkq8y8",
    description: "ScoreMissDetail: label when note timed out",
    defaultMessage: "Timed out",
  },
  correctKey: {
    id: "JygkkC",
    description: "ScoreMissDetail: legend label for correct key",
    defaultMessage: "Correct key",
  },
  youPlayed: {
    id: "jAItud",
    description: "ScoreMissDetail: legend label for wrong key",
    defaultMessage: "What you played",
  },
});

// Sharp/flat step order (circle of fifths) for determining explicit naturals
const SHARP_STEPS: NoteStep[] = ["F", "C", "G", "D", "A", "E", "B"];
const FLAT_STEPS: NoteStep[] = ["B", "E", "A", "D", "G", "C", "F"];

function isStepInKeySignature(step: NoteStep, keySignature: KeySignatureInfo): boolean {
  const steps = keySignature.type === "sharp" ? SHARP_STEPS : FLAT_STEPS;
  return steps.slice(0, keySignature.count).includes(step);
}

// Flat steps map to their sharp enharmonic for piano keyboard highlighting
const FLAT_TO_PIANO: Partial<Record<NoteStep, PianoNote>> = {
  B: "A#",
  E: "D#",
  A: "G#",
  D: "C#",
  G: "F#",
  C: "B",
  F: "E",
};

function formatCorrectNote(miss: MissRecord, keySignature: KeySignatureInfo): string {
  if (miss.correctAccidental === "sharp") return `${miss.correctStep}#`;
  if (miss.correctAccidental === "flat") return `${miss.correctStep}b`;
  if (isStepInKeySignature(miss.correctStep, keySignature)) return `${miss.correctStep}♮`;
  return miss.correctStep;
}

function toStaffNote(miss: MissRecord, keySignature: KeySignatureInfo): StaffNoteData {
  let accidental: StaffNoteData["accidental"];
  if (miss.correctAccidental === "sharp") accidental = "sharp";
  else if (miss.correctAccidental === "flat") accidental = "flat";
  else if (isStepInKeySignature(miss.correctStep, keySignature)) accidental = "natural";
  return { slot: miss.slot, type: "quarter", active: false, accidental };
}

function correctPianoNote(miss: MissRecord): PianoNote {
  if (miss.correctAccidental === "sharp") return `${miss.correctStep}#` as PianoNote;
  if (miss.correctAccidental === "flat") return FLAT_TO_PIANO[miss.correctStep] ?? (miss.correctStep as PianoNote);
  return miss.correctStep as PianoNote;
}

export interface ScoreMissDetailProps {
  miss: MissRecord;
  staff: Staff;
  keyName: string;
  keySignature: KeySignatureInfo;
  isMobile?: boolean;
}

export function ScoreMissDetail({ miss, staff, keySignature, isMobile }: ScoreMissDetailProps): ReactElement {
  const intl = useIntl();
  const correctLabel = formatCorrectNote(miss, keySignature);
  const guessLabel = miss.guessNote ? miss.guessNote : intl.formatMessage(messages.timedOut);

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
          notes={[toStaffNote(miss, keySignature)]}
          keySignature={keySignature}
          className={isMobile ? "w-full max-w-xs" : "w-full max-w-md"}
        />
      </div>

      {/* Keyboard + legend */}
      <div className="flex flex-col items-center gap-2">
        <ScoreMiniKeyboard correctNote={correctPianoNote(miss)} wrongNote={miss.guessNote} />
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
