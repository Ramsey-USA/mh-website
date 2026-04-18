"use client";

import { useRef, useEffect, useState, type FormEvent } from "react";
import Script from "next/script";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { usePageTracking } from "@/lib/analytics/hooks";
import { useLocale } from "@/hooks/useLocale";

const TURNSTILE_SITE_KEY = process.env["NEXT_PUBLIC_TURNSTILE_SITE_KEY"] ?? "";

type SubmitState = "idle" | "submitting" | "success" | "error";

const CATEGORY_OPTIONS = [
  { value: "bonding-document", label: "Bonding / Surety Document" },
  { value: "field-form", label: "Completed Field Form" },
  { value: "certificate", label: "Certificate / License" },
  { value: "program-update", label: "Program Update Request" },
  { value: "other", label: "Other" },
] as const;

const CATEGORY_OPTIONS_ES = [
  { value: "bonding-document", label: "Documento de fianza / garantía" },
  { value: "field-form", label: "Formulario de campo completado" },
  { value: "certificate", label: "Certificado / Licencia" },
  { value: "program-update", label: "Solicitud de actualización del programa" },
  { value: "other", label: "Otro" },
] as const;

// Minimal Turnstile global type — full definition lives in @types/cloudflare
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export default function SafetyIntakePage() {
  const locale = useLocale();
  const isEs = locale === "es";
  usePageTracking("Safety Intake");

  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const mountTurnstile = () => {
    if (!turnstileRef.current || !window.turnstile || !TURNSTILE_SITE_KEY) {
      return;
    }
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
    }
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "light",
      callback: (token) => {
        setTurnstileToken(token);
      },
      "expired-callback": () => {
        setTurnstileToken("");
      },
      "error-callback": () => {
        setTurnstileToken("");
      },
    });
    setTurnstileReady(true);
  };

  useEffect(() => {
    // If Turnstile script already loaded (e.g. HMR), mount immediately
    if (window.turnstile) {
      mountTurnstile();
    }
  }, []);

  const resetWidget = () => {
    setTurnstileToken("");
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!turnstileToken && TURNSTILE_SITE_KEY) {
      setErrorMessage(
        isEs
          ? "Complete la verificación de seguridad antes de enviar."
          : "Please complete the security check before submitting.",
      );
      return;
    }

    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      formData.set("turnstileToken", turnstileToken);

      const response = await fetch("/api/safety/intake", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitState("success");
        form.reset();
        resetWidget();
      } else {
        const data = (await response.json()) as { error?: string };
        setErrorMessage(
          data.error ??
            (isEs
              ? "El envío falló. Inténtelo de nuevo."
              : "Submission failed. Please try again."),
        );
        setSubmitState("error");
        resetWidget();
      }
    } catch {
      setErrorMessage(
        isEs
          ? "Error de red. Revise su conexión e intente de nuevo."
          : "Network error. Please check your connection and try again.",
      );
      setSubmitState("error");
      resetWidget();
    }
  };

  return (
    <>
      {/* Load Cloudflare Turnstile script */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={mountTurnstile}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <PageNavigation items={navigationConfigs.safety} />

        {/* Hero */}
        <section className="relative overflow-hidden bg-gray-950 py-20 text-white">
          <DiagonalStripePattern className="opacity-10" />
          <BrandColorBlobs className="opacity-20" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Safety Program", href: "/safety" },
                { label: "Document Intake" },
              ]}
              className="mb-6 justify-center text-gray-400"
            />
            <FadeInWhenVisible>
              {/* Dual Naming Format - Required per branding standards */}
              <div className="mb-4 flex justify-center">
                <span className="rounded-full border border-brand-secondary/40 bg-brand-secondary/10 px-4 py-1.5 text-sm font-medium text-brand-secondary">
                  {isEs
                    ? "Logística → Ingreso de documentos"
                    : "Logistics → Document Intake"}
                </span>
              </div>
              <h1 className="mb-4 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
                <span className="block text-brand-secondary mb-2">
                  {isEs
                    ? "Documentación crítica para la misión"
                    : "Mission-Critical Documentation"}
                </span>
                <span className="block text-white">
                  {isEs
                    ? "Ingreso de documentos de seguridad"
                    : "Safety Document Intake"}
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">
                {isEs
                  ? "Envíe documentos de fianza, formularios de campo completados, certificados o solicitudes de actualización del programa al equipo de Seguridad de MH Construction. Todos los envíos se revisan antes de cualquier acción."
                  : "Submit bonding documents, completed field forms, certificates, or program-update requests to the MH Construction Safety team. All submissions are reviewed before any action is taken."}
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Form section */}
        <section className="mx-auto max-w-2xl px-6 py-16">
          {submitState === "success" ? (
            <FadeInWhenVisible>
              <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center dark:border-green-800 dark:bg-green-950/30">
                <MaterialIcon
                  icon="check_circle"
                  className="mx-auto mb-4 text-5xl text-green-600 dark:text-green-400"
                />
                <h2 className="mb-2 text-2xl font-bold text-green-900 dark:text-green-100">
                  {isEs ? "Documento recibido" : "Document Received"}
                </h2>
                <p className="mb-6 text-green-800 dark:text-green-200">
                  {isEs
                    ? "Su documento ha sido puesto en cola para revisión por el equipo de Seguridad. Se le contactará al correo proporcionado si se requiere seguimiento."
                    : "Your document has been queued for review by the Safety team. You will be contacted at your provided email if any follow-up is needed."}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmitState("idle")}
                    className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {isEs ? "Enviar otro" : "Submit Another"}
                  </button>
                  <Link
                    href="/safety"
                    className="rounded-lg border border-green-700 px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-green-200 dark:hover:bg-green-900/40"
                  >
                    {isEs
                      ? "Volver al programa de seguridad"
                      : "Back to Safety Program"}
                  </Link>
                </div>
              </div>
            </FadeInWhenVisible>
          ) : (
            <FadeInWhenVisible>
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <StaggeredFadeIn staggerDelay={0.05}>
                  {/* Contact info */}
                  <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      {isEs ? "Su información" : "Your Information"}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {isEs ? "Nombre completo" : "Full Name"}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          maxLength={120}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {isEs ? "Correo electrónico" : "Email Address"}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          maxLength={160}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="company"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {isEs
                          ? "Compañía / Organización"
                          : "Company / Organization"}
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        maxLength={160}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Document details */}
                  <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      {isEs ? "Detalles del documento" : "Document Details"}
                    </h2>
                    <div className="mb-4">
                      <label
                        htmlFor="category"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {isEs ? "Categoría de documento" : "Document Category"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        defaultValue=""
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      >
                        <option value="" disabled>
                          {isEs
                            ? "Seleccione una categoría…"
                            : "Select a category…"}
                        </option>
                        {(isEs ? CATEGORY_OPTIONS_ES : CATEGORY_OPTIONS).map(
                          (opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="notes"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {isEs ? "Notas / Contexto" : "Notes / Context"}
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        maxLength={2000}
                        placeholder={
                          isEs
                            ? "Opcional: describa el documento o cualquier contexto útil para el revisor."
                            : "Optional — describe the document or any context the reviewer should know."
                        }
                        className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* File upload */}
                  <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      {isEs ? "Adjuntar documento" : "Attach Document"}
                    </h2>
                    <label
                      htmlFor="file"
                      className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {isEs ? "Archivo" : "File"}{" "}
                      <span className="text-red-500">*</span>
                      <span className="ml-2 font-normal text-gray-500">
                        {isEs
                          ? "PDF, DOC, DOCX, PNG, JPG — máximo 25 MB"
                          : "PDF, DOC, DOCX, PNG, JPG — max 25 MB"}
                      </span>
                    </label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      required
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-brand-primary/10 file:px-3 file:py-1 file:text-sm file:font-medium file:text-brand-primary hover:file:bg-brand-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  {/* Turnstile widget */}
                  {TURNSTILE_SITE_KEY ? (
                    <div>
                      <div
                        ref={turnstileRef}
                        className="flex items-center justify-center"
                      />
                      {!turnstileReady && (
                        <p className="mt-1 text-xs text-gray-500">
                          {isEs
                            ? "Cargando verificación de seguridad…"
                            : "Loading security check…"}
                        </p>
                      )}
                    </div>
                  ) : null}

                  {/* Error */}
                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
                    >
                      <MaterialIcon
                        icon="error_outline"
                        className="mt-0.5 shrink-0"
                      />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={
                      submitState === "submitting" ||
                      (Boolean(TURNSTILE_SITE_KEY) && !turnstileToken)
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitState === "submitting" ? (
                      <>
                        <MaterialIcon
                          icon="autorenew"
                          className="animate-spin"
                        />
                        {isEs ? "Enviando…" : "Submitting…"}
                      </>
                    ) : (
                      <>
                        <MaterialIcon icon="upload_file" />
                        {isEs ? "Enviar documento" : "Submit Document"}
                      </>
                    )}
                  </button>
                </StaggeredFadeIn>
              </form>
            </FadeInWhenVisible>
          )}

          {/* Info callout */}
          <FadeInWhenVisible delay={0.2}>
            <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-2 flex items-center gap-2">
                <MaterialIcon icon="info" className="text-brand-primary" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {isEs ? "¿Qué sigue?" : "What happens next?"}
                </span>
              </div>
              <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <MaterialIcon
                    icon="check"
                    className="mt-0.5 shrink-0 text-green-600 text-base"
                  />
                  {isEs
                    ? "Su documento se almacena de forma segura en nuestra cola privada de revisión."
                    : "Your document is stored securely in our private review queue."}
                </li>
                <li className="flex items-start gap-2">
                  <MaterialIcon
                    icon="check"
                    className="mt-0.5 shrink-0 text-green-600 text-base"
                  />
                  {isEs
                    ? "El equipo de Seguridad revisa todos los envíos antes de cualquier acción."
                    : "The Safety team reviews all submissions before any action."}
                </li>
                <li className="flex items-start gap-2">
                  <MaterialIcon
                    icon="check"
                    className="mt-0.5 shrink-0 text-green-600 text-base"
                  />
                  {isEs
                    ? "Se le contactará por correo electrónico si se requiere seguimiento."
                    : "You will be contacted at your email if follow-up is needed."}
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {isEs ? "¿Preguntas?" : "Questions?"}{" "}
                <Link
                  href="/contact"
                  className="font-medium text-brand-primary underline-offset-2 hover:underline"
                >
                  {isEs ? "Contáctenos directamente" : "Contact us directly"}
                </Link>{" "}
                {isEs ? "o llame al" : "or call"}{" "}
                <a
                  href="tel:+15093086489"
                  className="font-medium text-brand-primary underline-offset-2 hover:underline"
                >
                  (509) 308-6489
                </a>
                .
              </p>
            </div>
          </FadeInWhenVisible>
        </section>
      </div>
    </>
  );
}
