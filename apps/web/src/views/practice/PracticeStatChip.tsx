import type { ReactElement } from "react";

export interface PracticeStatChipProps {
  icon: ReactElement;
  label: string;
  value: string;
  iconColor: string;
}

export function PracticeStatChip({ icon, label, value, iconColor }: PracticeStatChipProps): ReactElement {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        boxShadow: "0 1px 2px rgba(15,12,30,0.04)",
      }}
    >
      <div
        className="grid h-8.5 w-8.5 shrink-0 place-items-center rounded-[9px]"
        style={{ background: "var(--surface-secondary)", color: iconColor }}
      >
        {icon}
      </div>
      <div className="flex min-w-0 flex-col leading-tight">
        <span className="text-muted text-[10px] font-semibold tracking-[0.14em] uppercase">{label}</span>
        <span className="text-foreground text-[17px] font-bold tabular-nums">{value}</span>
      </div>
    </div>
  );
}
