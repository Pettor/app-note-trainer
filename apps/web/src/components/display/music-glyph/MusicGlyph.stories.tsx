import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MUSIC_GLYPHS, MusicGlyph } from "./MusicGlyph";
import type { MusicGlyphName } from "./MusicGlyph";

const meta: Meta<typeof MusicGlyph> = {
  component: MusicGlyph,
  title: "Display/Music Glyph",
  tags: ["autodocs"],
  argTypes: {
    glyph: {
      control: "select",
      options: Object.keys(MUSIC_GLYPHS) as MusicGlyphName[],
    },
    size: {
      control: { type: "range", min: 16, max: 128, step: 8 },
    },
  },
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GClef: Story = {
  args: { glyph: "gClef", size: 64 },
};

export const FClef: Story = {
  args: { glyph: "fClef", size: 64 },
};

export const WholeNote: Story = {
  args: { glyph: "noteheadWhole", size: 64 },
};

export const HalfNote: Story = {
  args: { glyph: "noteheadHalf", size: 64 },
};

export const QuarterNote: Story = {
  args: { glyph: "noteheadBlack", size: 64 },
};

function GlyphGalleryStory(): ReactElement {
  const glyphs: MusicGlyphName[] = ["gClef", "fClef", "noteheadWhole", "noteheadHalf", "noteheadBlack"];
  const labels: Record<MusicGlyphName, string> = {
    gClef: "G Clef",
    fClef: "F Clef",
    noteheadWhole: "Whole",
    noteheadHalf: "Half",
    noteheadBlack: "Quarter",
    accidentalSharp: "Sharp",
  };

  return (
    <div className="flex flex-wrap items-end gap-8 p-4">
      {glyphs.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <MusicGlyph glyph={name} size={64} />
          <span className="text-foreground-500 text-xs">{labels[name]}</span>
        </div>
      ))}
    </div>
  );
}

export const Gallery: Story = {
  render: () => <GlyphGalleryStory />,
};

function SizeScaleStory(): ReactElement {
  const sizes = [24, 32, 48, 64, 96] as const;

  return (
    <div className="flex flex-col gap-4 p-4">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-6">
          <span className="text-foreground-500 w-10 text-xs">{size}px</span>
          <MusicGlyph glyph="gClef" size={size} />
          <MusicGlyph glyph="fClef" size={size} />
          <MusicGlyph glyph="noteheadWhole" size={size} />
          <MusicGlyph glyph="noteheadHalf" size={size} />
          <MusicGlyph glyph="noteheadBlack" size={size} />
        </div>
      ))}
    </div>
  );
}

export const SizeScale: Story = {
  render: () => <SizeScaleStory />,
};
