import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeSessionCardAccidentalsRow } from "./HomeSessionCardAccidentalsRow";

const meta: Meta<typeof HomeSessionCardAccidentalsRow> = {
  component: HomeSessionCardAccidentalsRow,
  title: "Views/Home/Home Session Card Accidentals Row",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    onSharpsChange: () => {},
    onGuessScaleFirstChange: () => {},
    onNaturalsChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = { args: { sharps: false, guessScaleFirst: false, naturals: false } };

export const OnDefault: Story = { args: { sharps: true, guessScaleFirst: false, naturals: false } };

export const OnWithGuessScale: Story = { args: { sharps: true, guessScaleFirst: true, naturals: false } };

export const OnWithNaturals: Story = { args: { sharps: true, guessScaleFirst: false, naturals: true } };

export const OnFull: Story = { args: { sharps: true, guessScaleFirst: true, naturals: true } };
