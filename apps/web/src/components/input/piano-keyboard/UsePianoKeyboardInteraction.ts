import { useState } from "react";
import type { PianoKeyData } from "./UsePianoKeyboard";

export interface PianoKeyboardInteraction {
  activeKey: string | null;
  handlePointerDown: (key: PianoKeyData) => void;
  handlePointerUp: () => void;
  handlePointerLeave: () => void;
}

export function usePianoKeyboardInteraction(onKeyPress: (key: PianoKeyData) => void): PianoKeyboardInteraction {
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

  return { activeKey, handlePointerDown, handlePointerUp, handlePointerLeave };
}
