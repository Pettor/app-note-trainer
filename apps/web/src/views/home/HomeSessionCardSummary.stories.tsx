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
  args: { difficulty: "medium", staff: "treble", sharps: false, timerEnabled: false, duration: 5 },
};

export const AllOn: Story = {
  args: { difficulty: "high", staff: "bass", sharps: true, timerEnabled: true, duration: 8 },
};

export const LowDifficulty: Story = {
  args: { difficulty: "low", staff: "treble", sharps: false, timerEnabled: false, duration: 5 },
};
