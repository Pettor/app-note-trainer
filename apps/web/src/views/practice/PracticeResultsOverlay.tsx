import type { ReactElement } from "react";
import { CheckIcon, TrophyIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  title: {
    id: "uJHx2k",
    description: "PracticeResultsOverlay: session finished heading",
    defaultMessage: "Session complete!",
  },
  accuracy: {
    id: "2LZwFM",
    description: "PracticeResultsOverlay: accuracy label",
    defaultMessage: "Accuracy",
  },
  correct: {
    id: "sWsXj7",
    description: "PracticeResultsOverlay: correct notes label",
    defaultMessage: "Correct",
  },
  missed: {
    id: "6ahXMM",
    description: "PracticeResultsOverlay: missed notes label",
    defaultMessage: "Missed",
  },
  exit: {
    id: "zgXOrF",
    description: "PracticeResultsOverlay: exit to home button label",
    defaultMessage: "Back to home",
  },
});

export interface PracticeResultsOverlayProps {
  totalNotes: number;
  correctCount: number;
  wrongCount: number;
  onExit: () => void;
}

export function PracticeResultsOverlay({
  totalNotes,
  correctCount,
  wrongCount,
  onExit,
}: PracticeResultsOverlayProps): ReactElement {
  const intl = useIntl();
  const accuracy = totalNotes > 0 ? Math.round((correctCount / totalNotes) * 100) : 0;

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
        <div
          className="mx-auto mb-3.5 grid h-14 w-14 place-items-center rounded-full"
          style={{ background: "var(--brand-gradient)" }}
        >
          <TrophyIcon className="h-5 w-5 text-white" />
        </div>

        <h2 className="text-foreground text-xl font-bold tracking-tight">{intl.formatMessage(messages.title)}</h2>

        <p className="text-foreground mt-3 text-3xl font-bold tabular-nums">{accuracy}%</p>
        <p className="text-muted text-xs font-semibold tracking-[0.12em] uppercase">
          {intl.formatMessage(messages.accuracy)}
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1">
              <CheckIcon className="h-4 w-4" style={{ color: "var(--success)" }} />
              <span className="text-foreground text-lg font-bold tabular-nums">{correctCount}</span>
            </div>
            <span className="text-muted text-[11px]">{intl.formatMessage(messages.correct)}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1">
              <XMarkIcon className="h-4 w-4" style={{ color: "var(--danger)" }} />
              <span className="text-foreground text-lg font-bold tabular-nums">{wrongCount}</span>
            </div>
            <span className="text-muted text-[11px]">{intl.formatMessage(messages.missed)}</span>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <Button
            size="sm"
            onPress={onExit}
            style={{ background: "var(--brand-gradient)", color: "white", border: "none" }}
          >
            {intl.formatMessage(messages.exit)}
          </Button>
        </div>
      </div>
    </div>
  );
}
