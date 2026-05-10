import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  eyebrow: {
    id: "ayJ6b5",
    description: "HomeHero: eyebrow chip label",
    defaultMessage: "Practice session",
  },
  headingPlain: {
    id: "Z+x4w0",
    description: "HomeHero: heading plain part",
    defaultMessage: "Tune your",
  },
  headingGradient: {
    id: "u6ZB3a",
    description: "HomeHero: heading gradient emphasis part",
    defaultMessage: "note reading",
  },
  tagline: {
    id: "ZXufX9",
    description: "HomeHero: tagline below heading",
    defaultMessage:
      "Set the staff, the difficulty, and how forgiving the timer is. Your last settings stick — start in one tap next time.",
  },
});

export function HomeHero(): ReactElement {
  const intl = useIntl();

  return (
    <section className="pt-2 pb-7 text-center">
      {/* Eyebrow chip */}
      <span
        className="inline-flex items-center gap-2 rounded-full border border-[--border] bg-[--surface] px-3.5 py-1.5 text-[11px] tracking-[0.22em] text-[--muted] uppercase"
        style={{ boxShadow: "0 1px 2px rgba(15,12,30,0.04), 0 2px 8px rgba(15,12,30,0.04)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand-gradient)" }} aria-hidden="true" />
        {intl.formatMessage(messages.eyebrow)}
      </span>

      {/* Heading */}
      <h1 className="mt-4 text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-[38px]">
        {intl.formatMessage(messages.headingPlain)}{" "}
        <span
          style={{
            background: "var(--brand-gradient)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {intl.formatMessage(messages.headingGradient)}
        </span>
        {"."}
      </h1>

      {/* Tagline */}
      <p className="mx-auto mt-2 max-w-[420px] text-[15px] leading-relaxed text-[--muted]">
        {intl.formatMessage(messages.tagline)}
      </p>
    </section>
  );
}
