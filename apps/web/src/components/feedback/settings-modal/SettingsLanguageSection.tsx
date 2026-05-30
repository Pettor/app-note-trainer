import type { ReactElement } from "react";
import { useIntl } from "react-intl";
import type { LanguageSelectorProps } from "~/components/actions/language-selector/LanguageSelector";
import { LanguageSelector } from "~/components/actions/language-selector/LanguageSelector";

export interface SettingsLanguageSectionProps {
  languageSelector: LanguageSelectorProps;
}

export function SettingsLanguageSection({ languageSelector }: SettingsLanguageSectionProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold">
        {intl.formatMessage({
          description: "SettingsLanguageSection: heading - section title",
          defaultMessage: "Language",
          id: "2uHgOx",
        })}
      </p>
      <p className="text-default-500 text-sm">
        {intl.formatMessage({
          description: "SettingsLanguageSection: body - section description",
          defaultMessage: "Choose your preferred language for the application.",
          id: "aTooFR",
        })}
      </p>
      <LanguageSelector {...languageSelector} />
    </div>
  );
}
