import { ViewportPayload } from "./types";

export const getViewport = (mediaQuery: MediaQueryList): ViewportPayload => {
  const { matches } = mediaQuery;
  const key = matches ? "desktop" : "mobile";
  return { isDesktop: matches, isMobile: !matches, key };
};
