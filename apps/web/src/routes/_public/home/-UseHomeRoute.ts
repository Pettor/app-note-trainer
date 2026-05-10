import type { HomeViewProps } from "~/views/home/HomeView";

export function useHomeRoute(): HomeViewProps {
  function onStart(): void {
    // Navigation to practice screen will be wired up when that feature is implemented.
  }

  return { onStart };
}
