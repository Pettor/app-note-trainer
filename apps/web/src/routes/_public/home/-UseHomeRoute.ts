import { useAppInfo } from "~/core/config/UseAppInfo";
import type { HomeViewProps } from "~/views/home/HomeView";

export function useHomeRoute(): HomeViewProps {
  const { appName } = useAppInfo();

  return {
    appName,
  };
}
