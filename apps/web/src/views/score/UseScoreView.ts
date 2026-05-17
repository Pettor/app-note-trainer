import { useState } from "react";

export interface UseScoreViewResult {
  selectedMissIndex: number;
  setSelectedMissIndex: (index: number) => void;
}

export function useScoreView(missCount: number): UseScoreViewResult {
  const [selectedMissIndex, setSelectedMissIndex] = useState(0);

  function handleSelect(index: number): void {
    if (index >= 0 && index < missCount) {
      setSelectedMissIndex(index);
    }
  }

  return { selectedMissIndex, setSelectedMissIndex: handleSelect };
}
