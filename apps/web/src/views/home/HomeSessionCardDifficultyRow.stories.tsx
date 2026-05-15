import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeSessionCardDifficultyRow } from "./HomeSessionCardDifficultyRow";

const meta: Meta<typeof HomeSessionCardDifficultyRow> = {
  component: HomeSessionCardDifficultyRow,
  title: "Views/Home/Home Session Card Difficulty Row",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { onDifficultyChange: () => {} },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Low: Story = { args: { difficulty: "low" } };

export const Medium: Story = { args: { difficulty: "medium" } };

export const High: Story = { args: { difficulty: "high" } };

export const Custom: Story = { args: { difficulty: "custom" } };
