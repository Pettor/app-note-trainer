import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { LogoFull } from "@package/ui";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  subtitle: {
    id: "er4kOS",
    description: "ScoreTopBar: subtitle shown under the logo (session complete + key info)",
    defaultMessage: "Session complete · {key} {scale}",
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
      className="flex shrink-0 items-center justify-between border-b px-4 py-3 sm:px-6 sm:py-3.5"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--background) 75%, transparent)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-3">
        <LogoFull className="h-7" />
        <div className="hidden h-4 w-px sm:block" style={{ background: "var(--border)" }} aria-hidden="true" />
        <p className="text-muted hidden text-xs font-semibold sm:block">
          {intl.formatMessage(messages.subtitle, { key: keyName, scale: scaleType })}
        </p>
      </div>
      <Button
        isIconOnly
        size="sm"
        variant="bordered"
        aria-label={intl.formatMessage(messages.close)}
        onPress={onExit}
        className="rounded-xl"
        style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--muted)" }}
      >
        <XMarkIcon className="h-4 w-4" />
      </Button>
    </header>
  );
}
