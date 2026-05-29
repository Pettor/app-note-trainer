import type { ReactElement } from "react";
import { Button } from "@heroui/react";
import clsx from "clsx";
import { defineMessages, useIntl } from "react-intl";
import { scaleDisplayName } from "~/core/game/MusicScale";
import type { Scale } from "~/core/game/MusicScale";
import { useViewport } from "~/core/UseViewport";

const messages = defineMessages({
  heading: {
    id: "V18C1a",
    description: "PracticeGuessScale: heading above the scale choice buttons",
    defaultMessage: "What scale is this?",
  },
  choiceAriaLabel: {
    id: "aZzg7/",
    description: "PracticeGuessScale: aria-label for a scale choice button",
    defaultMessage: "Guess {name}",
  },
});

export interface PracticeGuessScaleProps {
  choices: Scale[];
  correctScale: Scale;
  guessedScale: Scale | null;
  onGuess: (scale: Scale) => void;
}

function scaleId(s: Scale): string {
  return `${s.root}-${s.mode}`;
}

function scaleLabel(s: Scale): string {
  const { keyName, scaleType } = scaleDisplayName(s);
  return `${keyName} ${scaleType}`;
}

export function PracticeGuessScale({
  choices,
  correctScale,
  guessedScale,
  onGuess,
}: PracticeGuessScaleProps): ReactElement {
  const intl = useIntl();
  const { isCompact } = useViewport();
  const isResult = guessedScale !== null;
  const correctId = scaleId(correctScale);

  return (
    <div className={clsx("flex h-full flex-col justify-center", isCompact ? "gap-1.5" : "gap-2.5")}>
      <p
        className={clsx(
          "text-muted text-center font-mono font-semibold tracking-[0.12em] uppercase",
          isCompact ? "text-[9px]" : "text-[10px] sm:text-[11px]"
        )}
      >
        {intl.formatMessage(messages.heading)}
      </p>

      <div className={clsx("grid grid-cols-2", isCompact ? "gap-1.5" : "gap-2")}>
        {choices.map((choice) => {
          const cid = scaleId(choice);
          const isCorrect = cid === correctId;
          const isWrongGuess = isResult && scaleId(guessedScale) === cid && !isCorrect;
          const label = scaleLabel(choice);

          let colorStyle: React.CSSProperties = {};
          let variant: "solid" | "ghost" | "flat" = "flat";

          if (isResult) {
            if (isCorrect) {
              colorStyle = { background: "var(--success)", color: "var(--success-foreground)" };
              variant = "solid";
            } else if (isWrongGuess) {
              colorStyle = { background: "var(--danger)", color: "var(--danger-foreground)" };
              variant = "solid";
            } else {
              variant = "ghost";
            }
          }

          return (
            <Button
              key={cid}
              variant={variant}
              size={isCompact ? "sm" : "md"}
              isDisabled={isResult}
              onPress={() => onGuess(choice)}
              aria-label={intl.formatMessage(messages.choiceAriaLabel, { name: label })}
              className={clsx("w-full font-semibold", isResult && !isCorrect && !isWrongGuess && "opacity-40")}
              style={colorStyle}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
