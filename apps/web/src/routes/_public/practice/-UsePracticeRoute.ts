import { useNavigate } from "@tanstack/react-router";
import { useGameLoop } from "~/core/game/UseGameLoop";
import { usePracticeSettings } from "~/core/practice-settings/UsePracticeSettings";
import type { PracticeViewProps } from "~/views/practice/PracticeView";

export function usePracticeRoute(): PracticeViewProps {
  const { settings } = usePracticeSettings();
  const navigate = useNavigate();
  const game = useGameLoop(settings);

  function onExit(): void {
    void navigate({ to: "/home" });
  }

  return {
    settings,
    onKeyPress: game.onKeyPress,
    onPause: game.onPause,
    onExit,
    isPaused: game.phase === "paused",
    isFinished: game.phase === "finished",
    onFinish: onExit,
    keyName: game.keyName,
    scaleType: game.scaleType,
    remaining: game.noteSecondsRemaining,
    notesCompleted: game.notesCompleted,
    totalNotes: game.totalNotes,
    correctCount: game.correctCount,
    wrongCount: game.wrongCount,
    countdown: game.countdown,
    currentNote: game.currentNote,
  };
}
