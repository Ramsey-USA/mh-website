import { buildDualSeoTitle } from "@/lib/branding/page-names";

export const metadata = {
  title: buildDualSeoTitle("careers", "Printable Application"),
  description:
    "Download or print a blank job application form to bring to MH Construction in person. Available in English and Spanish.",
  alternates: {
    canonical: "https://www.mhc-gc.com/careers",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export { default } from "./PrintableApplicationClient";
