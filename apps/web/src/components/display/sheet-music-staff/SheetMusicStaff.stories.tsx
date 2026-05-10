import type { Meta, StoryObj } from "@storybook/react-vite";
import { SheetMusicStaff as Component } from "./SheetMusicStaff";
import type { SheetMusicStaffProps as Props } from "./SheetMusicStaff";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Display/Sheet Music Staff",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TrebleClef: Story = {
  args: { staff: "treble" } satisfies Props,
};

export const BassClef: Story = {
  args: { staff: "bass" } satisfies Props,
};

export const Desktop: Story = {
  args: { staff: "treble" } satisfies Props,
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: { staff: "treble" } satisfies Props,
  globals: { viewport: { value: "iphonex" } },
};

export const BassPhone: Story = {
  args: { staff: "bass" } satisfies Props,
  globals: { viewport: { value: "iphonex" } },
};
