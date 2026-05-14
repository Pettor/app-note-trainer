import type { CSSProperties, ReactElement } from "react";
import type { WhiteKeyData } from "./UsePianoKeyboard";

function getStyle(isActive: boolean, isHighlighted: boolean): CSSProperties {
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

export interface PianoKeyboardWhiteKeyProps {
  keyData: WhiteKeyData;
  isActive: boolean;
  isHighlighted: boolean;
  ariaLabel: string;
  onPointerDown: () => void;
  onPointerUp: () => void;
  onPointerLeave: () => void;
}

export function PianoKeyboardWhiteKey({
  keyData,
  isActive,
  isHighlighted,
  ariaLabel,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: PianoKeyboardWhiteKeyProps): ReactElement {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isActive}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      data-testid={`piano-keyboard__key-${keyData.label.toLowerCase()}`}
      data-highlighted={isHighlighted ? true : undefined}
      className="relative flex-1 cursor-pointer touch-none rounded-b-[5px] outline-none select-none focus-visible:ring-2 focus-visible:ring-inset active:scale-[0.99]"
      style={getStyle(isActive, isHighlighted)}
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
