import type { ReactElement } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/20/solid";
import { Cog6ToothIcon, PauseIcon, PlayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Popover, Separator } from "@heroui/react";
import { Logo } from "@package/ui";
import { useAtom } from "jotai";
import { defineMessages, useIntl } from "react-intl";
import type { PracticeSessionControls } from "./PracticeTopBar";
import { audioEnabledAtom } from "~/core/audio/AudioAtoms";

const messages = defineMessages({
  menuLabel: {
    id: "BYt0Jq",
    description: "PracticeCompactMenu: aria-label for the session menu button",
    defaultMessage: "Session menu",
  },
  appName: {
    id: "KfLXwP",
    description: "PracticeCompactMenu: app name (shared ID with PracticeTopBar)",
    defaultMessage: "Note Trainer",
  },
  practiceLabel: {
    id: "A5lQGI",
    description: "PracticeCompactMenu: section label (shared ID with PracticeTopBar)",
    defaultMessage: "Practice",
  },
  pause: {
    id: "HbUezZ",
    description: "PracticeCompactMenu: pause action (shared ID with PracticeTopBar)",
    defaultMessage: "Pause",
  },
  resume: {
    id: "Z9Fud2",
    description: "PracticeCompactMenu: resume action (shared ID with PracticeTopBar)",
    defaultMessage: "Resume",
  },
  end: {
    id: "uDyjB4",
    description: "PracticeCompactMenu: end practice action (shared ID with PracticeTopBar)",
    defaultMessage: "End practice",
  },
  audioOn: {
    id: "T81mvO",
    description: "PracticeCompactMenu: mute audio action",
    defaultMessage: "Mute audio",
  },
  audioOff: {
    id: "7HWbB9",
    description: "PracticeCompactMenu: unmute audio action",
    defaultMessage: "Unmute audio",
  },
});

export type PracticeCompactMenuProps = PracticeSessionControls;

export function PracticeCompactMenu({
  keyName,
  scaleType,
  isPaused,
  onPause,
  onExit,
}: PracticeCompactMenuProps): ReactElement {
  const intl = useIntl();
  const [audioEnabled, setAudioEnabled] = useAtom(audioEnabledAtom);

  return (
    <Popover>
      <Popover.Trigger>
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          aria-label={intl.formatMessage(messages.menuLabel)}
          className="shrink-0"
        >
          <Cog6ToothIcon className="h-4.5 w-4.5" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-52 overflow-hidden p-0">
        {/* Header — mirrors the topbar's logo + key info */}
        <div className="flex items-center gap-2.5 px-3 py-2.5">
          <div className="shrink-0">
            <Logo size="small" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="text-foreground text-sm font-bold">{intl.formatMessage(messages.appName)}</div>
            <div className="text-muted flex items-center gap-1 text-[11px]">
              {intl.formatMessage(messages.practiceLabel)}
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
            </div>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex flex-col gap-0.5 p-1.5">
          <Button variant="ghost" size="sm" onPress={() => setAudioEnabled((v) => !v)} className="w-full justify-start">
            {audioEnabled ? (
              <SpeakerWaveIcon className="h-4 w-4" />
            ) : (
              <SpeakerXMarkIcon className="h-4 w-4 opacity-50" />
            )}
            {intl.formatMessage(audioEnabled ? messages.audioOn : messages.audioOff)}
          </Button>
          <Button variant="ghost" size="sm" onPress={onPause} className="w-full justify-start">
            {isPaused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
            {intl.formatMessage(isPaused ? messages.resume : messages.pause)}
          </Button>
          <Button variant="ghost" size="sm" onPress={onExit} className="w-full justify-start">
            <XMarkIcon className="h-4 w-4" />
            {intl.formatMessage(messages.end)}
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  );
}
