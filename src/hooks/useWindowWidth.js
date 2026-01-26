import { useState, useEffect, useMemo } from "react";
import { breakpoints } from "../utils/constants";
import { getBreakpoint } from "../utils/utils";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentBreakpoint = useMemo(() => {
    return getBreakpoint(width, breakpoints);
  }, [width]);

  let isMobile = Boolean(currentBreakpoint === "mobile");
  let isTablet = Boolean(currentBreakpoint === "tablet");
  let isDesktop = Boolean(currentBreakpoint === "desktop");

  return { isMobile, isTablet, isDesktop };
};

export default useWindowWidth;
