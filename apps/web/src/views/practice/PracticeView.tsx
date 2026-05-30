import type { ReactElement } from "react";
import clsx from "clsx";
import { PracticeCompactMenu } from "./PracticeCompactMenu";
import { PracticeGuessScale } from "./PracticeGuessScale";
import { PracticePausedOverlay } from "./PracticePausedOverlay";
import { PracticeStaffCard } from "./PracticeStaffCard";
import { PracticeStatsStrip } from "./PracticeStatsStrip";
import { PracticeTopBar } from "./PracticeTopBar";
import type { StaffNoteData } from "~/components/display/sheet-music-staff/UseSheetMusicStaff";
import { PianoKeyboard } from "~/components/input/piano-keyboard/PianoKeyboard";
import type { PianoKeyData } from "~/components/input/piano-keyboard/UsePianoKeyboard";
import type { KeySignatureInfo, Scale } from "~/core/game/MusicScale";
import { getSlotRange } from "~/core/game/NotePool";
import type { PracticeSettings } from "~/core/practice-settings/PracticeSettings";
import { useViewport } from "~/core/UseViewport";

export interface PracticeViewProps {
  settings: PracticeSettings;
  onKeyPress: (key: PianoKeyData) => void;
  onPause: () => void;
  onExit: () => void;
  isPaused?: boolean;
  keyName?: string;
  scaleType?: string;
  keySignature?: KeySignatureInfo;
  remaining?: number;
  notesCompleted?: number;
  totalNotes?: number;
  correctCount?: number;
  wrongCount?: number;
  countdown?: number | null;
  currentNote?: StaffNoteData | null;
  scale?: Scale;
  scaleChoices?: Scale[];
  guessedScale?: Scale | null;
  scaleGuessCorrect?: boolean | null;
  onScaleGuess?: (scale: Scale) => void;
  hideScaleInfo?: boolean;
}

export function PracticeView({
  settings,
  onKeyPress,
  onPause,
  onExit,
  isPaused = false,
  keyName = "C",
  scaleType = "major",
  keySignature,
  remaining = settings.duration,
  notesCompleted = 0,
  totalNotes = 20,
  correctCount = 0,
  wrongCount = 0,
  countdown = null,
  currentNote = null,
  scale,
  scaleChoices,
  guessedScale = null,
  scaleGuessCorrect,
  onScaleGuess,
  hideScaleInfo = false,
}: PracticeViewProps): ReactElement {
  const { isCompact, isPhone, isMinimal } = useViewport();
  const [minSlot, maxSlot] = getSlotRange(settings);

  // Fixed height that matches PianoKeyboard's total rendered size (keys + container padding),
  // so the staff card never changes height between note-guessing and scale-guessing states.
  const pianoTotalHeight = isMinimal ? "h-15" : isCompact ? "h-33" : isPhone ? "h-[106px]" : "h-41";

  return (
    <div
      className="relative flex h-dvh flex-col overflow-hidden"
      style={{ animation: "practice-fade-in 0.4s ease-out both" }}
    >
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

      {/* In compact/landscape mode the topbar is hidden — its controls move into PracticeCompactMenu */}
      {!isCompact && (
        <PracticeTopBar
          keyName={keyName}
          scaleType={scaleType}
          isPaused={isPaused}
          onPause={onPause}
          onExit={onExit}
          hideScaleInfo={hideScaleInfo}
        />
      )}

      <main
        className={clsx(
          "flex min-h-0 flex-1 flex-col px-3 sm:px-7",
          isCompact ? "gap-1 pt-1.5 pb-1" : "gap-3 pt-3 pb-3 sm:gap-4 sm:pt-5 sm:pb-4"
        )}
      >
        {isCompact ? (
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <PracticeStatsStrip
                remaining={remaining}
                totalTime={settings.duration}
                timerEnabled={settings.timerEnabled}
                notesCompleted={notesCompleted}
                totalNotes={totalNotes}
                correctCount={correctCount}
                wrongCount={wrongCount}
                scaleGuessCorrect={scaleGuessCorrect}
              />
            </div>
            <PracticeCompactMenu
              keyName={keyName}
              scaleType={scaleType}
              isPaused={isPaused}
              onPause={onPause}
              onExit={onExit}
              hideScaleInfo={hideScaleInfo}
            />
          </div>
        ) : (
          <PracticeStatsStrip
            remaining={remaining}
            totalTime={settings.duration}
            timerEnabled={settings.timerEnabled}
            notesCompleted={notesCompleted}
            totalNotes={totalNotes}
            correctCount={correctCount}
            wrongCount={wrongCount}
            scaleGuessCorrect={scaleGuessCorrect}
          />
        )}

        <PracticeStaffCard
          staff={settings.staff}
          keyName={keyName}
          keySignature={keySignature}
          note={currentNote}
          countdown={countdown}
          minSlot={minSlot}
          maxSlot={maxSlot}
          hideScaleName={hideScaleInfo}
        />
      </main>

      <footer className={clsx("shrink-0", isCompact ? "px-2 pb-1.5" : "px-3 pb-3 sm:px-7 sm:pb-6")}>
        <div className={clsx("mx-auto w-full max-w-3xl", pianoTotalHeight)}>
          {hideScaleInfo && scaleChoices && scale ? (
            <PracticeGuessScale
              choices={scaleChoices}
              correctScale={scale}
              guessedScale={guessedScale}
              onGuess={onScaleGuess ?? (() => {})}
            />
          ) : !hideScaleInfo ? (
            <PianoKeyboard onKeyPress={onKeyPress} className="w-full" />
          ) : null}
        </div>
      </footer>

      {isPaused && <PracticePausedOverlay onResume={onPause} onEnd={onExit} />}

      {/* Countdown pulse-ring animation */}
      <style>{`
        @keyframes practice-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes practice-pulse {
          0%   { transform: scale(0.95); opacity: 0.7; }
          70%  { transform: scale(1.12); opacity: 0;   }
          100% { transform: scale(1.12); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}
