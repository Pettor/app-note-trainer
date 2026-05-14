import type { ReactElement } from "react";
import { PauseIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  title: {
    id: "y+IUiV",
    description: "PracticePausedOverlay: paused state heading",
    defaultMessage: "Paused",
  },
  subtitle: {
    id: "JP/cda",
    description: "PracticePausedOverlay: paused state subtitle",
    defaultMessage: "Take a breath. Your timer is on hold.",
  },
  resume: {
    id: "hwKVrM",
    description: "PracticePausedOverlay: resume button label",
    defaultMessage: "Resume",
  },
  end: {
    id: "Tj9F8I",
    description: "PracticePausedOverlay: end practice button label",
    defaultMessage: "End practice",
  },
});

export interface PracticePausedOverlayProps {
  onResume: () => void;
  onEnd: () => void;
}

export function PracticePausedOverlay({ onResume, onEnd }: PracticePausedOverlayProps): ReactElement {
  const intl = useIntl();

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center"
      style={{
        background: "color-mix(in oklab, var(--background) 70%, transparent)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        className="mx-4 w-full max-w-xs rounded-[20px] p-7 text-center"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 60px -20px rgba(15,12,30,0.2)",
        }}
      >
        {/* Pause icon */}
        <div
          className="mx-auto mb-3.5 grid h-14 w-14 place-items-center rounded-full"
          style={{ background: "var(--brand-gradient)" }}
        >
          <PauseIcon className="h-5 w-5 text-white" />
        </div>

        <h2 className="text-foreground text-xl font-bold tracking-tight">{intl.formatMessage(messages.title)}</h2>
        <p className="text-muted mt-1 text-sm">{intl.formatMessage(messages.subtitle)}</p>

        <div className="mt-5 flex justify-center gap-2">
          <Button variant="outline" size="sm" onPress={onEnd}>
            {intl.formatMessage(messages.end)}
          </Button>
          <Button
            size="sm"
            onPress={onResume}
            style={{ background: "var(--brand-gradient)", color: "white", border: "none" }}
          >
            {intl.formatMessage(messages.resume)}
          </Button>
        </div>
      </div>
    </div>
  );
}
