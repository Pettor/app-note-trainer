import type { ReactElement } from "react";
import { Switch } from "@heroui/react";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  label: {
    id: "rg/WQH",
    description: "HomeSessionCard: guess scale first row label",
    defaultMessage: "Guess scale first",
  },
  desc: {
    id: "LcjDMi",
    description: "HomeSessionCard: guess scale first row description",
    defaultMessage: "Identify the key before each note.",
  },
  on: {
    id: "j1nxMc",
    description: "HomeSessionCard: guess scale on state label",
    defaultMessage: "On — identify key before each note",
  },
  off: {
    id: "Xq2Zm2",
    description: "HomeSessionCard: guess scale off state label",
    defaultMessage: "Off — note prompts only",
  },
  toggleDesc: {
    id: "J+WcWw",
    description: "HomeSessionCard: guess scale toggle hint",
    defaultMessage: "Adds a key-signature step before each card.",
  },
});

export interface HomeSessionCardGuessScaleRowProps {
  guessScaleFirst: boolean;
  onGuessScaleFirstChange: (value: boolean) => void;
}

export function HomeSessionCardGuessScaleRow({
  guessScaleFirst,
  onGuessScaleFirstChange,
}: HomeSessionCardGuessScaleRowProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="border-separator grid grid-cols-1 items-center gap-6 border-t py-4.5 sm:grid-cols-[180px_1fr]">
      <div>
        <p className="text-sm font-semibold">{intl.formatMessage(messages.label)}</p>
        <p className="text-muted mt-0.5 text-xs leading-snug">{intl.formatMessage(messages.desc)}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">
            {guessScaleFirst ? intl.formatMessage(messages.on) : intl.formatMessage(messages.off)}
          </p>
          <p className="text-muted mt-0.5 text-xs">{intl.formatMessage(messages.toggleDesc)}</p>
        </div>
        <Switch
          isSelected={guessScaleFirst}
          onChange={onGuessScaleFirstChange}
          aria-label={intl.formatMessage(messages.label)}
        >
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch>
      </div>
    </div>
  );
}
