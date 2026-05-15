import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeSessionCardNoteRangeRow as Component } from "./HomeSessionCardNoteRangeRow";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Home/Home Session Card Note Range Row",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    noteRange: "wide",
    onNoteRangeChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Narrow: Story = { args: { noteRange: "narrow" } };
export const Extended: Story = { args: { noteRange: "extended" } };
