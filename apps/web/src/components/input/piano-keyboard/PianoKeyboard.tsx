import type { PointerEvent, ReactElement } from "react";
import clsx from "clsx";
import { defineMessages, useIntl } from "react-intl";
import { PianoKeyboardBlackKey } from "./PianoKeyboardBlackKey";
import { PianoKeyboardWhiteKey } from "./PianoKeyboardWhiteKey";
import type { PianoKeyData } from "./UsePianoKeyboard";
import { usePianoKeyboard } from "./UsePianoKeyboard";
import { usePianoKeyboardInteraction } from "./UsePianoKeyboardInteraction";
import { useViewport } from "~/core/UseViewport";

const messages = defineMessages({
  keyboardLabel: {
    id: "Zr5kRJ",
    description: "PianoKeyboard: aria-label for the piano keyboard container",
    defaultMessage: "Piano keyboard",
  },
  keyLabel: {
    id: "opqMR4",
    description: "PianoKeyboard: aria-label for an individual key, {note} e.g. 'C4' or 'C sharp 4'",
    defaultMessage: "{note} key",
  },
});

function formatNoteAriaLabel(key: PianoKeyData): string {
  return `${key.note.replace("#", " sharp")} ${key.octave}`;
}

export interface PianoKeyboardProps {
  onKeyPress?: (key: PianoKeyData) => void;
  /** Highlight a specific key in the brand colour, e.g. "C4" or "F#5" */
  highlightedKey?: string;
  /** Highlight the correct key in green (used in the score miss-review view) */
  correctKey?: string;
  /** Highlight the wrong key in red (used in the score miss-review view) */
  wrongKey?: string;
  /** When true, pointer events are disabled — keyboard is display-only */
  readonly?: boolean;
  className?: string;
}

export function PianoKeyboard({
  onKeyPress,
  highlightedKey,
  correctKey,
  wrongKey,
  readonly: isReadonly = false,
  className,
}: PianoKeyboardProps): ReactElement {
  const intl = useIntl();
  const { isPhone, isCompact, isMinimal } = useViewport();
  // Narrow/compact viewports: 1 octave (C4–B4). Desktop: 2 full octaves.
  const { whiteKeys, blackKeys, blackKeyHeightPercent } = usePianoKeyboard(4, isCompact || isPhone ? 1 : 2);
  const { activeKey, handlePointerDown, handlePointerUp, handlePointerLeave } = usePianoKeyboardInteraction(
    onKeyPress ?? (() => {})
  );

  const keyboardSize = isMinimal ? "h-12" : isCompact ? "h-30" : isPhone ? "h-22.5" : "h-35 min-w-70";

  return (
    <div
      className={clsx("select-none", className)}
      role="group"
      aria-label={intl.formatMessage(messages.keyboardLabel)}
      style={isReadonly ? { pointerEvents: "none" } : undefined}
    >
      <div
        className={clsx("relative overflow-hidden rounded-xl", isCompact ? "p-1.5" : "p-2 sm:p-3")}
        style={{
          background: "linear-gradient(180deg, #1a1726 0%, #0c0a14 100%)",
          boxShadow:
            "0 20px 40px -20px rgba(15,12,30,0.4), 0 2px 0 rgba(255,255,255,0.04) inset, inset 0 1px 0 rgba(255,255,255,0.08)",
          border: "1px solid oklch(0.30 0.04 285)",
        }}
      >
        {/* Brand-gradient hairline at top */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-4 left-4 h-0.5 rounded-full opacity-50"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--brand-grad-1), var(--brand-grad-2), var(--brand-grad-3), transparent)",
          }}
        />
        <div className="overflow-x-auto">
          <div className={clsx("relative", keyboardSize)}>
            {/* White keys */}
            <div className="absolute inset-0 flex" style={{ gap: 1 }}>
              {whiteKeys.map((key) => (
                <PianoKeyboardWhiteKey
                  key={key.label}
                  keyData={key}
                  isActive={activeKey === key.label}
                  isHighlighted={highlightedKey === key.label}
                  tone={correctKey === key.label ? "correct" : wrongKey === key.label ? "wrong" : undefined}
                  ariaLabel={intl.formatMessage(messages.keyLabel, { note: formatNoteAriaLabel(key) })}
                  onPointerDown={() => handlePointerDown(key)}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerLeave}
                />
              ))}
            </div>
            {/* Black keys */}
            {blackKeys.map((key) => (
              <PianoKeyboardBlackKey
                key={key.label}
                keyData={key}
                isActive={activeKey === key.label}
                isHighlighted={highlightedKey === key.label}
                tone={correctKey === key.label ? "correct" : wrongKey === key.label ? "wrong" : undefined}
                ariaLabel={intl.formatMessage(messages.keyLabel, { note: formatNoteAriaLabel(key) })}
                blackKeyHeightPercent={blackKeyHeightPercent}
                onPointerDown={(e: PointerEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  handlePointerDown(key);
                }}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
