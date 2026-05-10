import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeSessionCardStaffRow } from "./HomeSessionCardStaffRow";

const meta: Meta<typeof HomeSessionCardStaffRow> = {
  component: HomeSessionCardStaffRow,
  title: "Views/Home/Home Session Card Staff Row",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { onStaffChange: () => {} },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Treble: Story = { args: { staff: "treble" } };

export const Bass: Story = { args: { staff: "bass" } };
