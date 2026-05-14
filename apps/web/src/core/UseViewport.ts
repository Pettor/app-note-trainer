import { useMediaQuery } from "@package/react";

export interface ViewportState {
  /** True when viewport width is below Tailwind's sm breakpoint (< 640px) */
  isPhone: boolean;
  /** True when viewport height is short — landscape phones and similar compact viewports */
  isCompact: boolean;
}

export function useViewport(): ViewportState {
  const isPhone = useMediaQuery("(max-width: 639px)");
  const isCompact = useMediaQuery("(max-height: 600px)");
  return { isPhone, isCompact };
}
