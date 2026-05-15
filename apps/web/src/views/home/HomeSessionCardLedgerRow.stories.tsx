import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeSessionCardLedgerRow as Component } from "./HomeSessionCardLedgerRow";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Home/Home Session Card Ledger Row",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    ledgerLines: true,
    ledgerDepth: 1,
    onLedgerLinesChange: () => {},
    onLedgerDepthChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Off: Story = { args: { ledgerLines: false } };
export const DeepLines: Story = { args: { ledgerDepth: 3 } };
