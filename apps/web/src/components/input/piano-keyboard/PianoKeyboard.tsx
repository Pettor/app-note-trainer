import type { CSSProperties, PointerEvent, ReactElement } from "react";
import { useState } from "react";
import { useMediaQuery } from "@package/react";
import clsx from "clsx";
import { defineMessages, useIntl } from "react-intl";
import type { BlackKeyData, PianoKeyData, WhiteKeyData } from "./UsePianoKeyboard";
import { usePianoKeyboard } from "./UsePianoKeyboard";

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

function keyTestId(label: string): string {
  return `piano-keyboard__key-${label.replace("#", "sharp").toLowerCase()}`;
}

function getWhiteKeyStyle(isActive: boolean, isHighlighted: boolean): CSSProperties {
  if (isHighlighted) {
    return {
      background: "linear-gradient(180deg, oklch(0.92 0.10 285) 0%, oklch(0.78 0.18 285) 100%)",
      boxShadow:
        "inset 0 -3px 0 oklch(0.55 0.22 285 / .35), inset 0 0 0 1px oklch(0.55 0.22 285 / .5), 0 0 18px oklch(0.55 0.22 285 / .3)",
      color: "white",
    };
  }
  if (isActive) {
    return {
      background: "linear-gradient(180deg, oklch(0.88 0.12 285) 0%, oklch(0.72 0.18 285) 100%)",
      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.18), inset 0 -1px 0 rgba(0,0,0,0.05)",
    };
  }
  return {
    background: "linear-gradient(180deg, #fefefe 0%, #f3f1ef 92%, #e5e3df 100%)",
    boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.06), inset 0 1px 0 #ffffff",
  };
}

function getBlackKeyStyle(isActive: boolean, isHighlighted: boolean): CSSProperties {
  if (isHighlighted) {
    return {
      background: "linear-gradient(180deg, oklch(0.55 0.22 285) 0%, oklch(0.40 0.22 285) 100%)",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.28), 0 0 18px oklch(0.55 0.22 285 / .5), 0 6px 10px -2px rgba(0,0,0,0.5)",
    };
  }
  if (isActive) {
    return {
      background: "linear-gradient(180deg, #1e1b2e 0%, #0c0a14 100%)",
      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
    };
  }
  return {
    background: "linear-gradient(180deg, #2a2733 0%, #15131e 80%, #0c0a14 100%)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -3px 0 rgba(0,0,0,0.4), 0 6px 8px -2px rgba(0,0,0,0.4)",
  };
}

interface WhiteKeyProps {
  keyData: WhiteKeyData;
  isActive: boolean;
  isHighlighted: boolean;
  ariaLabel: string;
  onPointerDown: () => void;
  onPointerUp: () => void;
  onPointerLeave: () => void;
}

function WhiteKey({
  keyData,
  isActive,
  isHighlighted,
  ariaLabel,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: WhiteKeyProps): ReactElement {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isActive}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      data-testid={keyTestId(keyData.label)}
      data-highlighted={isHighlighted ? true : undefined}
      className="relative flex-1 cursor-pointer touch-none rounded-b-[5px] outline-none select-none focus-visible:ring-2 focus-visible:ring-inset active:scale-[0.99]"
      style={getWhiteKeyStyle(isActive, isHighlighted)}
    >
      <span
        className="absolute right-0 bottom-1.5 left-0 hidden text-center text-[10px] font-medium tracking-tight sm:block"
        style={{ color: "oklch(0.60 0.008 285)" }}
        aria-hidden="true"
      >
        {keyData.note === "C" ? keyData.label : keyData.note}
      </span>
    </button>
  );
}

interface BlackKeyProps {
  keyData: BlackKeyData;
  isActive: boolean;
  isHighlighted: boolean;
  ariaLabel: string;
  blackKeyHeightPercent: number;
  onPointerDown: (e: PointerEvent<HTMLButtonElement>) => void;
  onPointerUp: () => void;
  onPointerLeave: () => void;
}

function BlackKey({
  keyData,
  isActive,
  isHighlighted,
  ariaLabel,
  blackKeyHeightPercent,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: BlackKeyProps): ReactElement {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isActive}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      data-testid={keyTestId(keyData.label)}
      data-highlighted={isHighlighted ? true : undefined}
      className="absolute top-0 z-10 cursor-pointer touch-none rounded-b-lg outline-none select-none focus-visible:ring-2 focus-visible:ring-blue-400"
      style={{
        left: `${keyData.leftPercent}%`,
        width: `${keyData.widthPercent}%`,
        height: `${blackKeyHeightPercent}%`,
        ...getBlackKeyStyle(isActive, isHighlighted),
      }}
    />
  );
}

export interface PianoKeyboardProps {
  onKeyPress: (key: PianoKeyData) => void;
  /** Highlight a specific key, e.g. "C4" or "F#5" */
  highlightedKey?: string;
  className?: string;
}

export function PianoKeyboard({ onKeyPress, highlightedKey, className }: PianoKeyboardProps): ReactElement {
  const intl = useIntl();
  const isPhone = useMediaQuery("(max-width: 639px)");
  // Short viewports (landscape phones ~375px tall) — contract to 1 octave and a smaller frame
  const isCompact = useMediaQuery("(max-height: 430px)");
  // Compact: 1 octave (C4–B4). Phone portrait: 1.5 octaves (C4–F5). Desktop: 2 full octaves.
  const { whiteKeys, blackKeys, blackKeyHeightPercent } = usePianoKeyboard(
    4,
    isCompact ? 1 : 2,
    !isCompact && isPhone ? "F5" : undefined
  );
  const [activeKey, setActiveKey] = useState<string | null>(null);

  function handlePointerDown(key: PianoKeyData): void {
    setActiveKey(key.label);
    onKeyPress(key);
  }

  function handlePointerUp(): void {
    setActiveKey(null);
  }

  function handlePointerLeave(): void {
    setActiveKey(null);
  }

  return (
    <div
      className={clsx("select-none", className)}
      role="group"
      aria-label={intl.formatMessage(messages.keyboardLabel)}
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
          <div className={clsx("relative", isCompact ? "h-12" : isPhone ? "h-22.5 min-w-70" : "h-35 min-w-70")}>
            {/* White keys */}
            <div className="absolute inset-0 flex" style={{ gap: 1 }}>
              {whiteKeys.map((key) => (
                <WhiteKey
                  key={key.label}
                  keyData={key}
                  isActive={activeKey === key.label}
                  isHighlighted={highlightedKey === key.label}
                  ariaLabel={intl.formatMessage(messages.keyLabel, { note: formatNoteAriaLabel(key) })}
                  onPointerDown={() => handlePointerDown(key)}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerLeave}
                />
              ))}
            </div>
            {/* Black keys */}
            {blackKeys.map((key) => (
              <BlackKey
                key={key.label}
                keyData={key}
                isActive={activeKey === key.label}
                isHighlighted={highlightedKey === key.label}
                ariaLabel={intl.formatMessage(messages.keyLabel, { note: formatNoteAriaLabel(key) })}
                blackKeyHeightPercent={blackKeyHeightPercent}
                onPointerDown={(e) => {
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
