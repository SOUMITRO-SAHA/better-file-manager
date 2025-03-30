import * as React from "react";

const breakPoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type ScreenSizeType = keyof typeof breakPoints;

const getScreenSize = (width: number): ScreenSizeType => {
  if (width >= breakPoints["2xl"]) return "2xl";
  if (width >= breakPoints["xl"]) return "xl";
  if (width >= breakPoints["lg"]) return "lg";
  if (width >= breakPoints["md"]) return "md";
  if (width >= breakPoints["sm"]) return "sm";
  return "xs";
};

interface UseScreenSizeResponse {
  screenSize: ScreenSizeType;
  isMobileScreen: boolean;
  isTabletScreen: boolean;
  isLaptopScreen: boolean;
}

export const useScreenSize = (): UseScreenSizeResponse => {
  const [screenSize, setScreenSize] = React.useState<ScreenSizeType>(
    getScreenSize(window.innerWidth),
  );

  // --- Effects
  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileScreen = screenSize === "xs" || screenSize === "sm";
  const isTabletScreen = screenSize === "md";
  const isLaptopScreen =
    screenSize === "lg" || screenSize === "xl" || screenSize === "2xl";

  return { screenSize, isMobileScreen, isTabletScreen, isLaptopScreen };
};

export default useScreenSize;
