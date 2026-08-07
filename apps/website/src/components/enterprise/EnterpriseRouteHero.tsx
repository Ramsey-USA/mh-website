import Link from "next/link";

interface EnterpriseRouteHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
  primarySlogan?: string;
  supportingSlogan?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  proof: readonly [string, string][];
}

export function EnterpriseRouteHero({
  eyebrow,
  title,
  intro,
  primarySlogan,
  supportingSlogan,
  primary,
  secondary,
  proof,
}: Readonly<EnterpriseRouteHeroProps>) {
  return (
    <>
      <section
        className="enterprise-route-hero"
        aria-labelledby="route-heading"
      >
        <div className="enterprise-route-hero__grid" aria-hidden="true" />
        <div className="enterprise-shell enterprise-route-hero__content">
          <p className="enterprise-kicker enterprise-kicker--tan">{eyebrow}</p>
          <h1 id="route-heading" className="enterprise-hero__title">
            {title}
          </h1>
          <p className="enterprise-hero__intro">{intro}</p>
          {primarySlogan || supportingSlogan ? (
            <div className="enterprise-route-hero__slogans">
              {primarySlogan ? <strong>{primarySlogan}</strong> : null}
              {supportingSlogan ? <span>{supportingSlogan}</span> : null}
            </div>
          ) : null}
          <div className="enterprise-actions">
            <Link
              href={primary.href}
              className="enterprise-button enterprise-button--tan"
            >
              {primary.label}
            </Link>
            {secondary ? (
              <Link
                href={secondary.href}
                className="enterprise-button enterprise-button--ghost"
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
      <section className="enterprise-proof-bar" aria-label="Capability proof">
        <div className="enterprise-shell enterprise-proof-grid">
          {proof.map(([value, label]) => (
            <div key={value} className="enterprise-proof-item">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
