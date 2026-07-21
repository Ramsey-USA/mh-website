import localFont from "next/font/local";

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

const mendlBold = localFont({
  src: "../../public/fonts/Mendl Fonts/fonnts.com-Mendl_Sans_Dusk_Bold.otf",
  variable: "--font-mendl-bold",
  display: "swap",
  preload: true,
  weight: "700",
  style: "normal",
});

export const mendlFontVariableClasses = [
  mendlRegular.variable,
  mendlMedium.variable,
  mendlBold.variable,
].join(" ");
