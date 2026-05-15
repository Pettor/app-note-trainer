import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeSessionCardSummary } from "./HomeSessionCardSummary";

const meta: Meta<typeof HomeSessionCardSummary> = {
  component: HomeSessionCardSummary,
  title: "Views/Home/Home Session Card Summary",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    staff: "treble",
    noteRange: "wide",
    ledgerLines: true,
    ledgerDepth: 1,
    sharps: true,
    timerEnabled: true,
    duration: 8,
    guessScaleFirst: false,
  },
};

export const AllOn: Story = {
  args: {
    staff: "bass",
    noteRange: "extended",
    ledgerLines: true,
    ledgerDepth: 3,
    sharps: true,
    timerEnabled: true,
    duration: 5,
    guessScaleFirst: true,
  },
};

export const LowDifficulty: Story = {
  args: {
    staff: "treble",
    noteRange: "narrow",
    ledgerLines: false,
    ledgerDepth: 1,
    sharps: false,
    timerEnabled: false,
    duration: 8,
    guessScaleFirst: false,
  },
};

export const Custom: Story = {
  args: {
    staff: "treble",
    noteRange: "standard",
    ledgerLines: true,
    ledgerDepth: 1,
    sharps: false,
    timerEnabled: true,
    duration: 12,
    guessScaleFirst: false,
  },
};
