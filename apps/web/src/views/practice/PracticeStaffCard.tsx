import type { ReactElement } from "react";
import clsx from "clsx";
import { defineMessages, useIntl } from "react-intl";
import { SheetMusicStaff } from "~/components/display/sheet-music-staff/SheetMusicStaff";
import type { StaffNoteData } from "~/components/display/sheet-music-staff/UseSheetMusicStaff";
import type { Staff } from "~/core/practice-settings/PracticeSettings";
import { useViewport } from "~/core/UseViewport";

const messages = defineMessages({
  trebleClef: {
    id: "lDNEod",
    description: "PracticeStaffCard: treble clef label",
    defaultMessage: "Treble",
  },
  bassClef: {
    id: "/GAh2Q",
    description: "PracticeStaffCard: bass clef label",
    defaultMessage: "Bass",
  },
  clefLabel: {
    id: "4EACmJ",
    description: "PracticeStaffCard: clef header label, e.g. 'Treble clef'",
    defaultMessage: "{name} clef",
  },
  keyOfLabel: {
    id: "eORmmz",
    description: "PracticeStaffCard: key signature label",
    defaultMessage: "Key of {key}",
  },
  identifyPrompt: {
    id: "K2MG7W",
    description: "PracticeStaffCard: tap-prompt below staff when waiting for input",
    defaultMessage: "Identify the note · tap the matching key",
  },
  countdownPrompt: {
    id: "9sFMOr",
    description: "PracticeStaffCard: prompt shown during countdown",
    defaultMessage: "Get ready — study the key signature",
  },
});

export interface PracticeStaffCardProps {
  staff: Staff;
  keyName: string;
  note?: StaffNoteData | null;
  countdown?: number | null;
  minSlot?: number;
  maxSlot?: number;
}

export function PracticeStaffCard({
  staff,
  keyName,
  note,
  countdown,
  minSlot,
  maxSlot,
}: PracticeStaffCardProps): ReactElement {
  const intl = useIntl();
  const { isCompact } = useViewport();

  const clefName = intl.formatMessage(staff === "treble" ? messages.trebleClef : messages.bassClef);
  const hasCountdown = countdown != null;

  return (
    <section
      className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px] sm:rounded-3xl"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 6px 16px rgba(15,12,30,0.05), 0 16px 40px rgba(15,12,30,0.04)",
      }}
    >
      {/* Paper-like gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 110%, color-mix(in oklab, var(--accent) 6%, transparent), transparent 70%),
            linear-gradient(180deg, var(--surface) 0%, color-mix(in oklab, var(--background) 30%, var(--surface)) 100%)
          `,
        }}
      />

      {/* Header strip */}
      <div
        className={clsx(
          "relative flex items-center justify-between pb-0",
          isCompact ? "px-3 pt-2" : "px-4 pt-3.5 sm:px-6 sm:pt-5"
        )}
        style={{ zIndex: 1 }}
      >
        <span className="text-muted flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase sm:text-[11px]">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: "var(--brand-gradient)" }}
            aria-hidden="true"
          />
          {intl.formatMessage(messages.clefLabel, { name: clefName })}
        </span>
        <span className="text-muted text-[10px] font-semibold tracking-[0.14em] sm:text-[11px]" tabular-nums="true">
          {intl.formatMessage(messages.keyOfLabel, { key: keyName })}
        </span>
      </div>

      {/* Staff */}
      <div
        className={clsx(
          "relative flex min-h-0 flex-1 items-center justify-center overflow-hidden",
          isCompact ? "px-3 py-1" : "px-3 py-2 sm:px-6 sm:py-4"
        )}
        style={{ zIndex: 1 }}
      >
        <SheetMusicStaff
          staff={staff}
          notes={note ? [note] : undefined}
          minSlot={minSlot}
          maxSlot={maxSlot}
          className="w-full max-w-2xl"
        />
      </div>

      {/* Tap prompt */}
      <div
        className={clsx(
          "text-muted relative text-center font-mono text-[10px]",
          isCompact ? "pb-1.5" : "pb-3.5 sm:pb-5 sm:text-xs"
        )}
        style={{ zIndex: 1 }}
      >
        {hasCountdown ? intl.formatMessage(messages.countdownPrompt) : intl.formatMessage(messages.identifyPrompt)}
      </div>

      {/* Countdown overlay */}
      {hasCountdown && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 5 }}
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="relative h-50 w-50">
            {/* Pulse ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid color-mix(in oklab, var(--accent) 40%, transparent)",
                animation: "practice-pulse 1.6s ease-out infinite",
              }}
            />
            {/* Gradient glow */}
            <div
              className="absolute"
              style={{
                inset: 30,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 20%, transparent), transparent 70%)",
              }}
            />
            {/* Countdown number */}
            <div
              className="absolute inset-0 flex items-center justify-center text-[92px] leading-none font-extrabold tabular-nums"
              style={{
                background: "var(--brand-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.05em",
              }}
            >
              {countdown === 0 ? "GO" : String(countdown)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
