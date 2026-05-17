import type { CSSProperties, PointerEvent, ReactElement } from "react";
import type { KeyTone } from "./PianoKeyboardWhiteKey";
import type { BlackKeyData } from "./UsePianoKeyboard";

function getStyle(isActive: boolean, isHighlighted: boolean, tone?: KeyTone): CSSProperties {
  if (tone === "correct") {
    return {
      background: "linear-gradient(180deg, oklch(0.55 0.22 160) 0%, oklch(0.40 0.22 160) 100%)",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.28), 0 0 18px oklch(0.55 0.22 160 / .5), 0 6px 10px -2px rgba(0,0,0,0.5)",
    };
  }
  if (tone === "wrong") {
    return {
      background: "linear-gradient(180deg, oklch(0.55 0.22 25) 0%, oklch(0.40 0.22 25) 100%)",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.28), 0 0 18px oklch(0.55 0.22 25 / .5), 0 6px 10px -2px rgba(0,0,0,0.5)",
    };
  }
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

export interface PianoKeyboardBlackKeyProps {
  keyData: BlackKeyData;
  isActive: boolean;
  isHighlighted: boolean;
  tone?: KeyTone;
  ariaLabel: string;
  blackKeyHeightPercent: number;
  onPointerDown: (e: PointerEvent<HTMLButtonElement>) => void;
  onPointerUp: () => void;
  onPointerLeave: () => void;
}

export function PianoKeyboardBlackKey({
  keyData,
  isActive,
  isHighlighted,
  tone,
  ariaLabel,
  blackKeyHeightPercent,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: PianoKeyboardBlackKeyProps): ReactElement {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isActive}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      data-testid={`piano-keyboard__key-${keyData.label.replace("#", "sharp").toLowerCase()}`}
      data-highlighted={isHighlighted ? true : undefined}
      className="absolute top-0 z-10 cursor-pointer touch-none rounded-b-lg outline-none select-none focus-visible:ring-2 focus-visible:ring-blue-400"
      style={{
        left: `${keyData.leftPercent}%`,
        width: `${keyData.widthPercent}%`,
        height: `${blackKeyHeightPercent}%`,
        ...getStyle(isActive, isHighlighted, tone),
      }}
    />
  );
}
