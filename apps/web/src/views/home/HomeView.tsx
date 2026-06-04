import type { ReactElement } from "react";
import { ArrowRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/react";
import { useEventListener } from "@package/react";
import { GithubIcon, LinkedInIcon, NavbarLayout } from "@package/ui";
import { defineMessages, useIntl } from "react-intl";
import { HomeHero } from "./HomeHero";
import { HomeSessionCard } from "./HomeSessionCard";
import { SettingsModalController } from "~/components/feedback/settings-modal/SettingsModalController";
import { NavbarContentController } from "~/components/navigation/navbar-content/NavbarContentController";

const messages = defineMessages({
  startButton: {
    id: "kYo92M",
    description: "HomeView: start training button label",
    defaultMessage: "Start training",
  },
  startButtonAriaLabel: {
    id: "dbTbIF",
    description: "HomeView: start training button aria-label",
    defaultMessage: "Start training session",
  },
  lastSessionLink: {
    id: "3nrlSL",
    description: "HomeView: last session link label",
    defaultMessage: "last session",
  },
  footerText: {
    id: "JnqaTk",
    description: "HomeView: footer credit text",
    defaultMessage: "Made with ♪ by Petter Hancock",
  },
  footerCopyright: {
    id: "BESlDU",
    description: "HomeView: footer copyright text",
    defaultMessage: "© {year} Petter Hancock — All rights reserved",
  },
  footerHomepage: {
    id: "SQ0GhH",
    description: "HomeView: Homepage link aria-label",
    defaultMessage: "Homepage",
  },
  footerGitHub: {
    id: "RLY9CG",
    description: "HomeView: GitHub link aria-label",
    defaultMessage: "GitHub",
  },
  footerLinkedIn: {
    id: "ISpncx",
    description: "HomeView: LinkedIn link aria-label",
    defaultMessage: "LinkedIn",
  },
});

const HOMEPAGE_URL = "https://petter.madebyhancock.com";
const GITHUB_URL = "https://github.com/Pettor";
const LINKEDIN_URL = "https://www.linkedin.com/in/petter-hancock/";
const FOOTER_YEAR = new Date().getFullYear();

export interface HomeViewProps {
  onStart: () => void;
}

export function HomeView({ onStart }: HomeViewProps): ReactElement {
  const intl = useIntl();

  useEventListener(typeof document !== "undefined" ? document : null, "keydown", (e: Event) => {
    const keyEvent = e as KeyboardEvent;
    const target = keyEvent.target as HTMLElement;
    const isInteractive = target.matches("input, textarea, button, select, [role=radio], [role=switch]");
    if (keyEvent.key === "Enter" && !isInteractive) {
      onStart();
    }
  });

  return (
    <>
      <SettingsModalController />
      <NavbarLayout
        navbarElement={<NavbarContentController />}
        footer
        footerText={intl.formatMessage(messages.footerText)}
        footerCopyright={intl.formatMessage(messages.footerCopyright, { year: FOOTER_YEAR })}
        footerContent={
          <div className="flex items-center gap-4">
            <a
              href={HOMEPAGE_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={intl.formatMessage(messages.footerHomepage)}
              className="text-muted hover:text-foreground h-5 w-5 transition-colors"
            >
              <HomeIcon />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={intl.formatMessage(messages.footerGitHub)}
              className="text-muted hover:text-foreground h-5 w-5 transition-colors"
            >
              <GithubIcon />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={intl.formatMessage(messages.footerLinkedIn)}
              className="text-muted hover:text-foreground h-5 w-5 transition-colors"
            >
              <LinkedInIcon />
            </a>
          </div>
        }
      >
        {/* Gradient bloom background decoration */}
        <div
          className="pointer-events-none fixed inset-0 z-10"
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 80% -10%, color-mix(in oklab, var(--brand-grad-3) 18%, transparent), transparent 70%),
              radial-gradient(ellipse 70% 50% at -10% 110%, color-mix(in oklab, var(--brand-grad-1) 18%, transparent), transparent 65%)
            `,
          }}
        />

        <div className="mx-auto max-w-3xl pt-9 pb-20">
          <HomeHero />
          <HomeSessionCard />

          {/* Start actions */}
          <div className="mt-6 flex flex-col gap-2.5">
            <Button
              aria-label={intl.formatMessage(messages.startButtonAriaLabel)}
              className="w-full rounded-4xl py-7 text-[17px] font-bold tracking-tight text-white"
              style={{
                background: "var(--brand-gradient)",
                boxShadow: "0 12px 30px -10px color-mix(in oklab, var(--brand-grad-2) 60%, transparent)",
              }}
              size="lg"
              onPress={onStart}
            >
              {intl.formatMessage(messages.startButton)}
              <ArrowRightIcon className="h-5.5 w-5.5" aria-hidden="true" />
              <kbd
                className="rounded-md px-1.5 py-0.5 text-[11px] font-semibold tracking-wide"
                style={{ background: "rgba(255,255,255,0.22)", color: "white" }}
              >
                ↵
              </kbd>
            </Button>
          </div>
        </div>
      </NavbarLayout>
    </>
  );
}
