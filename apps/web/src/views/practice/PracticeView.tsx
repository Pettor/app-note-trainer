import type { ReactElement } from "react";
import clsx from "clsx";
import { PracticeCompactMenu } from "./PracticeCompactMenu";
import { PracticePausedOverlay } from "./PracticePausedOverlay";
import { PracticeResultsOverlay } from "./PracticeResultsOverlay";
import { PracticeStaffCard } from "./PracticeStaffCard";
import { PracticeStatsStrip } from "./PracticeStatsStrip";
import { PracticeTopBar } from "./PracticeTopBar";
import type { StaffNoteData } from "~/components/display/sheet-music-staff/UseSheetMusicStaff";
import { PianoKeyboard } from "~/components/input/piano-keyboard/PianoKeyboard";
import type { PianoKeyData } from "~/components/input/piano-keyboard/UsePianoKeyboard";
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
  remaining?: number;
  notesCompleted?: number;
  totalNotes?: number;
  correctCount?: number;
  wrongCount?: number;
  countdown?: number | null;
  currentNote?: StaffNoteData | null;
  isFinished?: boolean;
  onFinish?: () => void;
}

export function PracticeView({
  settings,
  onKeyPress,
  onPause,
  onExit,
  isPaused = false,
  keyName = "C",
  scaleType = "major",
  remaining = settings.duration,
  notesCompleted = 0,
  totalNotes = 20,
  correctCount = 0,
  wrongCount = 0,
  countdown = null,
  currentNote = null,
  isFinished = false,
  onFinish,
}: PracticeViewProps): ReactElement {
  const { isCompact } = useViewport();
  const [minSlot, maxSlot] = getSlotRange(settings);

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

      {/* In compact/landscape mode the topbar is hidden — its controls move into PracticeCompactMenu */}
      {!isCompact && (
        <PracticeTopBar keyName={keyName} scaleType={scaleType} isPaused={isPaused} onPause={onPause} onExit={onExit} />
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
              />
            </div>
            <PracticeCompactMenu
              keyName={keyName}
              scaleType={scaleType}
              isPaused={isPaused}
              onPause={onPause}
              onExit={onExit}
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
          />
        )}

        <PracticeStaffCard
          staff={settings.staff}
          keyName={keyName}
          note={currentNote}
          countdown={countdown}
          minSlot={minSlot}
          maxSlot={maxSlot}
        />
      </main>

      <footer className={clsx("shrink-0", isCompact ? "px-2 pb-1.5" : "px-3 pb-3 sm:px-7 sm:pb-6")}>
        <div className="mx-auto w-full max-w-3xl">
          <PianoKeyboard onKeyPress={onKeyPress} className="w-full" />
        </div>
      </footer>

      {isPaused && <PracticePausedOverlay onResume={onPause} onEnd={onExit} />}
      {isFinished && (
        <PracticeResultsOverlay
          totalNotes={totalNotes}
          correctCount={correctCount}
          wrongCount={wrongCount}
          onExit={onFinish ?? onExit}
        />
      )}

      {/* Countdown pulse-ring animation */}
      <style>{`
        @keyframes practice-pulse {
          0%   { transform: scale(0.95); opacity: 0.7; }
          70%  { transform: scale(1.12); opacity: 0;   }
          100% { transform: scale(1.12); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}
