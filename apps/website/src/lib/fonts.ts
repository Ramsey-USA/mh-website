import localFont from "next/font/local";

const mendlLight = localFont({
  src: "../../public/fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Light.otf",
  variable: "--font-mendl-light",
  display: "swap",
  preload: false,
  weight: "300",
  style: "normal",
});

const mendlRegular = localFont({
  src: "../../public/fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Regular.otf",
  variable: "--font-mendl-regular",
  display: "swap",
  preload: true,
  weight: "400",
  style: "normal",
});

const mendlMedium = localFont({
  src: "../../public/fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Medium.otf",
  variable: "--font-mendl-medium",
  display: "swap",
  preload: false,
  weight: "500",
  style: "normal",
});

const mendlSemibold = localFont({
  src: "../../public/fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_SemiBold.otf",
  variable: "--font-mendl-semibold",
  display: "swap",
  preload: false,
  weight: "600",
  style: "normal",
});

const mendlBold = localFont({
  src: "../../public/fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Bold.otf",
  variable: "--font-mendl-bold",
  display: "swap",
  preload: false,
  weight: "700",
  style: "normal",
});

const mendlExtraBold = localFont({
  src: "../../public/fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_XBold.otf",
  variable: "--font-mendl-extrabold",
  display: "swap",
  preload: false,
  weight: "800",
  style: "normal",
});

const mendlBlack = localFont({
  src: "../../public/fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Black.otf",
  variable: "--font-mendl-black",
  display: "swap",
  preload: false,
  weight: "900",
  style: "normal",
});

export const mendlFontVariableClasses = [
  mendlLight.variable,
  mendlRegular.variable,
  mendlMedium.variable,
  mendlSemibold.variable,
  mendlBold.variable,
  mendlExtraBold.variable,
  mendlBlack.variable,
].join(" ");
