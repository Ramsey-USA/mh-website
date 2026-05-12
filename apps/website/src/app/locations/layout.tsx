import { locations } from "@/lib/data/locations";
import { SectionShell } from "@/components/layout";

const locationNavItems = Object.values(locations).map((location) => ({
  href: `/locations/${location.slug}`,
  label: `${location.city}, ${location.state}`,
}));

export default function LocationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SectionShell
      navTitle="Service Area"
      navLabel="Service area locations"
      navItems={locationNavItems}
      navNote="Move between service areas without losing the local proof, licensing context, or project coverage tied to each market."
    >
      {children}
    </SectionShell>
  );
}
