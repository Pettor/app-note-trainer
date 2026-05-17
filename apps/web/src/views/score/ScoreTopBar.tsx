import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";
import { Logo } from "@package/ui";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  appName: {
    id: "+SROuu",
    description: "ScoreTopBar: app name",
    defaultMessage: "Note Trainer",
  },
  sessionComplete: {
    id: "Mmy4Qa",
    description: "ScoreTopBar: subtitle section label",
    defaultMessage: "Session complete",
  },
  close: {
    id: "O4jLob",
    description: "ScoreTopBar: close button aria-label",
    defaultMessage: "Close",
  },
});

export interface ScoreTopBarProps {
  keyName: string;
  scaleType: string;
  onExit: () => void;
}

export function ScoreTopBar({ keyName, scaleType, onExit }: ScoreTopBarProps): ReactElement {
  const intl = useIntl();

  return (
    <header
      className="border-separator sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b px-4 sm:h-16 sm:px-6"
      style={{ background: "color-mix(in oklab, var(--background) 80%, transparent)", backdropFilter: "blur(12px)" }}
    >
      {/* Left: logo + title/key info */}
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="shrink-0">
          <Logo size="small" />
        </div>

        {/* Desktop: title + subtitle */}
        <div className="hidden flex-col leading-tight sm:flex">
          <span className="text-foreground text-sm font-bold tracking-tight">
            {intl.formatMessage(messages.appName)}
          </span>
          <span className="text-muted flex items-center gap-1.5 text-[11px]">
            {intl.formatMessage(messages.sessionComplete)}
            <span aria-hidden="true" className="opacity-40">
              ·
            </span>
            <span
              className="font-semibold"
              style={{
                background: "var(--brand-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {keyName} {scaleType}
            </span>
          </span>
        </div>

        {/* Mobile: compact key chip */}
        <div className="border-border bg-surface flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold sm:hidden">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: "var(--brand-gradient)" }}
            aria-hidden="true"
          />
          <span
            style={{
              background: "var(--brand-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {keyName} {scaleType}
          </span>
        </div>
      </div>

      {/* Right: close button */}
      <Button isIconOnly variant="ghost" size="sm" onPress={onExit} aria-label={intl.formatMessage(messages.close)}>
        <XMarkIcon className="h-5 w-5" />
      </Button>
    </header>
  );
}
