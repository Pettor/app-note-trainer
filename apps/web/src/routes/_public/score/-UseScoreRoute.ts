import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAtomValue, useSetAtom } from "jotai";
import { scoreResultAtom } from "~/core/game/ScoreAtoms";
import type { ScoreViewProps } from "~/views/score/ScoreView";

export function useScoreRoute(): ScoreViewProps | null {
  const result = useAtomValue(scoreResultAtom);
  const setScoreResult = useSetAtom(scoreResultAtom);
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
    setScoreResult(null);
    void navigate({ to: "/practice" });
  }

  if (!result) return null;

  return {
    staff: result.staff,
    keyName: result.keyName,
    scaleType: result.scaleType,
    totalNotes: result.totalNotes,
    correctCount: result.correctCount,
    misses: result.misses,
    totalTime: result.totalTime,
    fastestCorrect: result.fastestCorrect,
    onExit,
    onPlayAgain,
  };
}
