import type { ReactElement } from "react";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";
import { Navbar } from "@package/ui";
import { useIntl } from "react-intl";

export interface NavbarContentProps {
  onSettings: () => void;
}

export function NavbarContent({ onSettings }: NavbarContentProps): ReactElement {
  const intl = useIntl();

  return (
    <Navbar
      title={intl.formatMessage({
        description: "NavbarContent: heading - app title in navbar",
        defaultMessage: "Note Trainer",
        id: "vgczFU",
      })}
      endElement={
        <Button
          variant="ghost"
          size="sm"
          onPress={onSettings}
          data-testid="home-page__settings-button"
          aria-label={intl.formatMessage({
            description: "NavbarContent: aria-label - open settings button",
            defaultMessage: "Settings",
            id: "O33v+w",
          })}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </Button>
      }
    />
  );
}
