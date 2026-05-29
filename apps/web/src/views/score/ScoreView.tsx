import type { ReactElement } from "react";
import { BoltIcon, CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";
import { defineMessages, useIntl } from "react-intl";
import { ScoreAwardCard } from "./ScoreAwardCard";
import { ScoreHeroCard } from "./ScoreHeroCard";
import { ScoreMissDetail } from "./ScoreMissDetail";
import { ScoreMissList } from "./ScoreMissList";
import { ScoreStatTile } from "./ScoreStatTile";
import { ScoreTopBar } from "./ScoreTopBar";
import { useScoreView } from "./UseScoreView";
import type { MissRecord } from "~/core/game/GameLoop";
import type { KeySignatureInfo } from "~/core/game/MusicScale";
import type { Staff } from "~/core/practice-settings/PracticeSettings";
import { useViewport } from "~/core/UseViewport";

const messages = defineMessages({
  totalTime: {
    id: "JrTIo7",
    description: "ScoreView: total time stat label",
    defaultMessage: "Total time",
  },
  totalTimeSub: {
    id: "Qx8qNK",
    description: "ScoreView: avg per note sub-label",
    defaultMessage: "{avg}s per note",
  },
  fastestAnswer: {
    id: "QhY7Th",
    description: "ScoreView: fastest answer stat label",
    defaultMessage: "Fastest answer",
  },
  fastestSub: {
    id: "f4TfQt",
    description: "ScoreView: fastest answer sub-label",
    defaultMessage: "Best this run",
  },
  missesLabel: {
    id: "Q/5Ad5",
    description: "ScoreView: misses count label",
    defaultMessage: "Misses",
  },
  missesSubClean: {
    id: "kpKCFR",
    description: "ScoreView: misses sub-label when zero",
    defaultMessage: "Clean run",
  },
  missesSubReview: {
    id: "Z1ld6Y",
    description: "ScoreView: misses sub-label when non-zero",
    defaultMessage: "Tap to review",
  },
  backToHome: {
    id: "3VVHHD",
    description: "ScoreView: back to home button",
    defaultMessage: "Back to home",
  },
  practiceAgain: {
    id: "GGwGY2",
    description: "ScoreView: practice again button",
    defaultMessage: "Practice again",
  },
});

function formatTotalTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds - mins * 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export interface ScoreViewProps {
  staff: Staff;
  keyName: string;
  scaleType: string;
  keySignature: KeySignatureInfo;
  totalNotes: number;
  correctCount: number;
  misses: MissRecord[];
  totalTime: number;
  fastestCorrect: number;
  onExit: () => void;
  onPlayAgain: () => void;
}

export function ScoreView({
  staff,
  keyName,
  scaleType,
  keySignature,
  totalNotes,
  correctCount,
  misses,
  totalTime,
  fastestCorrect,
  onExit,
  onPlayAgain,
}: ScoreViewProps): ReactElement {
  const intl = useIntl();
  const { isPhone } = useViewport();
  const { selectedMissIndex, setSelectedMissIndex } = useScoreView(misses.length);

  const perfect = misses.length === 0;
  const avgTime = totalTime > 0 ? totalTime / Math.max(1, totalNotes) : 0;
  const fastestLabel = Number.isFinite(fastestCorrect) ? `${fastestCorrect.toFixed(1)}s` : "—";
  const selectedMiss = misses[selectedMissIndex];

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden">
      {/* Gradient bloom background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 80% -10%, color-mix(in oklab, var(--brand-grad-3) 16%, transparent), transparent 70%),
            radial-gradient(ellipse 70% 50% at -10% 110%, color-mix(in oklab, var(--brand-grad-1) 14%, transparent), transparent 65%),
            var(--background)
          `,
        }}
      />

      <ScoreTopBar keyName={keyName} scaleType={scaleType} onExit={onExit} />

      <main className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-3.5 sm:gap-4.5 sm:px-7 sm:py-5">
        <ScoreHeroCard correctCount={correctCount} totalNotes={totalNotes} perfect={perfect} />

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <ScoreStatTile
            label={intl.formatMessage(messages.totalTime)}
            value={formatTotalTime(totalTime)}
            sub={intl.formatMessage(messages.totalTimeSub, { avg: avgTime.toFixed(1) })}
            tone="default"
            icon={<ClockIcon className="h-3 w-3" />}
          />
          <ScoreStatTile
            label={intl.formatMessage(messages.fastestAnswer)}
            value={fastestLabel}
            sub={intl.formatMessage(messages.fastestSub)}
            tone="warning"
            icon={<BoltIcon className="h-3 w-3" />}
          />
          <ScoreStatTile
            label={intl.formatMessage(messages.missesLabel)}
            value={String(misses.length)}
            sub={perfect ? intl.formatMessage(messages.missesSubClean) : intl.formatMessage(messages.missesSubReview)}
            tone={perfect ? "success" : "danger"}
            icon={perfect ? <CheckIcon className="h-3 w-3" /> : <XMarkIcon className="h-3 w-3" />}
          />
        </div>

        {/* Review or award section */}
        <div className="flex min-h-0 flex-1 flex-col">
          {perfect ? (
            <ScoreAwardCard fastestCorrect={fastestCorrect} />
          ) : (
            <div
              className={isPhone ? "flex flex-col gap-2.5" : "grid min-h-0 flex-1 gap-3.5"}
              style={!isPhone ? { gridTemplateColumns: "280px 1fr" } : undefined}
            >
              <ScoreMissList
                misses={misses}
                selectedIndex={selectedMissIndex}
                onSelect={setSelectedMissIndex}
                compact={isPhone}
              />
              {selectedMiss && (
                <ScoreMissDetail
                  miss={selectedMiss}
                  staff={staff}
                  keyName={keyName}
                  keySignature={keySignature}
                  isMobile={isPhone}
                />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer actions */}
      <footer className="shrink-0 px-3 pb-3 sm:px-7 sm:pb-5" style={{ borderTop: "1px solid var(--border)" }}>
        <div className={`mx-auto flex max-w-3xl gap-2.5 pt-3 ${isPhone ? "flex-row" : "justify-end"}`}>
          <Button
            variant="outline"
            onPress={onExit}
            className="rounded-xl font-semibold"
            style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
          >
            {intl.formatMessage(messages.backToHome)}
          </Button>
          <Button
            onPress={onPlayAgain}
            className="rounded-xl font-bold"
            style={{
              background: "var(--brand-gradient)",
              color: "white",
              border: "none",
              boxShadow: "0 10px 24px -10px oklch(0.66 0.235 15 / 0.7)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            {intl.formatMessage(messages.practiceAgain)}
          </Button>
        </div>
      </footer>
    </div>
  );
}
