import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeSessionCardSharpsRow } from "./HomeSessionCardSharpsRow";

const meta: Meta<typeof HomeSessionCardSharpsRow> = {
  component: HomeSessionCardSharpsRow,
  title: "Views/Home/Home Session Card Sharps Row",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { onSharpsChange: () => {} },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = { args: { sharps: false } };

export const On: Story = { args: { sharps: true } };
