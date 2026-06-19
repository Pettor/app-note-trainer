import { useState } from "react";
import type { ReactElement } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Accordion, Surface } from "@heroui/react";
import { defineMessages, useIntl } from "react-intl";
import { HomeSessionCardAccidentalsRow } from "./HomeSessionCardAccidentalsRow";
import { HomeSessionCardDifficultyRow } from "./HomeSessionCardDifficultyRow";
import { HomeSessionCardLedgerRow } from "./HomeSessionCardLedgerRow";
import { HomeSessionCardModeRow } from "./HomeSessionCardModeRow";
import { HomeSessionCardNoteRangeRow } from "./HomeSessionCardNoteRangeRow";
import { HomeSessionCardStaffRow } from "./HomeSessionCardStaffRow";
import { HomeSessionCardSummary } from "./HomeSessionCardSummary";
import { HomeSessionCardTimerRow } from "./HomeSessionCardTimerRow";
import { useHomeSessionCard } from "./UseHomeSessionCard";

const messages = defineMessages({
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
    mode,
    chordPool,
    noteRange,
    ledgerLines,
    ledgerDepth,
    sharps,
    naturals,
    timerEnabled,
    duration,
    guessScaleFirst,
    onDifficultyChange,
    onStaffChange,
    onModeChange,
    onChordPoolChange,
    onNoteRangeChange,
    onLedgerLinesChange,
    onLedgerDepthChange,
    onSharpsChange,
    onNaturalsChange,
    onTimerChange,
    onDurationChange,
    onGuessScaleFirstChange,
  } = useHomeSessionCard();

  return (
    <Surface
      variant="default"
      className="overflow-hidden rounded-[22px] border"
      style={{ boxShadow: "0 6px 16px rgba(15,12,30,0.06), 0 16px 40px rgba(15,12,30,0.06)" }}
    >
      <div className="px-6 pb-2">
        <HomeSessionCardDifficultyRow difficulty={difficulty} onDifficultyChange={onDifficultyChange} />
        <HomeSessionCardStaffRow staff={staff} onStaffChange={onStaffChange} />
        <HomeSessionCardModeRow
          mode={mode}
          chordPool={chordPool}
          onModeChange={onModeChange}
          onChordPoolChange={onChordPoolChange}
        />
      </div>

      {/* Customize disclosure trigger + panel */}
      <Accordion hideSeparator className="p-0 shadow-none">
        <Accordion.Item id="customize" isExpanded={customizeOpen} onExpandedChange={setCustomizeOpen} className="p-0">
          <Accordion.Heading className="mx-6 mb-4.5 p-0">
            <Accordion.Trigger
              data-testid="customize-settings-trigger"
              className="text-muted hover:bg-surface-secondary hover:text-foreground flex w-full items-center justify-center gap-2 rounded-xl border border-dashed bg-transparent px-4 py-3 text-xs font-medium transition-all duration-150"
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
              <HomeSessionCardAccidentalsRow
                sharps={sharps}
                guessScaleFirst={guessScaleFirst}
                naturals={naturals}
                onSharpsChange={onSharpsChange}
                onGuessScaleFirstChange={onGuessScaleFirstChange}
                onNaturalsChange={onNaturalsChange}
              />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <HomeSessionCardSummary
        staff={staff}
        mode={mode}
        chordPool={chordPool}
        noteRange={noteRange}
        ledgerLines={ledgerLines}
        ledgerDepth={ledgerDepth}
        sharps={sharps}
        naturals={naturals}
        timerEnabled={timerEnabled}
        duration={duration}
        guessScaleFirst={guessScaleFirst}
      />
    </Surface>
  );
}
