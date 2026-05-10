import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";
import { HomeSessionCardDifficultyRow } from "./HomeSessionCardDifficultyRow";
import { HomeSessionCardSharpsRow } from "./HomeSessionCardSharpsRow";
import { HomeSessionCardStaffRow } from "./HomeSessionCardStaffRow";
import { HomeSessionCardSummary } from "./HomeSessionCardSummary";
import { HomeSessionCardTimerRow } from "./HomeSessionCardTimerRow";
import { useHomeSessionCard } from "./UseHomeSessionCard";

const messages = defineMessages({
  cardTitle: {
    id: "cLcs1f",
    description: "HomeSessionCard: card heading",
    defaultMessage: "Session setup",
  },
  cardSub: {
    id: "W+SA5i",
    description: "HomeSessionCard: card subtitle",
    defaultMessage: "Adjust to match where you're at today.",
  },
});

export function HomeSessionCard(): ReactElement {
  const intl = useIntl();
  const {
    difficulty,
    staff,
    sharps,
    timerEnabled,
    duration,
    onDifficultyChange,
    onStaffChange,
    onSharpsChange,
    onTimerChange,
    onDurationChange,
  } = useHomeSessionCard();

  return (
    <div
      className="border-border bg-surface overflow-hidden rounded-[22px] border"
      style={{ boxShadow: "0 6px 16px rgba(15,12,30,0.06), 0 16px 40px rgba(15,12,30,0.06)" }}
    >
      <div className="flex items-center justify-between px-6 pt-5 pb-3.5">
        <div>
          <p className="text-base font-semibold tracking-tight">{intl.formatMessage(messages.cardTitle)}</p>
          <p className="text-muted text-xs">{intl.formatMessage(messages.cardSub)}</p>
        </div>
      </div>

      <div className="px-6 pb-2">
        <HomeSessionCardDifficultyRow difficulty={difficulty} onDifficultyChange={onDifficultyChange} />
        <HomeSessionCardStaffRow staff={staff} onStaffChange={onStaffChange} />
        <HomeSessionCardSharpsRow sharps={sharps} onSharpsChange={onSharpsChange} />
        <HomeSessionCardTimerRow
          timerEnabled={timerEnabled}
          duration={duration}
          onTimerChange={onTimerChange}
          onDurationChange={onDurationChange}
        />
      </div>

      <HomeSessionCardSummary
        difficulty={difficulty}
        staff={staff}
        sharps={sharps}
        timerEnabled={timerEnabled}
        duration={duration}
      />
    </div>
  );
}
