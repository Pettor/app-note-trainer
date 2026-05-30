import type { ReactElement } from "react";
import { useAtomValue } from "jotai";
import { IntlProvider } from "react-intl";
import svMessages from "../locales/sv.json";
import { localeModeAtom } from "./locale/LocaleAtoms";
import { LOCALE_CONFIG } from "./locale/LocaleConfig";
import type { LocaleMode } from "./locale/LocaleMode";

interface Props {
  children: ReactElement;
}

function loadLocaleData(localeMode: LocaleMode): Record<string, string> {
  switch (localeMode) {
    case "sv":
      return svMessages;
    case "en":
    default:
      return {};
  }
}

export function AppLocales({ children }: Props): ReactElement {
  const localeMode = useAtomValue(localeModeAtom);
  const { locale } = LOCALE_CONFIG[localeMode];

  return (
    <IntlProvider locale={locale} defaultLocale="en" messages={loadLocaleData(localeMode)}>
      {children}
    </IntlProvider>
  );
}
