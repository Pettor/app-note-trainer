import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScoreView as Component } from "./ScoreView";
import type { MissRecord } from "~/core/game/GameLoop";

const sampleMisses: MissRecord[] = [
  {
    slot: 5,
    correctStep: "C",
    correctAccidental: "natural",
    correctOctave: 5,
    guessNote: "G",
    guessOctave: 4,
    timeTaken: 4.8,
  },
  {
    slot: 1,
    correctStep: "F",
    correctAccidental: "natural",
    correctOctave: 4,
    guessNote: "A",
    guessOctave: 4,
    timeTaken: 3.6,
  },
  {
    slot: 9,
    correctStep: "G",
    correctAccidental: "natural",
    correctOctave: 5,
    guessNote: null,
    guessOctave: null,
    timeTaken: 5.0,
  },
];

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Score",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    staff: "treble",
    keyName: "G",
    scaleType: "major",
    keySignature: { type: "sharp", count: 1 },
    totalNotes: 25,
    correctCount: 22,
    misses: sampleMisses,
    totalTime: 96.4,
    fastestCorrect: 0.8,
    onExit: () => {},
    onPlayAgain: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { viewport: { value: "full" } },
};

export const Perfect: Story = {
  parameters: { viewport: { value: "full" } },
  args: {
    correctCount: 25,
    misses: [],
    totalTime: 72.1,
    fastestCorrect: 0.6,
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: "iphonex" } },
};

export const MobilePerfect: Story = {
  globals: { viewport: { value: "iphonex" } },
  args: {
    correctCount: 25,
    misses: [],
    totalTime: 72.1,
    fastestCorrect: 0.6,
  },
};

export const BassClef: Story = {
  parameters: { viewport: { value: "full" } },
  args: {
    staff: "bass",
    keyName: "F",
    keySignature: { type: "flat", count: 1 },
    correctCount: 19,
    misses: [
      {
        slot: 4,
        correctStep: "D",
        correctAccidental: "natural",
        correctOctave: 3,
        guessNote: "C",
        guessOctave: 3,
        timeTaken: 4.2,
      },
    ],
    totalTime: 84.7,
  },
};
