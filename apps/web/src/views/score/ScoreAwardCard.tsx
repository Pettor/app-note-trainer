import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  awardUnlocked: {
    id: "L6Se3w",
    description: "ScoreAwardCard: eyebrow label",
    defaultMessage: "Award unlocked",
  },
  title: {
    id: "4Nt1U9",
    description: "ScoreAwardCard: award title",
    defaultMessage: "Note Whisperer",
  },
  subtitle: {
    id: "RWGoY7",
    description: "ScoreAwardCard: subtitle with fastest time",
    defaultMessage:
      "Every note identified correctly — your fastest was {fastest}s. Try a harder key, or speed up the timer.",
  },
});

const CONFETTI_DOTS = [
  [60, 30, "oklch(0.55 0.22 285)"],
  [110, 60, "oklch(0.66 0.235 15)"],
  [180, 22, "oklch(0.80 0.165 75)"],
  [240, 70, "oklch(0.55 0.22 285)"],
  [340, 18, "oklch(0.72 0.155 170)"],
  [410, 64, "oklch(0.66 0.235 15)"],
  [470, 28, "oklch(0.80 0.165 75)"],
  [540, 56, "oklch(0.55 0.22 285)"],
  [80, 110, "oklch(0.72 0.155 170)"],
  [520, 110, "oklch(0.66 0.235 15)"],
] as const;

export interface ScoreAwardCardProps {
  fastestCorrect: number;
}

export function ScoreAwardCard({ fastestCorrect }: ScoreAwardCardProps): ReactElement {
  const intl = useIntl();
  const fastestLabel = Number.isFinite(fastestCorrect) ? fastestCorrect.toFixed(1) : "—";

  return (
    <div
      className="relative flex-1 overflow-hidden rounded-2xl p-6 text-center sm:rounded-3xl sm:p-10"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 6px 16px rgba(15,12,30,0.05), 0 16px 40px rgba(15,12,30,0.04)",
      }}
    >
      {/* Gradient washes */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in oklab, oklch(0.80 0.165 75) 22%, transparent), transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, color-mix(in oklab, oklch(0.55 0.22 285) 18%, transparent), transparent 70%)",
        }}
      />

      {/* Confetti dots */}
      <svg
        viewBox="0 0 600 160"
        className="pointer-events-none absolute top-1.5 right-0 left-0 w-full"
        style={{ height: 160, opacity: 0.55 }}
        aria-hidden="true"
      >
        {CONFETTI_DOTS.map(([cx, cy, fill], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 5 : 3.5} fill={fill} />
        ))}
      </svg>

      <div className="relative">
        {/* Medal */}
        <div
          className="relative mx-auto mb-4 grid place-items-center rounded-full"
          style={{
            width: 100,
            height: 100,
            background: "var(--brand-gradient)",
            boxShadow:
              "0 18px 40px -12px oklch(0.66 0.235 15 / 0.55), inset 0 -6px 14px rgba(0,0,0,0.18), inset 0 4px 8px rgba(255,255,255,0.3)",
          }}
        >
          {/* Ribbon tails */}
          <span
            className="absolute"
            style={{
              bottom: -20,
              left: "32%",
              width: 14,
              height: 34,
              background: "oklch(0.66 0.235 15)",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)",
              transform: "rotate(-10deg)",
              opacity: 0.85,
            }}
          />
          <span
            className="absolute"
            style={{
              bottom: -20,
              right: "32%",
              width: 14,
              height: 34,
              background: "oklch(0.55 0.22 285)",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)",
              transform: "rotate(10deg)",
              opacity: 0.85,
            }}
          />
          <svg
            width={42}
            height={42}
            viewBox="0 0 24 24"
            fill="white"
            stroke="white"
            strokeWidth="0"
            aria-hidden="true"
          >
            <polygon points="12 2 15 9 22 9 16 14 18 21 12 17 6 21 8 14 2 9 9 9 12 2" />
          </svg>
        </div>

        <p className="font-bold tracking-[0.24em] uppercase" style={{ fontSize: 10, color: "var(--muted)" }}>
          {intl.formatMessage(messages.awardUnlocked)}
        </p>
        <h2
          className="mt-1.5 mb-1 font-extrabold"
          style={{
            fontSize: 28,
            letterSpacing: "-0.02em",
            background: "var(--brand-gradient)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {intl.formatMessage(messages.title)}
        </h2>
        <p className="text-muted mx-auto leading-relaxed" style={{ fontSize: 14, maxWidth: 380 }}>
          {intl.formatMessage(messages.subtitle, { fastest: fastestLabel })}
        </p>
      </div>
    </div>
  );
}
