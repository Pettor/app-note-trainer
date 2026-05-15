import { useEffect, useReducer } from "react";
import { createInitialState, gameReducer } from "./GameLoop";
import type { GamePhase } from "./GameLoop";
import { scaleDisplayName } from "./MusicScale";
import type { StaffNoteData } from "~/components/display/sheet-music-staff/UseSheetMusicStaff";
import type { PianoKeyData } from "~/components/input/piano-keyboard/UsePianoKeyboard";
import type { PracticeSettings } from "~/core/practice-settings/PracticeSettings";

const TOTAL_NOTES = 25;
const COUNTDOWN_INTERVAL_MS = 1000;
const TIMER_TICK_MS = 100;
const TIMER_TICK_DELTA = TIMER_TICK_MS / 1000;

export interface UseGameLoopResult {
  phase: GamePhase;
  countdown: number | null;
  currentNote: StaffNoteData | null;
  notesCompleted: number;
  totalNotes: number;
  correctCount: number;
  wrongCount: number;
  noteSecondsRemaining: number;
  keyName: string;
  scaleType: string;
  onKeyPress: (key: PianoKeyData) => void;
  onPause: () => void;
}

export function useGameLoop(settings: PracticeSettings): UseGameLoopResult {
  const [state, dispatch] = useReducer(gameReducer, undefined, () => createInitialState(settings));

  // Countdown: tick every second until playing starts
  useEffect(() => {
    if (state.phase !== "countdown") return;
    const id = setInterval(() => {
      dispatch({ type: "COUNTDOWN_TICK" });
    }, COUNTDOWN_INTERVAL_MS);
    return () => clearInterval(id);
  }, [state.phase]);

  // Per-note timer: tick every 100ms while playing
  useEffect(() => {
    if (!settings.timerEnabled || state.phase !== "playing") return;
    const id = setInterval(() => {
      dispatch({ type: "NOTE_TIMER_TICK", delta: TIMER_TICK_DELTA });
    }, TIMER_TICK_MS);
    return () => clearInterval(id);
  }, [settings.timerEnabled, state.phase]);

  // Trigger timeout when seconds remaining hits zero
  useEffect(() => {
    if (!settings.timerEnabled || state.phase !== "playing") return;
    if (state.noteSecondsRemaining <= 0) {
      dispatch({ type: "NOTE_TIMEOUT", noteDuration: settings.duration });
    }
  }, [settings.timerEnabled, settings.duration, state.phase, state.noteSecondsRemaining]);

  const currentGameNote = state.noteQueue[state.currentNoteIndex];
  const currentNote: StaffNoteData | null =
    state.phase === "playing" && currentGameNote
      ? {
          slot: currentGameNote.slot,
          type: "quarter",
          active: true,
          accidental: currentGameNote.pitch.accidental === "sharp" ? "sharp" : undefined,
        }
      : null;

  const { keyName, scaleType } = scaleDisplayName(state.scale);

  function onKeyPress(key: PianoKeyData): void {
    dispatch({ type: "KEY_PRESS", key, timerEnabled: settings.timerEnabled, noteDuration: settings.duration });
  }

  function onPause(): void {
    if (state.phase === "playing") {
      dispatch({ type: "PAUSE" });
    } else if (state.phase === "paused") {
      dispatch({ type: "RESUME" });
    }
  }

  return {
    phase: state.phase,
    countdown: state.countdown,
    currentNote,
    notesCompleted: Math.min(state.currentNoteIndex, TOTAL_NOTES),
    totalNotes: TOTAL_NOTES,
    correctCount: state.correctCount,
    wrongCount: state.wrongCount,
    noteSecondsRemaining: state.noteSecondsRemaining,
    keyName,
    scaleType,
    onKeyPress,
    onPause,
  };
}
