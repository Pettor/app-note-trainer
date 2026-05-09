import type { ReactElement } from "react";
import { HomeIcon } from "@heroicons/react/20/solid";
import type { IntlShape } from "react-intl";

export interface NavMenuItem {
  id: string;
  name: string;
  href: string;
  icon: ReactElement;
  external?: boolean;
  children?: NavMenuItem[];
}

export function createNavMenuItems(intl: IntlShape): NavMenuItem[] {
  return [
    {
      id: "home",
      name: intl.formatMessage({
        description: "NavMenuItems: menu-item - home",
        defaultMessage: "Home",
        id: "dygLxQ",
      }),
      href: "#/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
  ];
}
