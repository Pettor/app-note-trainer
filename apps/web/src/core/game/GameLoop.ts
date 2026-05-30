import { matchesPianoKey } from "./MusicNote";
import type { Accidental, NoteStep } from "./MusicNote";
import type { Scale } from "./MusicScale";
import { pickRandomScale, scaleId } from "./MusicScale";
import type { GameNote } from "./NotePool";
import { buildNoteQueue } from "./NotePool";
import type { PianoKeyData, PianoNote } from "~/components/input/piano-keyboard/UsePianoKeyboard";
import type { Duration, PracticeSettings } from "~/core/practice-settings/PracticeSettings";

export type GamePhase = "countdown" | "guessing-scale" | "scale-result" | "playing" | "paused" | "finished";

export interface MissRecord {
  slot: number;
  correctStep: NoteStep;
  correctAccidental: Accidental;
  correctOctave: number;
  guessNote: PianoNote | null;
  guessOctave: number | null;
  timeTaken: number;
}

export interface GameState {
  phase: GamePhase;
  countdown: 3 | 2 | 1 | null;
  noteQueue: GameNote[];
  currentNoteIndex: number;
  correctCount: number;
  wrongCount: number;
  noteSecondsRemaining: number;
  scale: Scale;
  misses: MissRecord[];
  guessScaleFirst: boolean;
  scaleGuessCorrect: boolean | null;
  guessedScale: Scale | null;
}

export type GameAction =
  | { type: "COUNTDOWN_TICK" }
  | { type: "SCALE_GUESS"; guessedScale: Scale }
  | { type: "SCALE_RESULT_DONE" }
  | { type: "KEY_PRESS"; key: PianoKeyData; timerEnabled: boolean; noteDuration: Duration; timeTaken: number }
  | { type: "NOTE_TIMER_TICK"; delta: number }
  | { type: "NOTE_TIMEOUT"; noteDuration: Duration; timeTaken: number }
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
    misses: [],
    guessScaleFirst: settings.guessScaleFirst,
    scaleGuessCorrect: null,
    guessedScale: null,
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
        const nextPhase = state.guessScaleFirst ? "guessing-scale" : "playing";
        return { ...state, phase: nextPhase, countdown: null };
      }
      return { ...state, countdown: (state.countdown - 1) as 3 | 2 | 1 };
    }

    case "SCALE_GUESS": {
      if (state.phase !== "guessing-scale") return state;
      const isCorrect = scaleId(action.guessedScale) === scaleId(state.scale);
      return {
        ...state,
        phase: "scale-result",
        scaleGuessCorrect: isCorrect,
        guessedScale: action.guessedScale,
        correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
        wrongCount: isCorrect ? state.wrongCount : state.wrongCount + 1,
      };
    }

    case "SCALE_RESULT_DONE": {
      if (state.phase !== "scale-result") return state;
      return { ...state, phase: "playing" };
    }

    case "KEY_PRESS": {
      if (state.phase !== "playing") return state;
      const current = state.noteQueue[state.currentNoteIndex];
      if (!current) return state;
      const isCorrect = matchesPianoKey(current.pitch, action.key);
      const miss: MissRecord | null = isCorrect
        ? null
        : {
            slot: current.slot,
            correctStep: current.pitch.step,
            correctAccidental: current.pitch.accidental,
            correctOctave: current.pitch.octave,
            guessNote: action.key.note,
            guessOctave: action.key.octave,
            timeTaken: action.timeTaken,
          };
      return advanceNote(
        {
          ...state,
          correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
          wrongCount: isCorrect ? state.wrongCount : state.wrongCount + 1,
          misses: miss ? [...state.misses, miss] : state.misses,
        },
        action.timerEnabled ? action.noteDuration : state.noteSecondsRemaining
      );
    }

    case "NOTE_TIMER_TICK": {
      if (state.phase !== "playing") return state;
      return { ...state, noteSecondsRemaining: state.noteSecondsRemaining - action.delta };
    }

    case "NOTE_TIMEOUT": {
      if (state.phase !== "playing") return state;
      const timedOut = state.noteQueue[state.currentNoteIndex];
      const timeoutMiss: MissRecord | undefined = timedOut
        ? {
            slot: timedOut.slot,
            correctStep: timedOut.pitch.step,
            correctAccidental: timedOut.pitch.accidental,
            correctOctave: timedOut.pitch.octave,
            guessNote: null,
            guessOctave: null,
            timeTaken: action.timeTaken,
          }
        : undefined;
      return advanceNote(
        {
          ...state,
          wrongCount: state.wrongCount + 1,
          misses: timeoutMiss ? [...state.misses, timeoutMiss] : state.misses,
        },
        action.noteDuration
      );
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
