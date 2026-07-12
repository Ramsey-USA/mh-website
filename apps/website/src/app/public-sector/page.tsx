import { getServerLocale } from "@/lib/i18n/locale.server";

export default async function PublicSectorPage() {
  const isEs = (await getServerLocale()) === "es";
  const { default: PublicSectorFullPage } =
    await import("./PublicSectorFullPage");

  return (
    <>
      <span className="sr-only">
        {isEs
          ? "Sector publico MH Construction"
          : "MH Construction public sector"}
      </span>
      <PublicSectorFullPage />
    </>
  );
}
