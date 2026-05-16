import { useState } from "react";
import type { ReactElement } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Accordion } from "@heroui/react";
import { defineMessages, useIntl } from "react-intl";
import { HomeSessionCardDifficultyRow } from "./HomeSessionCardDifficultyRow";
import { HomeSessionCardGuessScaleRow } from "./HomeSessionCardGuessScaleRow";
import { HomeSessionCardLedgerRow } from "./HomeSessionCardLedgerRow";
import { HomeSessionCardNoteRangeRow } from "./HomeSessionCardNoteRangeRow";
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
    id: "nPmGCP",
    description: "HomeSessionCard: card subtitle",
    defaultMessage: "Pick a preset, or customize.",
  },
  customizeOpen: {
    id: "m9QTl8",
    description: "HomeSessionCard: customize disclosure trigger label (collapsed)",
    defaultMessage: "Customize individual settings",
  },
  customizeClose: {
    id: "f9wPcc",
    description: "HomeSessionCard: customize disclosure trigger label (expanded)",
    defaultMessage: "Hide individual settings",
  },
});

export function HomeSessionCard(): ReactElement {
  const intl = useIntl();
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const {
    difficulty,
    staff,
    noteRange,
    ledgerLines,
    ledgerDepth,
    sharps,
    timerEnabled,
    duration,
    guessScaleFirst,
    onDifficultyChange,
    onStaffChange,
    onNoteRangeChange,
    onLedgerLinesChange,
    onLedgerDepthChange,
    onSharpsChange,
    onTimerChange,
    onDurationChange,
    onGuessScaleFirstChange,
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
      </div>

      {/* Customize disclosure trigger + panel */}
      <Accordion hideSeparator className="p-0 shadow-none">
        <Accordion.Item id="customize" isExpanded={customizeOpen} onExpandedChange={setCustomizeOpen} className="p-0">
          <Accordion.Heading className="mx-6 mb-4.5 p-0">
            <Accordion.Trigger
              data-testid="customize-settings-trigger"
              className="text-muted hover:bg-surface-secondary flex w-full items-center justify-center gap-2 rounded-xl border border-dashed bg-transparent px-4 py-3 text-xs font-medium transition-all duration-150 hover:text-(--foreground)"
              style={{ borderColor: "var(--border)" }}
            >
              {customizeOpen ? intl.formatMessage(messages.customizeClose) : intl.formatMessage(messages.customizeOpen)}
              <Accordion.Indicator>
                <ChevronDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <div
              className="px-6 pb-2"
              style={{
                borderTop: "1px solid var(--separator)",
                background: "linear-gradient(180deg, var(--surface-secondary), var(--surface) 40px)",
              }}
            >
              <HomeSessionCardNoteRangeRow noteRange={noteRange} onNoteRangeChange={onNoteRangeChange} />
              <HomeSessionCardLedgerRow
                ledgerLines={ledgerLines}
                ledgerDepth={ledgerDepth}
                onLedgerLinesChange={onLedgerLinesChange}
                onLedgerDepthChange={onLedgerDepthChange}
              />
              <HomeSessionCardTimerRow
                timerEnabled={timerEnabled}
                duration={duration}
                onTimerChange={onTimerChange}
                onDurationChange={onDurationChange}
              />
              <HomeSessionCardSharpsRow sharps={sharps} onSharpsChange={onSharpsChange} />
              <HomeSessionCardGuessScaleRow
                guessScaleFirst={guessScaleFirst}
                onGuessScaleFirstChange={onGuessScaleFirstChange}
              />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <HomeSessionCardSummary
        staff={staff}
        noteRange={noteRange}
        ledgerLines={ledgerLines}
        ledgerDepth={ledgerDepth}
        sharps={sharps}
        timerEnabled={timerEnabled}
        duration={duration}
        guessScaleFirst={guessScaleFirst}
      />
    </div>
  );
}
