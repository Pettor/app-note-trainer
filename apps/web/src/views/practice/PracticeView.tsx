import type { ReactElement } from "react";
import { PracticePausedOverlay } from "./PracticePausedOverlay";
import { PracticeStaffCard } from "./PracticeStaffCard";
import { PracticeStatsStrip } from "./PracticeStatsStrip";
import { PracticeTopBar } from "./PracticeTopBar";
import type { StaffNoteData } from "~/components/display/sheet-music-staff/UseSheetMusicStaff";
import { PianoKeyboard } from "~/components/input/piano-keyboard/PianoKeyboard";
import type { PianoKeyData } from "~/components/input/piano-keyboard/UsePianoKeyboard";
import type { PracticeSettings } from "~/core/practice-settings/PracticeSettings";

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
  streak?: number;
  countdown?: number | null;
  currentNote?: StaffNoteData | null;
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
  streak = 0,
  countdown = null,
  currentNote = null,
}: PracticeViewProps): ReactElement {
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

      <PracticeTopBar keyName={keyName} scaleType={scaleType} isPaused={isPaused} onPause={onPause} onExit={onExit} />

      <main className="flex min-h-0 flex-1 flex-col gap-3 px-3 pt-3 pb-3 sm:gap-4 sm:px-7 sm:pt-5 sm:pb-4">
        <PracticeStatsStrip
          remaining={remaining}
          totalTime={settings.duration}
          timerEnabled={settings.timerEnabled}
          notesCompleted={notesCompleted}
          totalNotes={totalNotes}
          correctCount={correctCount}
          wrongCount={wrongCount}
          streak={streak}
        />

        <PracticeStaffCard staff={settings.staff} keyName={keyName} note={currentNote} countdown={countdown} />
      </main>

      <footer className="shrink-0 px-3 pb-3 sm:px-7 sm:pb-6">
        <PianoKeyboard onKeyPress={onKeyPress} className="w-full" />
      </footer>

      {isPaused && <PracticePausedOverlay onResume={onPause} onEnd={onExit} />}

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
