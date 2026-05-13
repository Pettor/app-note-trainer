import type { CSSProperties, PointerEvent, ReactElement } from "react";
import { useState } from "react";
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
      background: "linear-gradient(to bottom, #6ee7b7 0%, #a7f3d0 100%)",
      boxShadow: "inset 0 -3px 6px rgba(0,0,0,0.08)",
    };
  }
  if (isActive) {
    return {
      background: "linear-gradient(to bottom, #93c5fd 0%, #dbeafe 100%)",
      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08)",
    };
  }
  return {
    background: "linear-gradient(to bottom, #efefef 0%, #ffffff 18%)",
    boxShadow: "inset 0 -3px 6px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.1)",
  };
}

function getBlackKeyStyle(isActive: boolean, isHighlighted: boolean): CSSProperties {
  if (isHighlighted) {
    return {
      background: "linear-gradient(180deg, #10b981 0%, #059669 100%)",
      boxShadow: "0 3px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
    };
  }
  if (isActive) {
    return {
      background: "linear-gradient(180deg, #3b5bdb 0%, #1e3a8a 100%)",
      boxShadow: "0 2px 5px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
    };
  }
  return {
    background: "linear-gradient(180deg, #3f3f46 0%, #18181b 22%, #09090b 80%, #18181b 100%)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.14)",
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
      className="relative flex-1 cursor-pointer touch-none rounded-b-[5px] border-r border-zinc-300 outline-none select-none last:border-r-0 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset active:scale-[0.99]"
      style={getWhiteKeyStyle(isActive, isHighlighted)}
    >
      <span
        className="absolute right-0 bottom-1.5 left-0 hidden text-center text-[10px] font-medium tracking-tight text-zinc-400 sm:block"
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
      className="absolute top-0 z-10 cursor-pointer touch-none rounded-b-[4px] outline-none select-none focus-visible:ring-2 focus-visible:ring-blue-400"
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
  const { whiteKeys, blackKeys, blackKeyHeightPercent } = usePianoKeyboard();
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
        className="overflow-hidden rounded-xl p-2 sm:p-3"
        style={{
          background: "linear-gradient(180deg, #1c1c24 0%, #27272f 100%)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div className="overflow-x-auto">
          <div className="relative h-[90px] min-w-[280px] sm:h-[140px]">
            {/* White keys */}
            <div className="absolute inset-0 flex divide-x divide-zinc-200">
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
