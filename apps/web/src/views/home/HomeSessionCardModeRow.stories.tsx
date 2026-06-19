import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeSessionCardModeRow } from "./HomeSessionCardModeRow";

const meta: Meta<typeof HomeSessionCardModeRow> = {
  component: HomeSessionCardModeRow,
  title: "Views/Home/Home Session Card Mode Row",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { onModeChange: () => {}, onChordPoolChange: () => {} },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleNote: Story = { args: { mode: "single", chordPool: "triads" } };

export const ChordsTriads: Story = { args: { mode: "chord", chordPool: "triads" } };

export const ChordsSevenths: Story = { args: { mode: "chord", chordPool: "sevenths" } };
