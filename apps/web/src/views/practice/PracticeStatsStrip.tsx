import type { ReactElement } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { defineMessages, useIntl } from "react-intl";
import { PracticeCompactScoreChip } from "./PracticeCompactScoreChip";
import { PracticeNotesProgressChip } from "./PracticeNotesProgressChip";
import { PracticeStatChip } from "./PracticeStatChip";
import { PracticeTimeRing } from "./PracticeTimeRing";
import type { Duration } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  correct: {
    id: "X2lE/x",
    description: "PracticeStatsStrip: correct-count label",
    defaultMessage: "Correct",
  },
  streak: {
    id: "VbZykP",
    description: "PracticeStatsStrip: streak label",
    defaultMessage: "Streak",
  },
  missed: {
    id: "258Fi2",
    description: "PracticeStatsStrip: missed-notes label",
    defaultMessage: "Missed",
  },
});

export interface PracticeStatsStripProps {
  remaining: number;
  totalTime: Duration;
  timerEnabled: boolean;
  notesCompleted: number;
  totalNotes: number;
  correctCount: number;
  wrongCount: number;
  scaleGuessCorrect?: boolean | null;
}

export function PracticeStatsStrip({
  remaining,
  totalTime,
  timerEnabled,
  notesCompleted,
  totalNotes,
  correctCount,
  wrongCount,
  scaleGuessCorrect,
}: PracticeStatsStripProps): ReactElement {
  const intl = useIntl();
  const urgent = timerEnabled && remaining < 2;

  return (
    <>
      {/* Mobile strip */}
      <div className="flex items-stretch gap-2 sm:hidden">
        {timerEnabled && <PracticeTimeRing remaining={remaining} total={totalTime} urgent={urgent} />}
        <PracticeNotesProgressChip done={notesCompleted} total={totalNotes} scaleGuessCorrect={scaleGuessCorrect} />
        <PracticeCompactScoreChip correct={correctCount} wrong={wrongCount} />
      </div>
      {/* Desktop strip */}
      <div className="hidden items-stretch gap-2.5 sm:flex">
        {timerEnabled && <PracticeTimeRing remaining={remaining} total={totalTime} urgent={urgent} />}
        <PracticeNotesProgressChip done={notesCompleted} total={totalNotes} scaleGuessCorrect={scaleGuessCorrect} />
        <PracticeStatChip
          icon={<CheckIcon className="h-3.5 w-3.5" />}
          label={intl.formatMessage(messages.correct)}
          value={String(correctCount)}
          iconColor="var(--success)"
        />
        <PracticeStatChip
          icon={<XMarkIcon className="h-3.5 w-3.5" />}
          label={intl.formatMessage(messages.missed)}
          value={String(wrongCount)}
          iconColor="var(--danger)"
        />
      </div>
    </>
  );
}
