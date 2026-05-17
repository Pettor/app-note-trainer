import type { ReactElement, ReactNode } from "react";

export type ScoreStatTone = "default" | "success" | "warning" | "danger";

export interface ScoreStatTileProps {
  label: string;
  value: string;
  sub?: string;
  tone?: ScoreStatTone;
  icon: ReactNode;
}

const TONE_COLORS: Record<ScoreStatTone, string> = {
  default: "var(--accent, oklch(0.55 0.22 285))",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

export function ScoreStatTile({ label, value, sub, tone = "default", icon }: ScoreStatTileProps): ReactElement {
  const iconColor = TONE_COLORS[tone];
  return (
    <div
      className="flex min-w-0 flex-col gap-1.5 rounded-2xl p-3.5 sm:p-4"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 2px rgba(15,12,30,0.03)",
      }}
    >
      <div
        className="flex items-center gap-2 font-semibold tracking-[0.14em] uppercase"
        style={{ fontSize: 10, color: "var(--muted)" }}
      >
        <span
          className="grid shrink-0 place-items-center rounded-lg"
          style={{
            width: 22,
            height: 22,
            background: "var(--surface2, oklch(0.96 0.005 285))",
            color: iconColor,
          }}
        >
          {icon}
        </span>
        <span>{label}</span>
      </div>
      <div
        className="leading-none font-bold tabular-nums"
        style={{ fontSize: 24, letterSpacing: "-0.02em", color: "var(--foreground)", marginTop: 2 }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-muted leading-snug" style={{ fontSize: 11 }}>
          {sub}
        </div>
      )}
    </div>
  );
}
