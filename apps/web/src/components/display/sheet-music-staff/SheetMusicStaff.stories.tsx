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

// slot 4 = middle line (B4 treble / D3 bass) — whole note
export const WithNote: Story = {
  args: { staff: "treble", notes: [{ slot: 4, type: "whole" }] } satisfies Props,
};

// slot -2 = first ledger line below (middle C for treble) — whole note with ledger
export const WithLedgerNote: Story = {
  args: { staff: "treble", notes: [{ slot: -2, type: "whole" }] } satisfies Props,
};

// slot 2 = G4 (second line), below middle — stem up
export const QuarterNote: Story = {
  args: { staff: "treble", notes: [{ slot: 2, type: "quarter" }] } satisfies Props,
};

// slot 6 = D5 (fourth line), above middle — stem down
export const QuarterNoteHigh: Story = {
  args: { staff: "treble", notes: [{ slot: 6, type: "quarter" }] } satisfies Props,
};

export const PhoneWithNote: Story = {
  args: { staff: "treble", notes: [{ slot: 2, type: "quarter" }] } satisfies Props,
  globals: { viewport: { value: "iphonex" } },
};
