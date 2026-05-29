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

// Active note — pulsating animation marking the current note to guess
export const ActiveNote: Story = {
  args: { staff: "treble", notes: [{ slot: 4, type: "quarter", active: true }] } satisfies Props,
};

export const ActiveNoteLedger: Story = {
  args: { staff: "treble", notes: [{ slot: -2, type: "whole", active: true }] } satisfies Props,
};

// Extreme ledger notes — slot -6 (F3 treble / A1 bass) and slot 14 (E6 treble / G4 bass)
export const TrebleLedgerLowest: Story = {
  args: { staff: "treble", notes: [{ slot: -6, type: "quarter", active: true }] } satisfies Props,
};

export const TrebleLedgerHighest: Story = {
  args: { staff: "treble", notes: [{ slot: 14, type: "quarter", active: true }] } satisfies Props,
};

export const BassLedgerLowest: Story = {
  args: { staff: "bass", notes: [{ slot: -6, type: "quarter", active: true }] } satisfies Props,
};

export const BassLedgerHighest: Story = {
  args: { staff: "bass", notes: [{ slot: 14, type: "quarter", active: true }] } satisfies Props,
};

// Phone viewport — extreme ledger notes
export const PhoneTrebleLedgerLowest: Story = {
  args: { staff: "treble", notes: [{ slot: -6, type: "quarter", active: true }] } satisfies Props,
  globals: { viewport: { value: "iphonex" } },
};

export const PhoneTrebleLedgerHighest: Story = {
  args: { staff: "treble", notes: [{ slot: 14, type: "quarter", active: true }] } satisfies Props,
  globals: { viewport: { value: "iphonex" } },
};

// Sharp accidental rendering
export const SharpNote: Story = {
  args: { staff: "treble", notes: [{ slot: 1, type: "quarter", accidental: "sharp", active: true }] } satisfies Props,
};

export const PhoneSharpNote: Story = {
  args: { staff: "treble", notes: [{ slot: 1, type: "quarter", accidental: "sharp", active: true }] } satisfies Props,
  globals: { viewport: { value: "iphonex" } },
};

// Flat accidental on individual note
export const FlatNote: Story = {
  args: { staff: "treble", notes: [{ slot: 4, type: "quarter", accidental: "flat", active: true }] } satisfies Props,
};

// ─── Key signature stories ───────────────────────────────────────────────────

// G major (1 sharp: F#)
export const KeySigOneSharpTreble: Story = {
  args: {
    staff: "treble",
    keySignature: { type: "sharp", count: 1 },
    notes: [{ slot: 2, type: "quarter", active: true }],
  } satisfies Props,
};

// D major (2 sharps: F# C#)
export const KeySigTwoSharpsTreble: Story = {
  args: {
    staff: "treble",
    keySignature: { type: "sharp", count: 2 },
    notes: [{ slot: 6, type: "quarter", active: true }],
  } satisfies Props,
};

// A major (3 sharps: F# C# G#)
export const KeySigThreeSharpsTreble: Story = {
  args: {
    staff: "treble",
    keySignature: { type: "sharp", count: 3 },
    notes: [{ slot: 3, type: "quarter", active: true }],
  } satisfies Props,
};

// E major (4 sharps)
export const KeySigFourSharpsTreble: Story = {
  args: {
    staff: "treble",
    keySignature: { type: "sharp", count: 4 },
    notes: [{ slot: 7, type: "quarter", active: true }],
  } satisfies Props,
};

// F major (1 flat: Bb)
export const KeySigOneFlatTreble: Story = {
  args: {
    staff: "treble",
    keySignature: { type: "flat", count: 1 },
    notes: [{ slot: 5, type: "quarter", active: true }],
  } satisfies Props,
};

// Bb major (2 flats: Bb Eb)
export const KeySigTwoFlatsTreble: Story = {
  args: {
    staff: "treble",
    keySignature: { type: "flat", count: 2 },
    notes: [{ slot: 4, type: "quarter", accidental: "flat", active: true }],
  } satisfies Props,
};

// Eb major (3 flats)
export const KeySigThreeFlatsTreble: Story = {
  args: {
    staff: "treble",
    keySignature: { type: "flat", count: 3 },
    notes: [{ slot: 7, type: "quarter", accidental: "flat", active: true }],
  } satisfies Props,
};

// Ab major (4 flats)
export const KeySigFourFlatsTreble: Story = {
  args: {
    staff: "treble",
    keySignature: { type: "flat", count: 4 },
    notes: [{ slot: 3, type: "quarter", accidental: "flat", active: true }],
  } satisfies Props,
};

// Bass clef key signatures
export const KeySigTwoSharpsBass: Story = {
  args: {
    staff: "bass",
    keySignature: { type: "sharp", count: 2 },
    notes: [{ slot: 4, type: "quarter", active: true }],
  } satisfies Props,
};

export const KeySigTwoFlatsBass: Story = {
  args: {
    staff: "bass",
    keySignature: { type: "flat", count: 2 },
    notes: [{ slot: 3, type: "quarter", active: true }],
  } satisfies Props,
};

// Phone — key signature
export const PhoneKeySignature: Story = {
  args: {
    staff: "treble",
    keySignature: { type: "sharp", count: 3 },
    notes: [{ slot: 4, type: "quarter", active: true }],
  } satisfies Props,
  globals: { viewport: { value: "iphonex" } },
};
