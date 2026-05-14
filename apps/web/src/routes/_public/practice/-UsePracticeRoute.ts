import { useNavigate } from "@tanstack/react-router";
import { usePracticeSettings } from "~/core/practice-settings/UsePracticeSettings";
import type { PracticeViewProps } from "~/views/practice/PracticeView";

export function usePracticeRoute(): PracticeViewProps {
  const { settings } = usePracticeSettings();
  const navigate = useNavigate();

  function onKeyPress(): void {
    // Note checking logic will be wired up as practice logic is built out
  }

  function onPause(): void {
    // Pause/resume logic will be wired up
  }

  function onExit(): void {
    void navigate({ to: "/home" });
  }

  return { settings, onKeyPress, onPause, onExit };
}
