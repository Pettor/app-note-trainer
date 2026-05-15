import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeSessionCardGuessScaleRow as Component } from "./HomeSessionCardGuessScaleRow";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Home/Home Session Card Guess Scale Row",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    guessScaleFirst: false,
    onGuessScaleFirstChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const On: Story = { args: { guessScaleFirst: true } };
