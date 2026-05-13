import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";
import { SheetMusicStaff } from "~/components/display/sheet-music-staff/SheetMusicStaff";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { PianoKeyboard } from "~/components/input/piano-keyboard/PianoKeyboard";
import type { PianoKeyData } from "~/components/input/piano-keyboard/UsePianoKeyboard";
import { NavbarContentController } from "~/components/navigation/navbar-content/NavbarContentController";
import type { PracticeSettings } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  staffAreaLabel: {
    id: "RKcQ/e",
    description: "PracticeView: aria-label for the main staff display area",
    defaultMessage: "Note to identify",
  },
});

export interface PracticeViewProps {
  settings: PracticeSettings;
  onKeyPress: (key: PianoKeyData) => void;
}

export function PracticeView({ settings, onKeyPress }: PracticeViewProps): ReactElement {
  const intl = useIntl();

  return (
    <>
      <SettingsModalController />
      <div className="bg-background flex h-dvh flex-col">
        <NavbarContentController />
        <main
          className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-4 py-4 sm:py-6"
          aria-label={intl.formatMessage(messages.staffAreaLabel)}
        >
          <SheetMusicStaff staff={settings.staff} className="w-full max-w-2xl" />
        </main>
        <div className="shrink-0 px-3 pb-3 sm:px-4 sm:pb-4">
          <PianoKeyboard onKeyPress={onKeyPress} className="w-full" />
        </div>
      </div>
    </>
  );
}
