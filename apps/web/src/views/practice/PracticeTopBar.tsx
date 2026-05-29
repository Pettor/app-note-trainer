import type { ReactElement } from "react";
import { PauseIcon, PlayIcon, SpeakerWaveIcon, SpeakerXMarkIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";
import { Logo } from "@package/ui";
import { useAtom } from "jotai";
import { defineMessages, useIntl } from "react-intl";
import { audioEnabledAtom } from "~/core/audio/AudioAtoms";

const messages = defineMessages({
  appName: {
    id: "CsRq0D",
    description: "PracticeTopBar: app name",
    defaultMessage: "Note Trainer",
  },
  practiceLabel: {
    id: "PtiodF",
    description: "PracticeTopBar: section label shown next to key",
    defaultMessage: "Practice",
  },
  pause: {
    id: "q4clBu",
    description: "PracticeTopBar: pause button aria-label",
    defaultMessage: "Pause",
  },
  resume: {
    id: "DyBB/d",
    description: "PracticeTopBar: resume button aria-label",
    defaultMessage: "Resume",
  },
  end: {
    id: "b61ZRw",
    description: "PracticeTopBar: end practice button aria-label",
    defaultMessage: "End practice",
  },
  audioOn: {
    id: "/oBozO",
    description: "PracticeTopBar: mute audio button aria-label",
    defaultMessage: "Mute audio",
  },
  audioOff: {
    id: "BTGetE",
    description: "PracticeTopBar: unmute audio button aria-label",
    defaultMessage: "Unmute audio",
  },
});

/** Shared by PracticeTopBar and PracticeCompactMenu */
export interface PracticeSessionControls {
  keyName: string;
  scaleType: string;
  isPaused: boolean;
  onPause: () => void;
  onExit: () => void;
  hideScaleInfo?: boolean;
}

export type PracticeTopBarProps = PracticeSessionControls;

export function PracticeTopBar({
  keyName,
  scaleType,
  isPaused,
  onPause,
  onExit,
  hideScaleInfo = false,
}: PracticeTopBarProps): ReactElement {
  const intl = useIntl();
  const [audioEnabled, setAudioEnabled] = useAtom(audioEnabledAtom);

  return (
    <header
      className="border-separator sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b px-4 sm:h-16 sm:px-6"
      style={{ background: "color-mix(in oklab, var(--background) 80%, transparent)", backdropFilter: "blur(12px)" }}
    >
      {/* Left: logo + title/key info */}
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="shrink-0">
          <Logo size="small" />
        </div>

        {/* Desktop: title + subtitle */}
        <div className="hidden flex-col leading-tight sm:flex">
          <span className="text-foreground text-sm font-bold tracking-tight">
            {intl.formatMessage(messages.appName)}
          </span>
          <span className="text-muted flex items-center gap-1.5 text-[11px]">
            {intl.formatMessage(messages.practiceLabel)}
            {!hideScaleInfo && (
              <>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span
                  className="font-semibold"
                  style={{
                    background: "var(--brand-gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {keyName} {scaleType}
                </span>
              </>
            )}
          </span>
        </div>

        {/* Mobile: compact key chip */}
        {!hideScaleInfo && (
          <div className="border-border bg-surface flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold sm:hidden">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: "var(--brand-gradient)" }}
              aria-hidden="true"
            />
            <span
              style={{
                background: "var(--brand-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {keyName} {scaleType}
            </span>
          </div>
        )}
      </div>

      {/* Right: audio toggle, pause, exit */}
      <div className="flex items-center gap-1.5">
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          onPress={() => setAudioEnabled((v) => !v)}
          aria-label={intl.formatMessage(audioEnabled ? messages.audioOn : messages.audioOff)}
        >
          {audioEnabled ? <SpeakerWaveIcon className="h-5 w-5" /> : <SpeakerXMarkIcon className="h-5 w-5 opacity-50" />}
        </Button>
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          onPress={onPause}
          aria-label={intl.formatMessage(isPaused ? messages.resume : messages.pause)}
        >
          {isPaused ? <PlayIcon className="h-5 w-5" /> : <PauseIcon className="h-5 w-5" />}
        </Button>
        <Button isIconOnly variant="ghost" size="sm" onPress={onExit} aria-label={intl.formatMessage(messages.end)}>
          <XMarkIcon className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
