import { useEffect, useReducer, useRef } from "react";
import { createInitialState, gameReducer } from "./GameLoop";
import type { GamePhase, MissRecord } from "./GameLoop";
import { matchesPianoKey } from "./MusicNote";
import { getKeySignature, scaleDisplayName } from "./MusicScale";
import type { KeySignatureInfo } from "./MusicScale";
import type { StaffNoteData } from "~/components/display/sheet-music-staff/UseSheetMusicStaff";
import type { PianoKeyData } from "~/components/input/piano-keyboard/UsePianoKeyboard";
import type { Duration, PracticeSettings } from "~/core/practice-settings/PracticeSettings";

const COUNTDOWN_INTERVAL_MS = 1000;
// 1-second per-note timer when running under VITE_E2E_MODE so timeout tests finish fast.
const E2E_TIMER_DURATION = 1 as Duration;
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
  keySignature: KeySignatureInfo;
  misses: MissRecord[];
  totalTime: number;
  fastestCorrect: number;
  onKeyPress: (key: PianoKeyData) => void;
  onPause: () => void;
}

export function useGameLoop(settings: PracticeSettings): UseGameLoopResult {
  const noteDuration: Duration = import.meta.env.VITE_E2E_MODE === "true" ? E2E_TIMER_DURATION : settings.duration;
  const [state, dispatch] = useReducer(gameReducer, undefined, () =>
    createInitialState({ ...settings, duration: noteDuration })
  );

  const noteStartMs = useRef<number>(Date.now());
  const gameStartMs = useRef<number | null>(null);
  const gameTotalTimeSeconds = useRef<number>(0);
  const fastestCorrectSeconds = useRef<number>(Infinity);

  // Countdown: tick every second until playing starts
  useEffect(() => {
    if (state.phase !== "countdown") return;
    const id = setInterval(() => {
      dispatch({ type: "COUNTDOWN_TICK" });
    }, COUNTDOWN_INTERVAL_MS);
    return () => clearInterval(id);
  }, [state.phase]);

  // Track game start time when phase first becomes "playing"
  useEffect(() => {
    if (state.phase === "playing" && gameStartMs.current === null) {
      gameStartMs.current = Date.now();
      noteStartMs.current = Date.now();
    }
    if (state.phase === "finished" && gameStartMs.current !== null) {
      gameTotalTimeSeconds.current = (Date.now() - gameStartMs.current) / 1000;
    }
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
      const timeTaken = (Date.now() - noteStartMs.current) / 1000;
      noteStartMs.current = Date.now();
      dispatch({ type: "NOTE_TIMEOUT", noteDuration, timeTaken });
    }
  }, [settings.timerEnabled, noteDuration, state.phase, state.noteSecondsRemaining]);

  const currentGameNote = state.noteQueue[state.currentNoteIndex];
  const currentNote: StaffNoteData | null =
    state.phase === "playing" && currentGameNote
      ? {
          slot: currentGameNote.slot,
          type: "quarter",
          active: true,
          accidental:
            currentGameNote.pitch.accidental === "sharp"
              ? "sharp"
              : currentGameNote.pitch.accidental === "flat"
                ? "flat"
                : state.scale.sharpenedSteps.includes(currentGameNote.pitch.step) ||
                    state.scale.flattenedSteps.includes(currentGameNote.pitch.step)
                  ? "natural"
                  : undefined,
        }
      : null;

  const { keyName, scaleType } = scaleDisplayName(state.scale);
  const keySignature = getKeySignature(state.scale);

  function onKeyPress(key: PianoKeyData): void {
    const timeTaken = (Date.now() - noteStartMs.current) / 1000;
    noteStartMs.current = Date.now();

    const current = state.noteQueue[state.currentNoteIndex];
    if (current && matchesPianoKey(current.pitch, key) && timeTaken < fastestCorrectSeconds.current) {
      fastestCorrectSeconds.current = timeTaken;
    }

    dispatch({
      type: "KEY_PRESS",
      key,
      timerEnabled: settings.timerEnabled,
      noteDuration,
      timeTaken,
    });
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
    notesCompleted: Math.min(state.currentNoteIndex, state.noteQueue.length),
    totalNotes: state.noteQueue.length,
    correctCount: state.correctCount,
    wrongCount: state.wrongCount,
    noteSecondsRemaining: state.noteSecondsRemaining,
    keyName,
    scaleType,
    keySignature,
    misses: state.misses,
    totalTime: gameTotalTimeSeconds.current,
    fastestCorrect: fastestCorrectSeconds.current,
    onKeyPress,
    onPause,
  };
}
