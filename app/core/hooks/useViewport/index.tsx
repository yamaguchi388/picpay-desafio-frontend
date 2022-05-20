import { useEffect, useState } from "react";
import { BREAKPOINTS } from "../../constants";
import { getViewport, ViewportPayload } from "../../utils";

export const useViewport = (): ViewportPayload => {
  const [viewport, setViewport] = useState<ViewportPayload>({
    isDesktop: false,
    isMobile: false,
    key: "desktop",
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(BREAKPOINTS.DESKTOP);

    const handleMediaChange = (mediaResult: unknown) =>
      setViewport(getViewport(mediaResult as MediaQueryList));

    handleMediaChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return viewport;
};
