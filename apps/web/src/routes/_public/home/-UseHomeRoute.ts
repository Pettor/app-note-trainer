import { useNavigate } from "@tanstack/react-router";
import type { HomeViewProps } from "~/views/home/HomeView";

export function useHomeRoute(): HomeViewProps {
  const navigate = useNavigate();

  function onStart(): void {
    void navigate({ to: "/practice" });
  }

  return { onStart };
}
