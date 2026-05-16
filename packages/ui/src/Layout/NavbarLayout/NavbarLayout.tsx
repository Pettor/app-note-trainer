import type { ReactElement, ReactNode } from "react";
import { Surface } from "@heroui/react";

export interface NavbarLayoutProps {
  navbarElement: ReactNode;
  backgroundElement?: ReactNode;
  footer?: boolean;
  footerText?: string;
  footerCopyright?: string;
  footerContent?: ReactNode;
  children?: ReactNode;
}

export function NavbarLayout({
  backgroundElement,
  navbarElement,
  footer,
  footerText,
  footerCopyright,
  footerContent,
  children,
}: NavbarLayoutProps): ReactElement {
  return (
    <Surface className="relative flex flex-1 flex-col" variant="default">
      {backgroundElement}
      {navbarElement}
      <main className="container mx-auto flex-1 p-4">{children}</main>
      {footer && (
        <footer className="container mx-auto flex flex-col place-items-center px-12 pb-12">
          <div className="grid place-items-center gap-0.5">
            <p className="text-base font-bold">{footerText ?? "Made with ☕ by Petter Hancock"}</p>
            <p>{footerCopyright ?? "Copyright © 2024 - All rights reserved"}</p>
            {footerContent && <div className="mt-4">{footerContent}</div>}
          </div>
        </footer>
      )}
    </Surface>
  );
}
