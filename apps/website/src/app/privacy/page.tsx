import { LegalContactCard } from "@/components/legal/LegalContactCard";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import type { Metadata } from "next";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbPatterns.privacy);

export const metadata: Metadata = {
  title: buildDualSeoTitle("privacy", "Policy Brief"),
};

type PrivacyCopy = {
  pageName: string;
  title: string;
  eyebrow: string;
  heroDescription: string;
  backToHome: string;
  lastUpdatedLabel: string;
  commitmentTitle: string;
  commitmentBody: string;
  collectTitle: string;
  collectIntro: string;
  collectItems: string[];
  useTitle: string;
  useIntro: string;
  useItems: string[];
  sharingTitle: string;
  sharingIntro: string;
  sharingItems: string[];
  securityTitle: string;
  securityBody: string;
  rightsTitle: string;
  rightsIntro: string;
  rightsItems: string[];
  contactTitle: string;
  contactBody: string;
  phoneLabel: string;
  emailLabel: string;
};

const PRIVACY_COPY: Record<"en" | "es", PrivacyCopy> = {
  en: {
    pageName: "Privacy Policy",
    title: "Privacy Policy",
    eyebrow: "Policy Brief",
    heroDescription:
      "Clear policies and transparent standards for every Client Partner.",
    backToHome: "Back to Home",
    lastUpdatedLabel: "Last Updated",
    commitmentTitle: "Our Commitment to Privacy",
    commitmentBody:
      "At MH Construction, Inc., we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.",
    collectTitle: "Information We Collect",
    collectIntro:
      "We collect information that you provide directly to us, including:",
    collectItems: [
      "Name and contact information (email, phone number, address)",
      "Project details and consultation requests",
      "Resume and employment application information",
      "Newsletter subscription preferences",
      "Communications with our team",
    ],
    useTitle: "How We Use Your Information",
    useIntro: "We use the information we collect to:",
    useItems: [
      "Respond to your inquiries and provide client partner support",
      "Process consultation requests and project proposals",
      "Evaluate employment applications",
      "Send newsletters and marketing communications (with your consent)",
      "Improve our website and services",
      "Comply with legal obligations",
    ],
    sharingTitle: "Information Sharing and Disclosure",
    sharingIntro:
      "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
    sharingItems: [
      "With your consent",
      "To comply with legal obligations or respond to lawful requests",
      "To protect our rights, property, or safety",
      "With service providers who assist in our operations (subject to confidentiality agreements)",
    ],
    securityTitle: "Data Security",
    securityBody:
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.",
    rightsTitle: "Your Rights",
    rightsIntro: "You have the right to:",
    rightsItems: [
      "Access and review your personal information",
      "Request correction of inaccurate information",
      "Request deletion of your information",
      "Opt-out of marketing communications",
      "Withdraw consent for data processing",
    ],
    contactTitle: "Contact Us",
    contactBody:
      "If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:",
    phoneLabel: "Phone",
    emailLabel: "Email",
  },
  es: {
    pageName: "Política de Privacidad",
    title: "Política de Privacidad",
    eyebrow: "Resumen de Política",
    heroDescription:
      "Políticas claras y estándares transparentes para cada Socio Cliente.",
    backToHome: "Volver al Inicio",
    lastUpdatedLabel: "Última actualización",
    commitmentTitle: "Nuestro Compromiso con la Privacidad",
    commitmentBody:
      "En MH Construction, Inc., estamos comprometidos con proteger su privacidad y garantizar la seguridad de su información personal. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestro sitio web o utiliza nuestros servicios.",
    collectTitle: "Información que Recopilamos",
    collectIntro:
      "Recopilamos información que usted nos proporciona directamente, incluyendo:",
    collectItems: [
      "Nombre e información de contacto (correo electrónico, teléfono, dirección)",
      "Detalles del proyecto y solicitudes de consulta",
      "Currículum e información de solicitud de empleo",
      "Preferencias de suscripción al boletín",
      "Comunicaciones con nuestro equipo",
    ],
    useTitle: "Cómo Usamos su Información",
    useIntro: "Usamos la información que recopilamos para:",
    useItems: [
      "Responder sus consultas y brindar soporte a socios cliente",
      "Procesar solicitudes de consulta y propuestas de proyecto",
      "Evaluar solicitudes de empleo",
      "Enviar boletines y comunicaciones de marketing (con su consentimiento)",
      "Mejorar nuestro sitio web y servicios",
      "Cumplir obligaciones legales",
    ],
    sharingTitle: "Intercambio y Divulgación de Información",
    sharingIntro:
      "No vendemos, intercambiamos ni alquilamos su información personal a terceros. Solo podemos compartir su información en las siguientes circunstancias:",
    sharingItems: [
      "Con su consentimiento",
      "Para cumplir obligaciones legales o responder a solicitudes legales",
      "Para proteger nuestros derechos, propiedad o seguridad",
      "Con proveedores de servicios que apoyan nuestra operación (sujetos a acuerdos de confidencialidad)",
    ],
    securityTitle: "Seguridad de Datos",
    securityBody:
      "Implementamos medidas técnicas y organizativas adecuadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ninguna transmisión por internet es completamente segura y no podemos garantizar seguridad absoluta.",
    rightsTitle: "Sus Derechos",
    rightsIntro: "Usted tiene derecho a:",
    rightsItems: [
      "Acceder y revisar su información personal",
      "Solicitar corrección de información inexacta",
      "Solicitar la eliminación de su información",
      "Darse de baja de comunicaciones de marketing",
      "Retirar el consentimiento para el procesamiento de datos",
    ],
    contactTitle: "Contáctenos",
    contactBody:
      "Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, contáctenos:",
    phoneLabel: "Teléfono",
    emailLabel: "Correo electrónico",
  },
};

export default async function PrivacyPolicyPage() {
  const locale = await getServerLocale();
  const copy = PRIVACY_COPY[locale] ?? PRIVACY_COPY.en;

  return (
    <LegalPageLayout
      pageName={copy.pageName}
      title={copy.title}
      lastUpdated="December 22, 2025"
      structuredData={breadcrumbSchema}
      eyebrow={copy.eyebrow}
      description={copy.heroDescription}
      backToHomeLabel={copy.backToHome}
      lastUpdatedLabel={copy.lastUpdatedLabel}
    >
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {copy.commitmentTitle}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {copy.commitmentBody}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {copy.collectTitle}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {copy.collectIntro}
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          {copy.collectItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {copy.useTitle}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{copy.useIntro}</p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          {copy.useItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {copy.sharingTitle}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {copy.sharingIntro}
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          {copy.sharingItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {copy.securityTitle}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {copy.securityBody}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {copy.rightsTitle}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {copy.rightsIntro}
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          {copy.rightsItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {copy.contactTitle}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {copy.contactBody}
        </p>
        <LegalContactCard
          phoneLabel={copy.phoneLabel}
          emailLabel={copy.emailLabel}
        />
      </section>
    </LegalPageLayout>
  );
}
