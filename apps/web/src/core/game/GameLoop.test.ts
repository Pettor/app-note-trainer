import { describe, expect, it } from "vitest";
import { createInitialState, gameReducer } from "./GameLoop";
import type { GameState } from "./GameLoop";
import type { GameNote } from "./NotePool";
import type { PianoKeyData } from "~/components/input/piano-keyboard/UsePianoKeyboard";
import { DEFAULT_PRACTICE_SETTINGS } from "~/core/practice-settings/PracticeSettings";

function makeNote(step: "C" | "D" | "E" | "F" | "G" | "A" | "B", octave: number, slot = 0): GameNote {
  return { pitch: { step, accidental: "natural", octave }, slot };
}

function pressKey(note: string, octave: number): PianoKeyData {
  const isBlack = note.includes("#");
  return {
    note: note as PianoKeyData["note"],
    octave,
    label: `${note}${octave}`,
    isBlack,
  };
}

const settings = DEFAULT_PRACTICE_SETTINGS;

describe("createInitialState", () => {
  it("starts in countdown phase", () => {
    const state = createInitialState(settings);
    expect(state.phase).toBe("countdown");
  });

  it("starts countdown at 3", () => {
    const state = createInitialState(settings);
    expect(state.countdown).toBe(3);
  });

  it("starts with zero correct and wrong counts", () => {
    const state = createInitialState(settings);
    expect(state.correctCount).toBe(0);
    expect(state.wrongCount).toBe(0);
  });

  it("starts at note index 0", () => {
    const state = createInitialState(settings);
    expect(state.currentNoteIndex).toBe(0);
  });

  it("generates a note queue", () => {
    const state = createInitialState(settings);
    expect(state.noteQueue.length).toBeGreaterThan(0);
  });

  it("initialises noteSecondsRemaining to the duration setting", () => {
    const state = createInitialState(settings);
    expect(state.noteSecondsRemaining).toBe(settings.duration);
  });

  it("contains a scale", () => {
    const state = createInitialState(settings);
    expect(state.scale).toHaveProperty("root");
    expect(state.scale).toHaveProperty("mode");
  });

  it("initialises guessScaleFirst from settings", () => {
    const state = createInitialState({ ...settings, guessScaleFirst: true });
    expect(state.guessScaleFirst).toBe(true);
  });

  it("initialises scaleGuessCorrect to null", () => {
    const state = createInitialState(settings);
    expect(state.scaleGuessCorrect).toBeNull();
  });

  it("initialises guessedScale to null", () => {
    const state = createInitialState(settings);
    expect(state.guessedScale).toBeNull();
  });
});

describe("gameReducer — COUNTDOWN_TICK", () => {
  function countdownState(countdown: 3 | 2 | 1, guessScaleFirst = false): GameState {
    return {
      phase: "countdown",
      countdown,
      noteQueue: [makeNote("C", 4)],
      currentNoteIndex: 0,
      correctCount: 0,
      wrongCount: 0,
      noteSecondsRemaining: 5,
      scale: { root: "C", mode: "major", sharpenedSteps: [], flattenedSteps: [] },
      misses: [],
      guessScaleFirst,
      scaleGuessCorrect: null,
      guessedScale: null,
    };
  }

  it("decrements countdown from 3 to 2", () => {
    const next = gameReducer(countdownState(3), { type: "COUNTDOWN_TICK" });
    expect(next.countdown).toBe(2);
    expect(next.phase).toBe("countdown");
  });

  it("decrements countdown from 2 to 1", () => {
    const next = gameReducer(countdownState(2), { type: "COUNTDOWN_TICK" });
    expect(next.countdown).toBe(1);
  });

  it("transitions to playing when countdown reaches 1 and guessScaleFirst is false", () => {
    const next = gameReducer(countdownState(1, false), { type: "COUNTDOWN_TICK" });
    expect(next.phase).toBe("playing");
    expect(next.countdown).toBeNull();
  });

  it("transitions to guessing-scale when countdown reaches 1 and guessScaleFirst is true", () => {
    const next = gameReducer(countdownState(1, true), { type: "COUNTDOWN_TICK" });
    expect(next.phase).toBe("guessing-scale");
    expect(next.countdown).toBeNull();
  });

  it("is a no-op when not in countdown phase", () => {
    const playingState: GameState = { ...countdownState(3), phase: "playing", countdown: null };
    const next = gameReducer(playingState, { type: "COUNTDOWN_TICK" });
    expect(next).toBe(playingState);
  });
});

