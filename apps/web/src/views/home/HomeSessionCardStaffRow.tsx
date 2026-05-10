import type { ReactElement } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { defineMessages, useIntl } from "react-intl";
import type { Staff } from "~/core/practice-settings/PracticeSettings";

const messages = defineMessages({
  label: {
    id: "6XovsT",
    description: "HomeSessionCard: staff row label",
    defaultMessage: "Staff",
  },
  desc: {
    id: "HQvkwd",
    description: "HomeSessionCard: staff row description",
    defaultMessage: "Which clef you're reading.",
  },
  trebleName: {
    id: "XV9RqW",
    description: "HomeSessionCard: treble clef name",
    defaultMessage: "Treble",
  },
  trebleRange: {
    id: "sDbczm",
    description: "HomeSessionCard: treble clef range description",
    defaultMessage: "G clef · upper voices",
  },
  bassName: {
    id: "9sk9JS",
    description: "HomeSessionCard: bass clef name",
    defaultMessage: "Bass",
  },
  bassRange: {
    id: "59i7/T",
    description: "HomeSessionCard: bass clef range description",
    defaultMessage: "F clef · lower voices",
  },
});

function TrebleClefIcon(): ReactElement {
  return (
    <svg
      width="22"
      height="30"
      viewBox="0 0 24 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2 C 9 5 8 9 11 13 C 14 17 19 19 19 24 C 19 29 14 32 11 30 C 9 29 8 27 9 25 C 10 23 13 23 14 25 C 15 27 13 29 11 29 M11 29 L 11 33 C 11 35 13 35 13 33 M11 13 C 13 19 13 27 11 33" />
    </svg>
  );
}

function BassClefIcon(): ReactElement {
  return (
    <svg
      width="24"
      height="30"
      viewBox="0 0 24 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 22 C 5 14 13 11 18 14 C 22 17 21 23 16 25 C 13 26 9 25 7 22 M5 22 C 5 12 12 8 16 10" />
      <circle cx="20" cy="13" r="1.4" fill="currentColor" />
      <circle cx="20" cy="19" r="1.4" fill="currentColor" />
    </svg>
  );
}

export interface HomeSessionCardStaffRowProps {
  staff: Staff;
  onStaffChange: (value: Staff) => void;
}

export function HomeSessionCardStaffRow({ staff, onStaffChange }: HomeSessionCardStaffRowProps): ReactElement {
  const intl = useIntl();

  const options: { value: Staff; name: string; range: string; Icon: () => ReactElement }[] = [
    {
      value: "treble",
      name: intl.formatMessage(messages.trebleName),
      range: intl.formatMessage(messages.trebleRange),
      Icon: TrebleClefIcon,
    },
    {
      value: "bass",
      name: intl.formatMessage(messages.bassName),
      range: intl.formatMessage(messages.bassRange),
      Icon: BassClefIcon,
    },
  ];

  return (
    <div className="border-separator grid grid-cols-1 items-center gap-6 border-t py-4.5 sm:grid-cols-[180px_1fr]">
      <div>
        <p className="text-sm font-semibold">{intl.formatMessage(messages.label)}</p>
        <p className="text-muted mt-0.5 text-xs leading-snug">{intl.formatMessage(messages.desc)}</p>
      </div>
      <div
        role="radiogroup"
        aria-label={intl.formatMessage(messages.label)}
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
      >
        {options.map(({ value, name, range, Icon }) => {
          const isActive = staff === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onStaffChange(value)}
              className="grid cursor-pointer grid-cols-[44px_1fr_auto] items-center gap-3 rounded-[14px] border px-3.5 py-3.5 text-left transition-all duration-150"
              style={
                isActive
                  ? {
                      borderColor: "color-mix(in oklab, var(--accent) 50%, var(--border))",
                      background:
                        "linear-gradient(180deg, var(--surface), color-mix(in oklab, var(--accent) 12%, var(--surface)))",
                      boxShadow: "0 0 0 3px color-mix(in oklab, var(--accent) 14%, transparent)",
                    }
                  : {
                      borderColor: "var(--border)",
                      background: "var(--surface)",
                    }
              }
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={
                  isActive
                    ? { background: "var(--brand-gradient)", color: "white" }
                    : { background: "var(--surface-secondary)", color: "var(--foreground)" }
                }
              >
                <Icon />
              </span>
              <span>
                <span className="block text-sm font-semibold">{name}</span>
                <span className="text-muted mt-0.5 block text-[11px]">{range}</span>
              </span>
              <span
                className="flex h-5.5 w-5.5 items-center justify-center rounded-full border transition-all duration-150"
                style={
                  isActive
                    ? { background: "var(--accent)", borderColor: "var(--accent)", color: "white" }
                    : { borderColor: "var(--border)", color: "transparent" }
                }
              >
                <CheckIcon className="h-3 w-3" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
