import { useCallback, useRef } from "react";
import { useAtomValue } from "jotai";
import { audioEnabledAtom } from "./AudioAtoms";
import type { PianoNote } from "~/components/input/piano-keyboard/UsePianoKeyboard";

const SEMITONE: Record<PianoNote, number> = {
  C: 0,
  "C#": 1,
  D: 2,
  "D#": 3,
  E: 4,
  F: 5,
  "F#": 6,
  G: 7,
  "G#": 8,
  A: 9,
  "A#": 10,
  B: 11,
};

function noteFrequency(note: PianoNote, octave: number): number {
  const midi = 12 * (octave + 1) + SEMITONE[note];
  return 440 * Math.pow(2, (midi - 69) / 12);
}

interface AudioGraph {
  ctx: AudioContext;
  compressor: DynamicsCompressorNode;
  filter: BiquadFilterNode;
}

export function usePianoAudio(): { playNote: (note: PianoNote, octave: number) => void } {
  const audioEnabled = useAtomValue(audioEnabledAtom);
  const audioEnabledRef = useRef(audioEnabled);
  audioEnabledRef.current = audioEnabled;

  const graphRef = useRef<AudioGraph | null>(null);

  const getGraph = useCallback((): AudioGraph => {
    if (!graphRef.current) {
      const ctx = new AudioContext();

      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -20;
      compressor.knee.value = 8;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.15;
      compressor.connect(ctx.destination);

      // Soft low-pass to round off harsh overtones
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 4000;
      filter.Q.value = 0.6;
      filter.connect(compressor);

      graphRef.current = { ctx, compressor, filter };
    }
    return graphRef.current;
  }, []);

  const playNote = useCallback(
    (note: PianoNote, octave: number): void => {
      if (!audioEnabledRef.current) return;

      const { ctx, filter } = getGraph();

      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      const now = ctx.currentTime;
      const freq = noteFrequency(note, octave);

      // Per-note envelope
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.16, now + 0.008); // fast attack
      env.gain.exponentialRampToValueAtTime(0.055, now + 0.22); // decay to sustain
      env.gain.setValueAtTime(0.055, now + 0.65); // hold
      env.gain.exponentialRampToValueAtTime(0.0001, now + 1.5); // release
      env.connect(filter);

      // Fundamental + two harmonics with slight detuning for warmth
      const partials: Array<{ ratio: number; gain: number; detune: number }> = [
        { ratio: 1, gain: 1.0, detune: 0 },
        { ratio: 2, gain: 0.22, detune: 3 },
        { ratio: 3, gain: 0.06, detune: -3 },
      ];

      for (const { ratio, gain: gainValue, detune } of partials) {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq * ratio;
        osc.detune.value = detune;

        const gainNode = ctx.createGain();
        gainNode.gain.value = gainValue;

        osc.connect(gainNode);
        gainNode.connect(env);

        osc.start(now);
        osc.stop(now + 1.5);
      }
    },
    [getGraph]
  );

  return { playNote };
}
