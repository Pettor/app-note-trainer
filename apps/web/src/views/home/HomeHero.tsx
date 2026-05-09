import type { ReactElement } from "react";
import { Button, Chip } from "@heroui/react";
import { Logo } from "@package/ui";
import { defineMessages, useIntl } from "react-intl";

export interface HomeHeroProps {
  appName: string;
  onStart: () => void;
}

const chipMessages = defineMessages({
  "note-recognition": {
    id: "pHdcEL",
    description: "HomeHero: chip - feature note-recognition",
    defaultMessage: "Note Recognition",
  },
  "interval-training": {
    id: "0rjE3f",
    description: "HomeHero: chip - feature interval-training",
    defaultMessage: "Interval Training",
  },
  "theory-fundamentals": {
    id: "s8y4Hn",
    description: "HomeHero: chip - feature theory-fundamentals",
    defaultMessage: "Theory Fundamentals",
  },
  "spaced-repetition": {
    id: "yTQO3i",
    description: "HomeHero: chip - feature spaced-repetition",
    defaultMessage: "Spaced Repetition",
  },
  "works-offline": {
    id: "ahfeCi",
    description: "HomeHero: chip - feature works-offline",
    defaultMessage: "Works Offline",
  },
});

const FEATURE_CHIPS = Object.keys(chipMessages) as Array<keyof typeof chipMessages>;

export function HomeHero({ appName, onStart }: HomeHeroProps): ReactElement {
  const intl = useIntl();
  const [firstName, ...rest] = appName.split(" ");
  const lastName = rest.join(" ");

  return (
    <section className="flex flex-col items-center justify-center py-16 text-center sm:py-24">
      <Logo size="large" />

      <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl">
        {firstName}{" "}
        <span
          style={{
            background: "var(--brand-gradient)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {lastName}
        </span>
      </h1>

      <p className="text-muted mt-5 max-w-lg text-lg leading-relaxed">
        {intl.formatMessage({
          description: "HomeHero: tagline - app description",
          defaultMessage:
            "Master every note. From reading sheet music to understanding music theory — at your own pace.",
          id: "cgFOje",
        })}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {FEATURE_CHIPS.map((id) => (
          <Chip key={id} variant="soft">
            {intl.formatMessage(chipMessages[id])}
          </Chip>
        ))}
      </div>

      <Button
        className="mt-10 px-8 py-3 text-base font-semibold text-white"
        style={{ background: "var(--brand-gradient)" }}
        size="lg"
        onPress={onStart}
      >
        {intl.formatMessage({
          description: "HomeHero: button - start CTA",
          defaultMessage: "Start Practicing",
          id: "Rdddnr",
        })}
      </Button>
    </section>
  );
}
