import { useState } from "react";
import type { ReactElement } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
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

      {/* Customize disclosure trigger */}
      <button
        type="button"
        aria-expanded={customizeOpen}
        onClick={() => setCustomizeOpen((prev) => !prev)}
        className="text-muted mx-6 mb-4.5 flex w-[calc(100%-48px)] cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-3 text-xs font-medium transition-all duration-150"
        style={{ borderColor: "var(--border)", background: "transparent" }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.color = "var(--foreground)";
          el.style.borderColor = "color-mix(in oklab, var(--accent) 40%, var(--border))";
          el.style.background = "var(--surface-secondary)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.color = "";
          el.style.borderColor = "var(--border)";
          el.style.background = "transparent";
        }}
      >
        {customizeOpen ? intl.formatMessage(messages.customizeClose) : intl.formatMessage(messages.customizeOpen)}
        <ChevronDownIcon
          className="h-3.5 w-3.5 transition-transform duration-250"
          style={{ transform: customizeOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        />
      </button>

      {/* Customize panel */}
      <div
        style={{
          maxHeight: customizeOpen ? 1400 : 0,
          opacity: customizeOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease, opacity 0.25s ease",
        }}
      >
        <div
          className="border-separator px-6 pb-2"
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
      </div>

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
