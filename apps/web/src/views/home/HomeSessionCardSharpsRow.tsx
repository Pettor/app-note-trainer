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
});

export interface HomeSessionCardSharpsRowProps {
  sharps: boolean;
  onSharpsChange: (value: boolean) => void;
}

export function HomeSessionCardSharpsRow({ sharps, onSharpsChange }: HomeSessionCardSharpsRowProps): ReactElement {
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
    </div>
  );
}
