import type { ReactElement } from "react";
import { GithubIcon, GridBackground, LinkedInIcon, NavbarLayout } from "@package/ui";
import { HomeHero } from "./HomeHero";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { NavbarContentController } from "~/components/navigation/navbar-content/NavbarContentController";

const GITHUB_URL = "https://github.com/Pettor/app-note-trainer";
const LINKEDIN_URL = "https://www.linkedin.com/in/petter-hancock/";
const FOOTER_YEAR = new Date().getFullYear();

export interface HomeViewProps {
  appName: string;
}

export function HomeView({ appName }: HomeViewProps): ReactElement {
  return (
    <>
      <SettingsModalController />
      <NavbarLayout
        backgroundElement={<GridBackground />}
        navbarElement={<NavbarContentController />}
        footer
        footerText="Made with ♥ by Petter Hancock"
        footerCopyright={`© ${FOOTER_YEAR} Petter Hancock — All rights reserved`}
        footerContent={
          <div className="flex items-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted hover:text-foreground h-5 w-5 transition-colors"
            >
              <GithubIcon />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted hover:text-foreground h-5 w-5 transition-colors"
            >
              <LinkedInIcon />
            </a>
          </div>
        }
      >
        <HomeHero appName={appName} onStart={() => {}} />
      </NavbarLayout>
    </>
  );
}
