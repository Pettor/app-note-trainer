import type { Meta, StoryObj } from "@storybook/react-vite";
import { PianoKeyboard as Component } from "./PianoKeyboard";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Input/Piano Keyboard",
  tags: ["autodocs"],
  args: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onKeyPress: () => {},
  },
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HighlightedWhiteKey: Story = {
  args: { highlightedKey: "C4" },
};

export const HighlightedBlackKey: Story = {
  args: { highlightedKey: "F#4" },
};

export const HighlightedUpperOctave: Story = {
  args: { highlightedKey: "A5" },
};

export const Desktop: Story = {
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  globals: { viewport: { value: "iphonex" } },
};

export const PhoneHighlighted: Story = {
  args: { highlightedKey: "G4" },
  globals: { viewport: { value: "iphonex" } },
};
