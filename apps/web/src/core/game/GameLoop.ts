import { matchesPianoKey } from "./MusicNote";
import type { Scale } from "./MusicScale";
import { pickRandomScale } from "./MusicScale";
import type { GameNote } from "./NotePool";
import { buildNoteQueue } from "./NotePool";
import type { PianoKeyData } from "~/components/input/piano-keyboard/UsePianoKeyboard";
import type { Duration, PracticeSettings } from "~/core/practice-settings/PracticeSettings";

export type GamePhase = "countdown" | "playing" | "paused" | "finished";

export interface GameState {
  phase: GamePhase;
  countdown: 3 | 2 | 1 | null;
  noteQueue: GameNote[];
  currentNoteIndex: number;
  correctCount: number;
  wrongCount: number;
  noteSecondsRemaining: number;
  scale: Scale;
}

export type GameAction =
  | { type: "COUNTDOWN_TICK" }
  | { type: "KEY_PRESS"; key: PianoKeyData; timerEnabled: boolean; noteDuration: Duration }
  | { type: "NOTE_TIMER_TICK"; delta: number }
  | { type: "NOTE_TIMEOUT"; noteDuration: Duration }
  | { type: "PAUSE" }
  | { type: "RESUME" };

export function createInitialState(settings: PracticeSettings): GameState {
  const scale = pickRandomScale(settings.sharps);
  const noteQueue = buildNoteQueue(settings, scale);
  return {
    phase: "countdown",
    countdown: 3,
    noteQueue,
    currentNoteIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    noteSecondsRemaining: settings.duration,
    scale,
  };
}

function advanceNote(state: GameState, noteDuration: number): GameState {
  const nextIndex = state.currentNoteIndex + 1;
  if (nextIndex >= state.noteQueue.length) {
    return { ...state, phase: "finished", currentNoteIndex: nextIndex };
  }
  return { ...state, currentNoteIndex: nextIndex, noteSecondsRemaining: noteDuration };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "COUNTDOWN_TICK": {
      if (state.phase !== "countdown") return state;
      if (state.countdown === null) return state;
      if (state.countdown === 1) {
        return { ...state, phase: "playing", countdown: null };
      }
      return { ...state, countdown: (state.countdown - 1) as 3 | 2 | 1 };
    }

    case "KEY_PRESS": {
      if (state.phase !== "playing") return state;
      const current = state.noteQueue[state.currentNoteIndex];
      if (!current) return state;
      const isCorrect = matchesPianoKey(current.pitch, action.key);
      const next = advanceNote(
        {
          ...state,
          correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
          wrongCount: isCorrect ? state.wrongCount : state.wrongCount + 1,
        },
        action.timerEnabled ? action.noteDuration : state.noteSecondsRemaining
      );
      return next;
    }

    case "NOTE_TIMER_TICK": {
      if (state.phase !== "playing") return state;
      return { ...state, noteSecondsRemaining: state.noteSecondsRemaining - action.delta };
    }

    case "NOTE_TIMEOUT": {
      if (state.phase !== "playing") return state;
      return advanceNote({ ...state, wrongCount: state.wrongCount + 1 }, action.noteDuration);
    }

    case "PAUSE": {
      if (state.phase !== "playing") return state;
      return { ...state, phase: "paused" };
    }

    case "RESUME": {
      if (state.phase !== "paused") return state;
      return { ...state, phase: "playing" };
    }

    default:
      return state;
  }
}
