import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeSessionCard as Component } from "./HomeSessionCard";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Home/HomeSessionCard",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Phone: Story = {
  globals: { viewport: { value: "iphonex" } },
};
