import type { Meta, StoryObj } from "@storybook/react-vite";
import { PracticeView as Component } from "./PracticeView";
import { DEFAULT_PRACTICE_SETTINGS } from "~/core/practice-settings/PracticeSettings";
import { RouterDecorator } from "~/storybook/decorators/RouterDecorator";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Practice",
  tags: ["!test"],
  decorators: [RouterDecorator],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    settings: DEFAULT_PRACTICE_SETTINGS,
    onKeyPress: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Fullscreen: Story = {
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  globals: { viewport: { value: "iphonex" } },
};

export const Bass: Story = {
  parameters: { viewport: { value: "full" } },
  args: {
    settings: { ...DEFAULT_PRACTICE_SETTINGS, staff: "bass" },
  },
};
