import { useCallback, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { usePianoAudio } from "~/core/audio/UsePianoAudio";
import { scoreResultAtom } from "~/core/game/ScoreAtoms";
import { useGameLoop } from "~/core/game/UseGameLoop";
import { usePracticeSettings } from "~/core/practice-settings/UsePracticeSettings";
import type { PracticeViewProps } from "~/views/practice/PracticeView";

export function usePracticeRoute(): PracticeViewProps {
  const { settings } = usePracticeSettings();
  const navigate = useNavigate();
  const setScoreResult = useSetAtom(scoreResultAtom);
  const game = useGameLoop(settings);
  const { playNote } = usePianoAudio();
  const gameOnKeyPress = game.onKeyPress;

  useEffect(() => {
    if (game.phase !== "finished") return;
    setScoreResult({
      totalNotes: game.totalNotes,
      correctCount: game.correctCount,
      misses: game.misses,
      totalTime: game.totalTime,
      fastestCorrect: game.fastestCorrect,
      staff: settings.staff,
      keyName: game.keyName,
      scaleType: game.scaleType,
      keySignature: game.keySignature,
    });
    void navigate({ to: "/score" });
  }, [game.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const onKeyPress = useCallback<PracticeViewProps["onKeyPress"]>(
    (key) => {
      playNote(key.note, key.octave);
      gameOnKeyPress(key);
    },
    [gameOnKeyPress, playNote]
  );

  function onExit(): void {
    void navigate({ to: "/home" });
  }

  return {
    settings,
    onKeyPress,
    onPause: game.onPause,
    onExit,
    isPaused: game.phase === "paused",
    keyName: game.keyName,
    scaleType: game.scaleType,
    keySignature: game.keySignature,
    remaining: game.noteSecondsRemaining,
    notesCompleted: game.notesCompleted,
    totalNotes: game.totalNotes,
    correctCount: game.correctCount,
    wrongCount: game.wrongCount,
    countdown: game.countdown,
    currentNote: game.currentNote,
  };
}
