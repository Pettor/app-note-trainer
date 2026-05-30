import type { Meta, StoryObj } from "@storybook/react-vite";
import { LanguageSelector as Component } from "./LanguageSelector";
import type { LanguageSelectorProps as Props } from "./LanguageSelector";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Actions/Language Selector",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Props = {
  mode: "en",
  onSelect: (mode) => console.log("onSelect", mode),
};

export const English: Story = {
  args: defaultArgs,
};

export const Swedish: Story = {
  args: {
    ...defaultArgs,
    mode: "sv",
  },
};

export const SelectSwedish: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    const svenska = canvas.getByRole("radio", { name: "Svenska" });
    await userEvent.click(svenska);
  },
};
