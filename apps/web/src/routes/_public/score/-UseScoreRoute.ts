import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAtomValue, useSetAtom } from "jotai";
import { getSlotRange } from "~/core/game/NotePool";
import { scoreResultAtom } from "~/core/game/ScoreAtoms";
import { practiceSettingsAtom } from "~/core/practice-settings/PracticeSettingsAtoms";
import type { ScoreViewProps } from "~/views/score/ScoreView";

export function useScoreRoute(): ScoreViewProps | null {
  const result = useAtomValue(scoreResultAtom);
  const setScoreResult = useSetAtom(scoreResultAtom);
  const setPracticeSettings = useSetAtom(practiceSettingsAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!result) {
      void navigate({ to: "/home" });
    }
  }, [result, navigate]);

  function onExit(): void {
    setScoreResult(null);
    void navigate({ to: "/home" });
  }

  function onPlayAgain(): void {
    if (result) setPracticeSettings(result.settings);
    void navigate({ to: "/practice" });
  }

  if (!result) return null;

  const [minSlot, maxSlot] = getSlotRange(result.settings);

  return {
    staff: result.settings.staff,
    keyName: result.keyName,
    scaleType: result.scaleType,
    keySignature: result.keySignature,
    totalNotes: result.totalNotes,
    correctCount: result.correctCount,
    misses: result.misses,
    totalTime: result.totalTime,
    fastestCorrect: result.fastestCorrect,
    minSlot,
    maxSlot,
    onExit,
    onPlayAgain,
  };
}
