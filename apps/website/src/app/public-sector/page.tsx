export default async function PublicSectorPage() {
  const { default: PublicSectorFullPage } =
    await import("./PublicSectorFullPage");
  return <PublicSectorFullPage />;
}
