import type { NavbarContentProps } from "./NavbarContent";
import { useSettingsModal } from "~/core/settings/UseSettingsModal";

export function useNavbarContentController(): NavbarContentProps {
  const { open } = useSettingsModal();

  return {
    onSettings: () => open("appearance"),
  };
}
