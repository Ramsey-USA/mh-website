import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface JeremyAuthorityLinksStripProps {
  isEs?: boolean;
  className?: string;
}

export function JeremyAuthorityLinksStrip({
  isEs = false,
  className,
}: Readonly<JeremyAuthorityLinksStripProps>) {
  const copy = isEs
    ? {
        label: "Fuentes verificadas de liderazgo de Jeremy",
        profile: "Perfil de Jeremy Thamert",
        sources: "Credenciales e historias verificadas",
      }
    : {
        label: "Verified Jeremy leadership sources",
        profile: "Jeremy Thamert Profile",
        sources: "Verified Credentials and Stories",
      };

  return (
    <section
      aria-label="Jeremy leadership authority links"
      className={className}
    >
      <div className="rounded-2xl border border-brand-primary/20 bg-white/90 px-4 py-4 shadow-sm dark:bg-gray-900/85 sm:px-6">
        <p className="font-subheading text-xs font-semibold tracking-[0.14em] text-brand-primary uppercase sm:text-sm">
          {copy.label}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
          <Link
            href="/jeremy-thamert"
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/8 px-3 py-1.5 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-primary/15 dark:text-brand-primary-light dark:hover:bg-brand-primary/20 sm:text-sm"
          >
            <MaterialIcon icon="person" size="sm" />
            <span>{copy.profile}</span>
          </Link>
          <Link
            href="/jeremy-thamert#verified-sources"
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-secondary/35 bg-brand-secondary/8 px-3 py-1.5 text-xs font-semibold text-brand-secondary-dark transition-colors hover:bg-brand-secondary/15 dark:text-brand-secondary-light dark:hover:bg-brand-secondary/20 sm:text-sm"
          >
            <MaterialIcon icon="verified" size="sm" />
            <span>{copy.sources}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
