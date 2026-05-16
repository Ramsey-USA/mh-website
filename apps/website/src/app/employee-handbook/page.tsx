import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PageTrackingClient } from "@/components/analytics";
import { PageHero } from "@/components/ui/layout/PageHero";
import { getServerLocale } from "@/lib/i18n/locale.server";

export const metadata: Metadata = {
  title: "Employee Handbook | MH Construction",
  description:
    "Employee handbook placeholder page prepared for upcoming Word upload and PDF publishing workflow.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EmployeeHandbookPage() {
  const locale = await getServerLocale();
  const isEs = locale === "es";

  return (
    <>
      <PageTrackingClient pageName="employee-handbook-placeholder" />

      <PageHero
        eyebrow={isEs ? "Recurso Operativo" : "Operations Resource"}
        title={isEs ? "Manual del Empleado" : "Employee Handbook"}
        highlight={
          isEs ? "Publicacion en progreso" : "Publishing pipeline active"
        }
        description={
          isEs
            ? "Flujo de carga y publicacion listo para el manual versionado."
            : "Upload and publishing workflow is ready for versioned handbook delivery."
        }
        icon="menu_book"
      />

      <section className="bg-linear-to-br from-brand-primary-darker via-brand-primary-dark to-brand-primary px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary">
            <MaterialIcon
              icon="menu_book"
              size="sm"
              className="text-brand-secondary"
            />
            {isEs ? "Recurso Operativo" : "Operations Resource"}
          </div>

          <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
            {isEs
              ? "Marcador del Manual del Empleado"
              : "Employee Handbook Placeholder"}
          </h1>
          <p className="mt-4 text-base text-slate-100 sm:text-lg">
            {isEs
              ? "Esta sección está activa y lista para tu flujo de carga del manual. Cuando se proporcione el archivo fuente en Word, podremos procesarlo con el generador de PDF y publicar aquí el paquete final del manual."
              : "This section is live and ready for your handbook upload workflow. Once the Word source is provided, we can route it through the PDF generator and publish the final handbook package here."}
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-10 dark:bg-gray-950 sm:px-6 sm:py-12">
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {isEs ? "Estado Actual" : "Current Status"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {isEs
                ? "Aún no se ha cargado ningún archivo del manual. Este marcador conserva la navegación del Hub de Operaciones y mantiene estable el destino para una publicación futura."
                : "No handbook file has been uploaded yet. This placeholder preserves the Operations Hub navigation and keeps the destination stable for future publishing."}
            </p>
          </article>

          <article className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-6 dark:border-brand-primary/40 dark:bg-brand-primary/10">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {isEs ? "Siguiente Paso" : "Next Step"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {isEs
                ? "Carga el archivo fuente del manual en Word y lo conectaremos al proceso existente de generación de documentos para publicar un PDF versionado."
                : "Upload the Word handbook source and we will connect it to the existing document generation process to publish a versioned PDF."}
            </p>
          </article>
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap gap-3">
          <Link
            href="/hub"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-primary-dark"
          >
            <MaterialIcon icon="dashboard" size="sm" className="text-white" />
            {isEs ? "Volver al Hub de Operaciones" : "Back to Operations Hub"}
          </Link>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-primary px-5 py-3 text-sm font-bold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
          >
            <MaterialIcon icon="folder_open" size="sm" />
            {isEs ? "Ver Recursos de Campo" : "View Field Resources"}
          </Link>
        </div>
      </section>
    </>
  );
}
