import type { Meta, StoryObj } from "@storybook/react-vite";
import { PracticeView as Component } from "./PracticeView";
import type { Scale } from "~/core/game/MusicScale";
import { DEFAULT_PRACTICE_SETTINGS } from "~/core/practice-settings/PracticeSettings";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Practice",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    settings: DEFAULT_PRACTICE_SETTINGS,
    onKeyPress: () => {},
    onPause: () => {},
    onExit: () => {},
    keyName: "G",
    scaleType: "major",
    remaining: 3.4,
    notesCompleted: 7,
    totalNotes: 25,
    correctCount: 6,
    wrongCount: 1,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Fullscreen: Story = {
  parameters: { viewport: { value: "full" } },
  args: {
    currentNote: { slot: 4, type: "quarter", active: true },
  },
};

export const Phone: Story = {
  globals: { viewport: { value: "iphonex" } },
  args: {
    currentNote: { slot: 2, type: "quarter", active: true },
  },
};

export const WithTimer: Story = {
  parameters: { viewport: { value: "full" } },
  args: {
    settings: { ...DEFAULT_PRACTICE_SETTINGS, timerEnabled: true, duration: 5 },
    remaining: 3.4,
    currentNote: { slot: 6, type: "quarter", active: true },
  },
};

export const Countdown: Story = {
  parameters: { viewport: { value: "full" } },
  args: {
    countdown: 3,
    settings: { ...DEFAULT_PRACTICE_SETTINGS, timerEnabled: true, duration: 5 },
  },
};

export const Paused: Story = {
  parameters: { viewport: { value: "full" } },
  args: {
    isPaused: true,
    currentNote: { slot: 4, type: "quarter" },
  },
};

export const Bass: Story = {
  parameters: { viewport: { value: "full" } },
  args: {
    settings: { ...DEFAULT_PRACTICE_SETTINGS, staff: "bass" },
    keyName: "F",
    currentNote: { slot: 3, type: "quarter" },
  },
};

const gMajor: Scale = { root: "G", mode: "major", sharpenedSteps: ["F"], flattenedSteps: [] };
const scaleChoices: Scale[] = [
  gMajor,
  { root: "E", mode: "minor", sharpenedSteps: ["F"], flattenedSteps: [] },
  { root: "D", mode: "major", sharpenedSteps: ["F", "C"], flattenedSteps: [] },
  { root: "A", mode: "major", sharpenedSteps: ["F", "C", "G"], flattenedSteps: [] },
];

export const GuessScale: Story = {
  parameters: { viewport: { value: "full" } },
  args: {
    settings: { ...DEFAULT_PRACTICE_SETTINGS, guessScaleFirst: true },
    keyName: "G",
    scaleType: "major",
    keySignature: { type: "sharp", count: 1 },
    hideScaleInfo: true,
    scale: gMajor,
    scaleChoices,
    guessedScale: null,
    currentNote: null,
    countdown: null,
  },
};

export const GuessScaleResult: Story = {
  parameters: { viewport: { value: "full" } },
  args: {
    settings: { ...DEFAULT_PRACTICE_SETTINGS, guessScaleFirst: true },
    keyName: "G",
    scaleType: "major",
    keySignature: { type: "sharp", count: 1 },
    hideScaleInfo: true,
    scale: gMajor,
    scaleChoices,
    guessedScale: { root: "D", mode: "major", sharpenedSteps: ["F", "C"], flattenedSteps: [] },
    currentNote: null,
    countdown: null,
  },
};
