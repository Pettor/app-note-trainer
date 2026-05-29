import type { ReactElement } from "react";
import { Switch } from "@heroui/react";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  label: {
    id: "8n4wYD",
    description: "HomeSessionCard: sharps row label",
    defaultMessage: "Sharps & flats",
  },
  desc: {
    id: "kOi55N",
    description: "HomeSessionCard: sharps row description",
    defaultMessage: "Include accidentals in the deck.",
  },
  on: {
    id: "0pTpaY",
    description: "HomeSessionCard: sharps toggle on state label",
    defaultMessage: "On — naturals + ♯/♭",
  },
  off: {
    id: "rml32P",
    description: "HomeSessionCard: sharps toggle off state label",
    defaultMessage: "Off — natural notes only",
  },
  toggleDesc: {
    id: "vuVDbB",
    description: "HomeSessionCard: sharps toggle hint",
    defaultMessage: "Toggle on to mix in ♯ and ♭.",
  },
  guessScaleLabel: {
    id: "rg/WQH",
    description: "HomeSessionCard: guess scale first row label",
    defaultMessage: "Guess scale first",
  },
  guessScaleOn: {
    id: "j1nxMc",
    description: "HomeSessionCard: guess scale on state label",
    defaultMessage: "On — identify key before each note",
  },
  guessScaleOff: {
    id: "Xq2Zm2",
    description: "HomeSessionCard: guess scale off state label",
    defaultMessage: "Off — note prompts only",
  },
  guessScaleDesc: {
    id: "J+WcWw",
    description: "HomeSessionCard: guess scale toggle hint",
    defaultMessage: "Adds a key-signature step before each card.",
  },
  naturalsLabel: {
    id: "Heb3M3",
    description: "HomeSessionCard: naturals row label",
    defaultMessage: "Naturals (♮)",
  },
  naturalsOn: {
    id: "q0jNfB",
    description: "HomeSessionCard: naturals on state label",
    defaultMessage: "On — show ♮ cancellation signs",
  },
  naturalsOff: {
    id: "948buJ",
    description: "HomeSessionCard: naturals off state label",
    defaultMessage: "Off — no ♮ signs",
  },
  naturalsDesc: {
    id: "gsC1l2",
    description: "HomeSessionCard: naturals toggle hint",
    defaultMessage: "Show ♮ signs when a sharp or flat is cancelled.",
  },
});

export interface HomeSessionCardAccidentalsRowProps {
  sharps: boolean;
  guessScaleFirst: boolean;
  naturals: boolean;
  onSharpsChange: (value: boolean) => void;
  onGuessScaleFirstChange: (value: boolean) => void;
  onNaturalsChange: (value: boolean) => void;
}

export function HomeSessionCardAccidentalsRow({
  sharps,
  guessScaleFirst,
  naturals,
  onSharpsChange,
  onGuessScaleFirstChange,
  onNaturalsChange,
}: HomeSessionCardAccidentalsRowProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="border-separator grid grid-cols-1 items-start gap-6 border-t py-4.5 sm:grid-cols-[180px_1fr]">
      <div>
        <p className="text-sm font-semibold">{intl.formatMessage(messages.label)}</p>
        <p className="text-muted mt-0.5 text-xs leading-snug">{intl.formatMessage(messages.desc)}</p>
      </div>
      <div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">
              {sharps ? intl.formatMessage(messages.on) : intl.formatMessage(messages.off)}
            </p>
            <p className="text-muted mt-0.5 text-xs">{intl.formatMessage(messages.toggleDesc)}</p>
          </div>
          <Switch isSelected={sharps} onChange={onSharpsChange} aria-label={intl.formatMessage(messages.label)}>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch>
        </div>

        {/* Sub-options: animated expand when sharps is ON */}
        <div
          style={{
            maxHeight: sharps ? 160 : 0,
            opacity: sharps ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.3s ease, opacity 0.25s ease",
            marginTop: sharps ? 12 : 0,
          }}
        >
          <div className="border-border bg-surface-secondary overflow-hidden rounded-xl border">
            {/* Guess scale first */}
            <div className="flex items-center justify-between gap-4 px-3 py-2.5">
              <div>
                <p className="text-xs font-medium">
                  {guessScaleFirst
                    ? intl.formatMessage(messages.guessScaleOn)
                    : intl.formatMessage(messages.guessScaleOff)}
                </p>
                <p className="text-muted mt-0.5 text-[11px] leading-snug">
                  {intl.formatMessage(messages.guessScaleDesc)}
                </p>
              </div>
              <Switch
                isSelected={guessScaleFirst}
                onChange={onGuessScaleFirstChange}
                aria-label={intl.formatMessage(messages.guessScaleLabel)}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            </div>

            {/* Naturals */}
            <div className="border-border flex items-center justify-between gap-4 border-t px-3 py-2.5">
              <div>
                <p className="text-xs font-medium">
                  {naturals ? intl.formatMessage(messages.naturalsOn) : intl.formatMessage(messages.naturalsOff)}
                </p>
                <p className="text-muted mt-0.5 text-[11px] leading-snug">
                  {intl.formatMessage(messages.naturalsDesc)}
                </p>
              </div>
              <Switch
                isSelected={naturals}
                onChange={onNaturalsChange}
                aria-label={intl.formatMessage(messages.naturalsLabel)}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
