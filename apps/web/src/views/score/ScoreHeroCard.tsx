import type { ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";
import { useViewport } from "~/core/UseViewport";

const messages = defineMessages({
  accuracyLabel: {
    id: "score.hero.accuracy",
    description: "ScoreHeroCard: accuracy label beneath the percentage",
    defaultMessage: "Accuracy",
  },
  headingPerfect: {
    id: "score.hero.headingPerfect",
    description: "ScoreHeroCard: heading for a perfect run",
    defaultMessage: "Perfect run.",
  },
  headingNice: {
    id: "score.hero.headingNice",
    description: "ScoreHeroCard: heading for a non-perfect run",
    defaultMessage: "Nice work.",
  },
  subtitlePerfect: {
    id: "score.hero.subtitlePerfect",
    description: "ScoreHeroCard: subtitle for a perfect run",
    defaultMessage: "You got <strong>{correct} of {total}</strong> notes. Not a single miss — keep that streak going.",
  },
  subtitleNice: {
    id: "score.hero.subtitleNice",
    description: "ScoreHeroCard: subtitle for a non-perfect run",
    defaultMessage: "You got <strong>{correct} of {total}</strong> notes. Review the misses below to lock them in.",
  },
  flawlessRun: {
    id: "score.hero.flawlessRun",
    description: "ScoreHeroCard: eyebrow label for a perfect run",
    defaultMessage: "Flawless run",
  },
  sessionComplete: {
    id: "score.hero.sessionComplete",
    description: "ScoreHeroCard: eyebrow label for a normal run",
    defaultMessage: "Session complete",
  },
});

export interface ScoreHeroCardProps {
  correctCount: number;
  totalNotes: number;
  perfect: boolean;
}

export function ScoreHeroCard({ correctCount, totalNotes, perfect }: ScoreHeroCardProps): ReactElement {
  const intl = useIntl();
  const { isPhone } = useViewport();

  const accuracy = totalNotes > 0 ? Math.round((correctCount / totalNotes) * 100) : 0;
  const dialSize = isPhone ? 130 : 168;
  const strokeWidth = isPhone ? 11 : 14;
  const r = (dialSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - accuracy / 100);

  return (
    <div
      className="relative flex items-center gap-5 overflow-hidden rounded-2xl p-5 sm:gap-7 sm:rounded-3xl sm:p-7"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 6px 16px rgba(15,12,30,0.05), 0 16px 40px rgba(15,12,30,0.04)",
      }}
    >
      {/* Background gradient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 100% 0%, color-mix(in oklab, oklch(0.80 0.165 75) 18%, transparent), transparent 60%), radial-gradient(ellipse 60% 100% at 0% 100%, color-mix(in oklab, oklch(0.55 0.22 285) 14%, transparent), transparent 65%)",
        }}
      />

      {/* Accuracy arc dial */}
      <div className="relative shrink-0" style={{ width: dialSize, height: dialSize }}>
        <svg width={dialSize} height={dialSize} className="block">
          <defs>
            <linearGradient id="score-dial-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.55 0.22 285)" />
              <stop offset="55%" stopColor="oklch(0.66 0.235 15)" />
              <stop offset="100%" stopColor="oklch(0.80 0.165 75)" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx={dialSize / 2}
            cy={dialSize / 2}
            r={r}
            fill="none"
            stroke="var(--surface3, oklch(0.93 0.01 285))"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <circle
            cx={dialSize / 2}
            cy={dialSize / 2}
            r={r}
            fill="none"
            stroke="url(#score-dial-grad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${dialSize / 2} ${dialSize / 2})`}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
          <span
            className="font-extrabold tabular-nums"
            style={{
              fontSize: isPhone ? 32 : 44,
              letterSpacing: "-0.04em",
              background: "var(--brand-gradient)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {accuracy}
            <span style={{ fontSize: isPhone ? 14 : 18 }}>%</span>
          </span>
          <span className="mt-1 font-semibold tracking-widest uppercase" style={{ fontSize: 9, color: "var(--muted)" }}>
            {intl.formatMessage(messages.accuracyLabel)}
          </span>
        </div>
      </div>

      {/* Title block */}
      <div className="relative min-w-0 flex-1">
        <p className="font-semibold tracking-[0.22em] uppercase" style={{ fontSize: 11, color: "var(--muted)" }}>
          {perfect ? intl.formatMessage(messages.flawlessRun) : intl.formatMessage(messages.sessionComplete)}
        </p>
        <h1
          className="mt-1.5 mb-1 leading-[1.05] font-extrabold"
          style={{ fontSize: isPhone ? 28 : 40, letterSpacing: "-0.03em" }}
        >
          {perfect ? (
            <span
              style={{
                background: "var(--brand-gradient)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {intl.formatMessage(messages.headingPerfect)}
            </span>
          ) : (
            intl.formatMessage(messages.headingNice)
          )}
        </h1>
        <p className="text-muted text-sm leading-relaxed" style={{ maxWidth: 360 }}>
          {perfect
            ? intl.formatMessage(messages.subtitlePerfect, {
                correct: correctCount,
                total: totalNotes,
                strong: (chunks) => <strong className="text-foreground font-bold">{chunks}</strong>,
              })
            : intl.formatMessage(messages.subtitleNice, {
                correct: correctCount,
                total: totalNotes,
                strong: (chunks) => <strong className="text-foreground font-bold">{chunks}</strong>,
              })}
        </p>
      </div>
    </div>
  );
}
