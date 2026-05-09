import type { ReactElement } from "react";
import { NavbarContent } from "./NavbarContent";
import { useNavbarContentController } from "./UseNavbarContentController";

export function NavbarContentController(): ReactElement {
  const props = useNavbarContentController();
  return <NavbarContent {...props} />;
}
