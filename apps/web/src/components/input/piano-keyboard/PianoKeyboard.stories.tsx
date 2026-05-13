import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { PianoKeyboard as Component } from "./PianoKeyboard";
import type { PianoKeyboardProps as Props } from "./PianoKeyboard";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Input/Piano Keyboard",
  tags: ["autodocs"],
  args: {
    onKeyPress: () => {},
  },
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  onKeyPress: () => {},
} satisfies Props;

// ─── Visual stories ───────────────────────────────────────────────────────────

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

// ─── Interaction tests ────────────────────────────────────────────────────────

export const KeyboardRenders: Story = {
  args: defaultArgs,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("group", { name: "Piano keyboard" })).toBeInTheDocument();

    // 2 octaves = 14 white keys + 10 black keys = 24 buttons total
    const allKeys = canvas.getAllByRole("button");
    await expect(allKeys).toHaveLength(24);
  },
};

export const PressWhiteKey: Story = {
  render: () => {
    const [lastKey, setLastKey] = useState<string | null>(null);
    return (
      <div>
        <Component {...defaultArgs} onKeyPress={(key) => setLastKey(key.label)} />
        <div data-testid="piano-keyboard__result">{lastKey ?? "none"}</div>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("piano-keyboard__key-c4"));
    await expect(canvas.getByTestId("piano-keyboard__result")).toHaveTextContent("C4");
  },
};

export const PressBlackKey: Story = {
  render: () => {
    const [lastKey, setLastKey] = useState<string | null>(null);
    return (
      <div>
        <Component {...defaultArgs} onKeyPress={(key) => setLastKey(key.label)} />
        <div data-testid="piano-keyboard__result">{lastKey ?? "none"}</div>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("piano-keyboard__key-fsharp4"));
    await expect(canvas.getByTestId("piano-keyboard__result")).toHaveTextContent("F#4");
  },
};

export const PressKeyReturnsNoteData: Story = {
  render: () => {
    const [result, setResult] = useState<string | null>(null);
    return (
      <div>
        <Component
          {...defaultArgs}
          onKeyPress={(key) => setResult(`${key.note}|${key.octave}|${key.isBlack ? "black" : "white"}`)}
        />
        <div data-testid="piano-keyboard__result">{result ?? "none"}</div>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("piano-keyboard__key-asharp5"));
    await expect(canvas.getByTestId("piano-keyboard__result")).toHaveTextContent("A#|5|black");
  },
};

export const HighlightedKeyMarked: Story = {
  args: { ...defaultArgs, highlightedKey: "C4" },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("piano-keyboard__key-c4")).toHaveAttribute("data-highlighted");
    await expect(canvas.getByTestId("piano-keyboard__key-d4")).not.toHaveAttribute("data-highlighted");
    await expect(canvas.getByTestId("piano-keyboard__key-fsharp4")).not.toHaveAttribute("data-highlighted");
  },
};

export const HighlightedBlackKeyMarked: Story = {
  args: { ...defaultArgs, highlightedKey: "F#4" },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("piano-keyboard__key-fsharp4")).toHaveAttribute("data-highlighted");
    await expect(canvas.getByTestId("piano-keyboard__key-c4")).not.toHaveAttribute("data-highlighted");
  },
};

export const MultipleKeyPresses: Story = {
  render: () => {
    const [keys, setKeys] = useState<string[]>([]);
    return (
      <div>
        <Component {...defaultArgs} onKeyPress={(key) => setKeys((prev) => [...prev, key.label])} />
        <div data-testid="piano-keyboard__result">{keys.join(",") || "none"}</div>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("piano-keyboard__key-c4"));
    await userEvent.click(canvas.getByTestId("piano-keyboard__key-e4"));
    await userEvent.click(canvas.getByTestId("piano-keyboard__key-g4"));
    await expect(canvas.getByTestId("piano-keyboard__result")).toHaveTextContent("C4,E4,G4");
  },
};
