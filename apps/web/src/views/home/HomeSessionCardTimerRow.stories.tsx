import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeSessionCardTimerRow } from "./HomeSessionCardTimerRow";

const meta: Meta<typeof HomeSessionCardTimerRow> = {
  component: HomeSessionCardTimerRow,
  title: "Views/Home/Home Session Card Timer Row",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { onTimerChange: () => {}, onDurationChange: () => {} },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TimerOff: Story = {
  args: { timerEnabled: false, duration: 5 },
};

export const TimerOn: Story = {
  args: { timerEnabled: true, duration: 5 },
};

export const TimerOnShort: Story = {
  args: { timerEnabled: true, duration: 3 },
};

export const TimerOnLong: Story = {
  args: { timerEnabled: true, duration: 12 },
};
