import type { ReactElement } from "react";
import { Switch } from "@heroui/react";
import { defineMessages, useIntl } from "react-intl";
import type { LedgerDepth } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  label: {
    id: "4u4ZmR",
    description: "HomeSessionCard: ledger lines row label",
    defaultMessage: "Ledger lines",
  },
  desc: {
    id: "/LO4OR",
    description: "HomeSessionCard: ledger lines row description",
    defaultMessage: "Notes above or below the staff.",
  },
  on: {
    id: "EgYuyz",
    description: "HomeSessionCard: ledger lines on state label",
    defaultMessage: "On — {depth} above & below",
  },
  off: {
    id: "kg64DX",
    description: "HomeSessionCard: ledger lines off state label",
    defaultMessage: "Off — stay on the staff",
  },
  toggleDesc: {
    id: "XUHgIM",
    description: "HomeSessionCard: ledger lines toggle hint",
    defaultMessage: "Toggle off to stay on the staff.",
  },
  depthLabel: {
    id: "aHuxhj",
    description: "HomeSessionCard: ledger depth picker aria-label",
    defaultMessage: "Ledger line depth",
  },
  depth1: {
    id: "vtXfnZ",
    description: "HomeSessionCard: ledger depth 1 line option",
    defaultMessage: "1 line",
  },
  depth3: {
    id: "6ztnPj",
    description: "HomeSessionCard: ledger depth 2-3 lines option",
    defaultMessage: "2–3 lines",
  },
});

const DEPTHS: { value: LedgerDepth; label: string }[] = [
  { value: 1, label: "1 line" },
  { value: 3, label: "2–3 lines" },
];

export interface HomeSessionCardLedgerRowProps {
  ledgerLines: boolean;
  ledgerDepth: LedgerDepth;
  onLedgerLinesChange: (value: boolean) => void;
  onLedgerDepthChange: (value: LedgerDepth) => void;
}

export function HomeSessionCardLedgerRow({
  ledgerLines,
  ledgerDepth,
  onLedgerLinesChange,
  onLedgerDepthChange,
}: HomeSessionCardLedgerRowProps): ReactElement {
  const intl = useIntl();

  const depthLabel = ledgerDepth === 1 ? intl.formatMessage(messages.depth1) : intl.formatMessage(messages.depth3);

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
              {ledgerLines ? intl.formatMessage(messages.on, { depth: depthLabel }) : intl.formatMessage(messages.off)}
            </p>
            <p className="text-muted mt-0.5 text-xs">{intl.formatMessage(messages.toggleDesc)}</p>
          </div>
          <Switch
            isSelected={ledgerLines}
            onChange={onLedgerLinesChange}
            aria-label={intl.formatMessage(messages.label)}
          >
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch>
        </div>
        <div
          style={{
            maxHeight: ledgerLines ? 60 : 0,
            opacity: ledgerLines ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.3s ease, opacity 0.25s ease",
            marginTop: ledgerLines ? 12 : 0,
          }}
        >
          <div
            role="radiogroup"
            aria-label={intl.formatMessage(messages.depthLabel)}
            className="border-border bg-surface-secondary grid grid-cols-2 gap-1 overflow-hidden rounded-xl border p-1"
          >
            {DEPTHS.map(({ value, label }) => {
              const isActive = ledgerDepth === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => onLedgerDepthChange(value)}
                  className="cursor-pointer rounded-[9px] py-2 text-center text-xs font-medium transition-all duration-150"
                  style={
                    isActive
                      ? {
                          background: "var(--surface)",
                          color: "var(--foreground)",
                          boxShadow: "0 1px 2px rgba(15,12,30,0.04), 0 4px 10px rgba(15,12,30,0.06)",
                        }
                      : { color: "var(--muted)" }
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
