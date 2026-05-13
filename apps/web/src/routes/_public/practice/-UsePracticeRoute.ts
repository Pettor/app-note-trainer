import { usePracticeSettings } from "~/core/practice-settings/UsePracticeSettings";
import type { PracticeViewProps } from "~/views/practice/PracticeView";

export function usePracticeRoute(): PracticeViewProps {
  const { settings } = usePracticeSettings();

  function onKeyPress(): void {
    // Note checking logic will be wired up as practice logic is built out
  }

  return { settings, onKeyPress };
}
