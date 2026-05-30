import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsModal as Component } from "./SettingsModal";
import type { SettingsModalProps as Props } from "./SettingsModal";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Settings Modal",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const accountArgs = {
  name: "John Doe",
  email: "john.doe@example.com",
};

const aboutArgs = {
  appName: "Note Trainer",
  appVersion: "1.0.0",
  serverVersion: "2.0.0",
};

const appearanceArgs = {
  themeSelector: {
    mode: "auto" as const,
    onSelect: (mode: string) => console.log("onSelect", mode),
  },
};

const languageArgs = {
  languageSelector: {
    mode: "en" as const,
    onSelect: (mode: string) => console.log("onSelect", mode),
  },
};

const allSections = ["account", "appearance", "language", "about"] as Props["sections"];

const defaultArgs = {
  isOpen: true,
  sections: allSections,
  onClose: () => console.log("onClose"),
  account: accountArgs,
  appearance: appearanceArgs,
  language: languageArgs,
  aboutDetails: aboutArgs,
} satisfies Props;

export const Default: Story = {
  args: defaultArgs,
};

export const Account: Story = {
  args: {
    ...defaultArgs,
    initialSection: "account",
  },
};

export const Appearance: Story = {
  args: {
    ...defaultArgs,
    initialSection: "appearance",
  },
};

export const Language: Story = {
  args: {
    ...defaultArgs,
    initialSection: "language",
  },
};

export const About: Story = {
  args: {
    ...defaultArgs,
    initialSection: "about",
  },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