describe("gameReducer — SCALE_GUESS / SCALE_RESULT_DONE", () => {
  const scale = { root: "G" as const, mode: "major" as const, sharpenedSteps: ["F" as const], flattenedSteps: [] };
  const guessingState: GameState = {
    phase: "guessing-scale",
    countdown: null,
    noteQueue: [makeNote("G", 4)],
    currentNoteIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    noteSecondsRemaining: 5,
    scale,
    misses: [],
    guessScaleFirst: true,
    scaleGuessCorrect: null,
    guessedScale: null,
  };

  it("transitions to scale-result on SCALE_GUESS", () => {
    const next = gameReducer(guessingState, { type: "SCALE_GUESS", guessedScale: scale });
    expect(next.phase).toBe("scale-result");
  });

  it("marks correct and increments correctCount on a correct guess", () => {
    const next = gameReducer(guessingState, { type: "SCALE_GUESS", guessedScale: scale });
    expect(next.scaleGuessCorrect).toBe(true);
    expect(next.correctCount).toBe(1);
    expect(next.wrongCount).toBe(0);
  });

  it("marks wrong and increments wrongCount on an incorrect guess", () => {
    const wrongGuess = { root: "D" as const, mode: "major" as const, sharpenedSteps: [], flattenedSteps: [] };
    const next = gameReducer(guessingState, { type: "SCALE_GUESS", guessedScale: wrongGuess });
    expect(next.scaleGuessCorrect).toBe(false);
    expect(next.wrongCount).toBe(1);
    expect(next.correctCount).toBe(0);
    expect(next.guessedScale).toBe(wrongGuess);
  });

  it("SCALE_GUESS is a no-op when not in guessing-scale phase", () => {
    const playingState: GameState = { ...guessingState, phase: "playing" };
    const next = gameReducer(playingState, { type: "SCALE_GUESS", guessedScale: scale });
    expect(next).toBe(playingState);
  });

  it("SCALE_RESULT_DONE transitions from scale-result to playing", () => {
    const resultState: GameState = { ...guessingState, phase: "scale-result", scaleGuessCorrect: true };
    const next = gameReducer(resultState, { type: "SCALE_RESULT_DONE" });
    expect(next.phase).toBe("playing");
  });

  it("SCALE_RESULT_DONE is a no-op when not in scale-result phase", () => {
    const next = gameReducer(guessingState, { type: "SCALE_RESULT_DONE" });
    expect(next).toBe(guessingState);
  });
});

describe("gameReducer — KEY_PRESS", () => {
  const noteQueue: GameNote[] = [makeNote("C", 4), makeNote("D", 4), makeNote("E", 4)];

  const playingState: GameState = {
    phase: "playing",
    countdown: null,
    noteQueue,
    currentNoteIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    noteSecondsRemaining: 5,
    scale: { root: "C", mode: "major", sharpenedSteps: [], flattenedSteps: [] },
    misses: [],
    guessScaleFirst: false,
    scaleGuessCorrect: null,
    guessedScale: null,
  };

  it("increments correctCount on a correct key press", () => {
    const next = gameReducer(playingState, {
      type: "KEY_PRESS",
      key: pressKey("C", 4),
      timerEnabled: false,
      noteDuration: 5,
      timeTaken: 0,
    });
    expect(next.correctCount).toBe(1);
    expect(next.wrongCount).toBe(0);
  });

  it("increments wrongCount on an incorrect key press", () => {
    const next = gameReducer(playingState, {
      type: "KEY_PRESS",
      key: pressKey("G", 4),
      timerEnabled: false,
      noteDuration: 5,
      timeTaken: 0,
    });
    expect(next.wrongCount).toBe(1);
    expect(next.correctCount).toBe(0);
  });

  it("advances to the next note index after any key press", () => {
    const next = gameReducer(playingState, {
      type: "KEY_PRESS",
      key: pressKey("C", 4),
      timerEnabled: false,
      noteDuration: 5,
      timeTaken: 0,
    });
    expect(next.currentNoteIndex).toBe(1);
  });

  it("resets noteSecondsRemaining to noteDuration when timerEnabled", () => {
    const next = gameReducer(
      { ...playingState, noteSecondsRemaining: 1 },
      { type: "KEY_PRESS", key: pressKey("C", 4), timerEnabled: true, noteDuration: 8, timeTaken: 0 }
    );
    expect(next.noteSecondsRemaining).toBe(8);
  });

  it("transitions to finished when the last note is answered", () => {
    const lastNoteState: GameState = { ...playingState, currentNoteIndex: noteQueue.length - 1 };
    const next = gameReducer(lastNoteState, {
      type: "KEY_PRESS",
      key: pressKey("E", 4),
      timerEnabled: false,
      noteDuration: 5,
      timeTaken: 0,
    });
    expect(next.phase).toBe("finished");
  });

  it("is a no-op when not in playing phase", () => {
    const pausedState: GameState = { ...playingState, phase: "paused" };
    const next = gameReducer(pausedState, {
      type: "KEY_PRESS",
      key: pressKey("C", 4),
      timerEnabled: false,
      noteDuration: 5,
      timeTaken: 0,
    });
    expect(next).toBe(pausedState);
  });

  it("counts correct when the correct note is pressed in a different octave", () => {
    const next = gameReducer(playingState, {
      type: "KEY_PRESS",
      key: pressKey("C", 5),
      timerEnabled: false,
      noteDuration: 5,
      timeTaken: 0,
    });
    expect(next.correctCount).toBe(1);
    expect(next.wrongCount).toBe(0);
  });
});

