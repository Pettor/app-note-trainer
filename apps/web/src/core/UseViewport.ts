import { useMediaQuery } from "@package/react";

export interface ViewportState {
  /** True when viewport width is at most 670px */
  isPhone: boolean;
  /** True when viewport height is short — landscape phones and similar compact viewports */
  isCompact: boolean;
  /** True when viewport height is very short — e.g. foldable phones in half-screen mode */
  isMinimal: boolean;
}

export function useViewport(): ViewportState {
  const isPhone = useMediaQuery("(max-width: 640px)");
  const isCompact = useMediaQuery("(max-height: 630px)");
  const isMinimal = useMediaQuery("(max-height: 490px)");
  return { isPhone, isCompact, isMinimal };
}
