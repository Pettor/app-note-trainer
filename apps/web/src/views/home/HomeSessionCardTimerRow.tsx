import type { ReactElement } from "react";
import { Switch } from "@heroui/react";
import { defineMessages, useIntl } from "react-intl";
import type { Duration } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  label: {
    id: "LSiYLr",
    description: "HomeSessionCard: timer row label",
    defaultMessage: "Time limit",
  },
  desc: {
    id: "LZ8ffD",
    description: "HomeSessionCard: timer row description",
    defaultMessage: "Pressure builds reflexes.",
  },
  on: {
    id: "7kitNA",
    description: "HomeSessionCard: timer on state label",
    defaultMessage: "On — {duration}s per note",
  },
  off: {
    id: "uWV4Fg",
    description: "HomeSessionCard: timer off state label",
    defaultMessage: "Off — go at your own pace",
  },
  toggleDesc: {
    id: "jwtUIG",
    description: "HomeSessionCard: timer toggle hint",
    defaultMessage: "Each note must be answered before the bar runs out.",
  },
  timePerNote: {
    id: "EW3xAp",
    description: "HomeSessionCard: duration picker aria-label",
    defaultMessage: "Time per note",
  },
});

const DURATIONS: Duration[] = [3, 5, 8, 12];

export interface HomeSessionCardTimerRowProps {
  timerEnabled: boolean;
  duration: Duration;
  onTimerChange: (value: boolean) => void;
  onDurationChange: (value: Duration) => void;
}

export function HomeSessionCardTimerRow({
  timerEnabled,
  duration,
  onTimerChange,
  onDurationChange,
}: HomeSessionCardTimerRowProps): ReactElement {
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
              {timerEnabled ? intl.formatMessage(messages.on, { duration }) : intl.formatMessage(messages.off)}
            </p>
            <p className="text-muted mt-0.5 text-xs">{intl.formatMessage(messages.toggleDesc)}</p>
          </div>
          <Switch isSelected={timerEnabled} onChange={onTimerChange} aria-label={intl.formatMessage(messages.label)}>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch>
        </div>
        {/* Duration picker — rendered only when timer is enabled to keep focusable elements out of the DOM when hidden */}
        {timerEnabled && (
          <div
            role="radiogroup"
            aria-label={intl.formatMessage(messages.timePerNote)}
            className="border-border bg-surface-secondary mt-3.5 grid grid-cols-4 gap-1.5 overflow-hidden rounded-xl border p-1"
          >
            {DURATIONS.map((d) => {
              const isActive = duration === d;
              return (
                <button
                  key={d}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => onDurationChange(d)}
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
                  {d}s
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