describe("gameReducer — NOTE_TIMER_TICK", () => {
  const playingState: GameState = {
    phase: "playing",
    countdown: null,
    noteQueue: [makeNote("C", 4)],
    currentNoteIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    noteSecondsRemaining: 5,
    scale: { root: "C", mode: "major", sharpenedSteps: [], flattenedSteps: [] },
    misses: [],
    guessScaleFirst: false,
    scaleGuessCorrect: null,
    guessedScale: null,
  };

  it("decrements noteSecondsRemaining by the delta", () => {
    const next = gameReducer(playingState, { type: "NOTE_TIMER_TICK", delta: 0.1 });
    expect(next.noteSecondsRemaining).toBeCloseTo(4.9);
  });

  it("is a no-op when not in playing phase", () => {
    const pausedState: GameState = { ...playingState, phase: "paused" };
    const next = gameReducer(pausedState, { type: "NOTE_TIMER_TICK", delta: 0.1 });
    expect(next).toBe(pausedState);
  });
});

describe("gameReducer — NOTE_TIMEOUT", () => {
  const noteQueue: GameNote[] = [makeNote("C", 4), makeNote("D", 4)];

  const playingState: GameState = {
    phase: "playing",
    countdown: null,
    noteQueue,
    currentNoteIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    noteSecondsRemaining: 0,
    scale: { root: "C", mode: "major", sharpenedSteps: [], flattenedSteps: [] },
    misses: [],
    guessScaleFirst: false,
    scaleGuessCorrect: null,
    guessedScale: null,
  };

  it("increments wrongCount", () => {
    const next = gameReducer(playingState, { type: "NOTE_TIMEOUT", noteDuration: 5, timeTaken: 0 });
    expect(next.wrongCount).toBe(1);
    expect(next.correctCount).toBe(0);
  });

  it("advances to the next note", () => {
    const next = gameReducer(playingState, { type: "NOTE_TIMEOUT", noteDuration: 5, timeTaken: 0 });
    expect(next.currentNoteIndex).toBe(1);
  });

  it("resets noteSecondsRemaining to noteDuration", () => {
    const next = gameReducer(playingState, { type: "NOTE_TIMEOUT", noteDuration: 8, timeTaken: 0 });
    expect(next.noteSecondsRemaining).toBe(8);
  });

  it("transitions to finished when timing out on the last note", () => {
    const lastState: GameState = { ...playingState, currentNoteIndex: noteQueue.length - 1 };
    const next = gameReducer(lastState, { type: "NOTE_TIMEOUT", noteDuration: 5, timeTaken: 0 });
    expect(next.phase).toBe("finished");
  });

  it("is a no-op when not in playing phase", () => {
    const pausedState: GameState = { ...playingState, phase: "paused" };
    const next = gameReducer(pausedState, { type: "NOTE_TIMEOUT", noteDuration: 5, timeTaken: 0 });
    expect(next).toBe(pausedState);
  });
});

describe("gameReducer — PAUSE / RESUME", () => {
  const playingState: GameState = {
    phase: "playing",
    countdown: null,
    noteQueue: [makeNote("C", 4)],
    currentNoteIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    noteSecondsRemaining: 5,
    scale: { root: "C", mode: "major", sharpenedSteps: [], flattenedSteps: [] },
    misses: [],
    guessScaleFirst: false,
    scaleGuessCorrect: null,
    guessedScale: null,
  };

  it("transitions from playing to paused", () => {
    const next = gameReducer(playingState, { type: "PAUSE" });
    expect(next.phase).toBe("paused");
  });

  it("transitions from paused to playing on RESUME", () => {
    const pausedState: GameState = { ...playingState, phase: "paused" };
    const next = gameReducer(pausedState, { type: "RESUME" });
    expect(next.phase).toBe("playing");
  });

  it("PAUSE is a no-op when not playing", () => {
    const pausedState: GameState = { ...playingState, phase: "paused" };
    const next = gameReducer(pausedState, { type: "PAUSE" });
    expect(next).toBe(pausedState);
  });

  it("RESUME is a no-op when already playing", () => {
    const next = gameReducer(playingState, { type: "RESUME" });
    expect(next).toBe(playingState);
  });
});
