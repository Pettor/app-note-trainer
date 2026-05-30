import type { ReactElement } from "react";
import { Radio, RadioGroup } from "@heroui/react";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { LOCALE_CONFIG } from "~/core/locale/LocaleConfig";
import type { LocaleMode } from "~/core/locale/LocaleMode";

export interface LanguageSelectorProps {
  mode: LocaleMode;
  onSelect: (mode: LocaleMode) => void;
}

export function LanguageSelector({ mode, onSelect }: LanguageSelectorProps): ReactElement {
  const intl = useIntl();

  return (
    <RadioGroup
      value={mode}
      onChange={(value) => onSelect(value as LocaleMode)}
      orientation="horizontal"
      aria-label={intl.formatMessage({
        description: "LanguageSelector: aria-label - language radio group",
        defaultMessage: "Language",
        id: "jwrTsl",
      })}
      className="flex gap-2"
    >
      {(Object.entries(LOCALE_CONFIG) as [LocaleMode, (typeof LOCALE_CONFIG)[LocaleMode]][]).map(
        ([key, { flag, label }]) => (
          <Radio
            key={key}
            value={key}
            aria-label={label}
            className={clsx(
              "group relative flex-col items-center gap-1.5 rounded-xl border-2 border-transparent p-3 transition-all",
              "data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
              "data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10"
            )}
          >
            <Radio.Control className="absolute top-1 right-1 size-4">
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content className="flex flex-col items-center gap-1.5">
              <span className="text-3xl leading-none">{flag}</span>
              <span className="text-default-500 group-data-[selected=true]:text-accent text-xs">{label}</span>
            </Radio.Content>
          </Radio>
        )
      )}
    </RadioGroup>
  );
}
