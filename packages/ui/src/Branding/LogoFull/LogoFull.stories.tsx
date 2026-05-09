import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { LogoFull as Component } from "./LogoFull";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Shared/Branding/Logo/Full",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FullSmall: Story = {
  args: {
    appName: "Note Trainer",
    size: "small",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Note Trainer")).toBeInTheDocument();
  },
};

export const FullMedium: Story = {
  args: {
    appName: "Note Trainer",
    size: "medium",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Note Trainer")).toBeInTheDocument();
  },
};

export const FullLarge: Story = {
  args: {
    appName: "Note Trainer",
    size: "large",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Note Trainer")).toBeInTheDocument();
  },
};
