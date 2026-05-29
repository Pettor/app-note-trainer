import type { Meta, StoryObj } from "@storybook/react-vite";
import { PracticeGuessScale as Component } from "./PracticeGuessScale";
import type { Scale } from "~/core/game/MusicScale";

const gMajor: Scale = { root: "G", mode: "major", sharpenedSteps: ["F"], flattenedSteps: [] };
const eminor: Scale = { root: "E", mode: "minor", sharpenedSteps: ["F"], flattenedSteps: [] };
const dMajor: Scale = { root: "D", mode: "major", sharpenedSteps: ["F", "C"], flattenedSteps: [] };
const aMajor: Scale = { root: "A", mode: "major", sharpenedSteps: ["F", "C", "G"], flattenedSteps: [] };

const choices: Scale[] = [gMajor, eminor, dMajor, aMajor];

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Practice/GuessScale",
  tags: ["autodocs"],
  args: {
    choices,
    correctScale: gMajor,
    guessedScale: null,
    onGuess: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Guessing: Story = {};

export const ResultCorrect: Story = {
  args: {
    guessedScale: gMajor,
  },
};

export const ResultWrong: Story = {
  args: {
    guessedScale: dMajor,
  },
};
