import type { CSSProperties, ReactElement } from "react";

export const MUSIC_GLYPHS = {
  gClef: "",
  fClef: "",
  noteheadWhole: "",
  noteheadHalf: "",
  noteheadBlack: "",
  accidentalSharp: "",
} as const;

export type MusicGlyphName = keyof typeof MUSIC_GLYPHS;

// Derived from Leland bBoxes: (bBoxNE[1] + |bBoxSW[1]|) × 0.25 and bBoxNE[1] × 0.25
const GLYPH_HEIGHT_RATIO: Record<MusicGlyphName, number> = {
  gClef: 1.7788,
  fClef: 0.868,
  noteheadWhole: 0.27,
  noteheadHalf: 0.265,
  noteheadBlack: 0.265,
  accidentalSharp: 0.56,
};

const GLYPH_ASCENT_RATIO: Record<MusicGlyphName, number> = {
  gClef: 1.1122,
  fClef: 0.251,
  noteheadWhole: 0.136,
  noteheadHalf: 0.132,
  noteheadBlack: 0.132,
  accidentalSharp: 0.36,
};

interface MusicGlyphProps {
  glyph: MusicGlyphName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function MusicGlyph({ glyph, size = 64, className, style }: MusicGlyphProps): ReactElement {
  const fontSize = size / GLYPH_HEIGHT_RATIO[glyph];
  const topOffset = GLYPH_ASCENT_RATIO[glyph] * fontSize;

  return (
    <span
      aria-label={glyph}
      role="img"
      className={className}
      style={{
        display: "inline-block",
        height: size,
        userSelect: "none",
        cursor: "default",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "Leland",
          fontSize,
          lineHeight: 0,
          display: "inline-block",
          verticalAlign: "top",
          marginTop: topOffset,
        }}
      >
        {MUSIC_GLYPHS[glyph]}
      </span>
    </span>
  );
}
