"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getEventLifecycleLabel, upcomingEvents } from "@/lib/data/events";

const timeline = [
  {
    time: "0500",
    titleEn: "Check-In, Breakfast & Safety Briefing",
    titleEs: "Registro, desayuno y charla de seguridad",
    icon: "fact_check",
  },
  {
    time: "0600",
    titleEn: "Fleet Launch",
    titleEs: "Salida de flota",
    icon: "sailing",
  },
  {
    time: "1330",
    titleEn: "Fleet Recovery & Weigh-In",
    titleEs: "Retorno de flota y pesaje",
    icon: "scale",
  },
  {
    time: "1400",
    titleEn: "Challenge Coin Presentation, Awards Ceremony & Prize Raffle",
    titleEs: "Presentacion de Challenge Coin, premiacion y rifa",
    icon: "emoji_events",
  },
] as const;

const fieldClass =
  "mt-2 min-h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-body text-base text-gray-950 shadow-sm outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25 dark:border-white/25 dark:bg-gray-950 dark:text-white";
const labelClass =
  "font-subheading text-sm font-semibold text-gray-900 dark:text-white";
const actionClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 font-heading text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

type RegistrationType = "veteran" | "captain";
type FormStatus = {
  kind: "idle" | "submitting" | "success" | "error";
  message?: string;
};

export function OperationCastRecoverPageClient({
  isEs = false,
}: Readonly<{ isEs?: boolean }>) {
  const locale = isEs ? "es" : "en";
  const fishingEvent = upcomingEvents.find(
    (event) => event.id === "operation-cast-recover-2026",
  );
  const lifecycleLabel = getEventLifecycleLabel(
    fishingEvent?.lifecycleStatus ?? "registration-open",
    locale,
  );
  const eventWindow = isEs
    ? (fishingEvent?.windowEs ?? "26 de septiembre de 2026")
    : (fishingEvent?.window ?? "September 26, 2026");

  const [confirmedVeterans, setConfirmedVeterans] = useState<number | null>(
    null,
  );
  const [veteranStatus, setVeteranStatus] = useState<FormStatus>({
    kind: "idle",
  });
  const [captainStatus, setCaptainStatus] = useState<FormStatus>({
    kind: "idle",
  });

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/events/cast-recover", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load roster status.");
        }
        return response.json();
      })
      .then((data: { confirmedVeterans?: number }) => {
        if (typeof data.confirmedVeterans === "number") {
          setConfirmedVeterans(
            Math.max(0, Math.min(data.confirmedVeterans, 50)),
          );
        }
      })
      .catch((error) => {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const submitRegistration = async (
    event: FormEvent<HTMLFormElement>,
    registrationType: RegistrationType,
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const setStatus =
      registrationType === "veteran" ? setVeteranStatus : setCaptainStatus;
    setStatus({ kind: "submitting" });

    const payload = Object.fromEntries(new FormData(form).entries());
    const submittedName =
      typeof payload["fullName"] === "string" ? payload["fullName"].trim() : "";
    const passengerCapacity = payload["passengerCapacity"]
      ? Number(payload["passengerCapacity"])
      : undefined;

    try {
      const response = await fetch("/api/events/cast-recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          passengerCapacity,
          registrationType,
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        rosterStatus?: "confirmed" | "alternate" | "received";
        registeredName?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Registration could not be completed.");
      }

      form.reset();
      const confirmedName = result.registeredName || submittedName;
      const registrationSubject = confirmedName
        ? isEs
          ? `${confirmedName} ha sido registrado.`
          : `${confirmedName} has been registered.`
        : isEs
          ? "Su registro se completo correctamente."
          : "Your registration has been completed.";
      if (registrationType === "veteran") {
        if (result.rosterStatus === "alternate") {
          setConfirmedVeterans(50);
          setStatus({
            kind: "success",
            message: isEs
              ? `${registrationSubject} El roster principal esta completo, por lo que este registro fue agregado al roster alterno.`
              : `${registrationSubject} The primary roster is full, so this entry has been added to the alternate roster.`,
          });
        } else {
          setConfirmedVeterans((current) => Math.min((current ?? 0) + 1, 50));
          setStatus({
            kind: "success",
            message: isEs
              ? `${registrationSubject} El registro de veterano esta confirmado. El equipo del evento dara seguimiento con los detalles finales.`
              : `${registrationSubject} Veteran registration is confirmed. Event staff will follow up with final details.`,
          });
        }
      } else {
        setStatus({
          kind: "success",
          message: isEs
            ? `${registrationSubject} Se recibio el registro de capitan. El equipo del evento le contactara para coordinar la embarcacion.`
            : `${registrationSubject} Captain registration has been received. Event staff will contact you about vessel coordination.`,
        });
      }
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : isEs
              ? "No se pudo completar el registro."
              : "Registration could not be completed.",
      });
    }
  };

  const alternateRoster = confirmedVeterans !== null && confirmedVeterans >= 50;

  return (
    <main className="bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
      <section className="relative min-h-[76svh] overflow-hidden border-b border-brand-secondary/40 py-12 text-white sm:py-20">
        <Image
          src="/images/events/operation-cast-recover/columbia-point-marina.jpg"
          alt="Columbia Point Marina Park and the Columbia River in Richland"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-gray-950/95 via-gray-950/72 to-brand-primary/32" />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-transparent to-gray-950/30" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="hero-safe-top hero-safe-bottom relative mx-auto flex min-h-[76svh] max-w-7xl items-end px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4 pb-8 sm:space-y-5 sm:pb-12">
            <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary-light sm:text-sm">
              {isEs ? "Evento anual organizado" : "Annual Hosted Event"}
            </p>
            <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
              Operation: Cast & Recover
            </h1>
            <p className="font-body max-w-3xl text-base leading-relaxed text-white/90 sm:text-xl">
              {isEs
                ? "Ruta dedicada para veteranos y capitanes voluntarios, con estado del evento, calendario confirmado y ruta de registro y participacion en Columbia Point Marina Park."
                : "Dedicated route for veteran and volunteer captain registration, with event status, confirmed schedule, and community coordination at Columbia Point Marina Park."}
            </p>
            <p className="font-subheading text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary">
              {isEs
                ? "Built on Quality, Backed by Trust. (Construido sobre calidad, respaldado por confianza.)"
                : "Built on Quality, Backed by Trust."}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                  {isEs ? "Estado del evento" : "Status"}
                </p>
                <p className="mt-1 text-sm font-bold text-white sm:text-base">
                  {lifecycleLabel}
                </p>
              </article>
              <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                  {isEs ? "Fecha del evento" : "Event date"}
                </p>
                <p className="mt-1 text-sm font-bold text-white sm:text-base">
                  {eventWindow}
                </p>
              </article>
              <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                  {isEs ? "Cobertura" : "Coverage"}
                </p>
                <p className="mt-1 text-sm font-bold text-white sm:text-base">
                  Tri-Cities, WA
                </p>
              </article>
            </div>
            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <a
                href="#veteran-registration"
                className={`${actionClass} w-full bg-brand-secondary text-gray-950 hover:bg-brand-secondary-light focus-visible:outline-brand-secondary sm:w-auto`}
              >
                <MaterialIcon icon="how_to_reg" size="sm" />
                {isEs ? "Registro de veteranos" : "Veteran Registration"}
              </a>
              <a
                href="#captain-registration"
                className={`${actionClass} w-full border-2 border-white bg-gray-950/45 text-white backdrop-blur-sm hover:bg-white hover:text-gray-950 focus-visible:outline-white sm:w-auto`}
              >
                <MaterialIcon icon="sailing" size="sm" />
                {isEs
                  ? "Registro de capitan / embarcacion"
                  : "Captain / Boat Registration"}
              </a>
              <Link
                href="/contact"
                className={`${actionClass} w-full border-2 border-white bg-white/10 text-white hover:bg-white/20 focus-visible:outline-brand-secondary sm:w-auto`}
              >
                <MaterialIcon icon="groups" size="sm" />
                {isEs ? "Solicitar coordinacion" : "Request Coordination"}
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white sm:text-base">
              <span className="inline-flex items-center gap-2">
                <MaterialIcon
                  icon="calendar_month"
                  size="sm"
                  className="text-brand-secondary-light"
                />
                {eventWindow}
              </span>
              <span className="inline-flex items-center gap-2">
                <MaterialIcon
                  icon="directions_boat"
                  size="sm"
                  className="text-brand-secondary-light"
                />
                {isEs ? "Salida 0600" : "Launch 0600"}
              </span>
              <span className="inline-flex items-center gap-2">
                <MaterialIcon
                  icon="military_tech"
                  size="sm"
                  className="text-brand-secondary-light"
                />
                {isEs ? "Premiacion 1400" : "Awards 1400"}
              </span>
            </div>
            <p className="text-xs text-white/70">
              {isEs
                ? "Foto de sede: Allen4names, CC BY-SA 3.0, via Wikimedia Commons."
                : "Venue photo: Allen4names, CC BY-SA 3.0, via Wikimedia Commons."}
            </p>
          </div>
        </div>
      </section>

      <div className="border-b border-gray-200 bg-white dark:border-white/10 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Breadcrumb
            items={
              isEs
                ? [
                    { label: "Inicio", href: "/" },
                    { label: "Eventos", href: "/events" },
                    { label: "Operation: Cast & Recover" },
                  ]
                : [
                    { label: "Home", href: "/" },
                    { label: "Events", href: "/events" },
                    { label: "Operation: Cast & Recover" },
                  ]
            }
          />
        </div>
      </div>

      <section className="border-b border-gray-200 bg-gray-50 py-14 dark:border-white/10 dark:bg-gray-900 sm:py-18">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div>
            <p className="font-subheading text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary-text dark:text-brand-secondary-light">
              {isEs
                ? "Evento comunitario | Mision"
                : "Community Event | Mission Brief"}
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              {isEs
                ? "Un dia en el agua, enfocado en servicio y conexion."
                : "A day on the water, built around service and connection."}
            </h2>
            <p className="font-body mt-5 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200 sm:text-lg">
              {isEs
                ? "MH Construction organiza este evento anual de pesca comunitaria para conectar veteranos de todas las epocas y ramas con capitanes voluntarios. Como empresa Veteran-Owned, colaboramos con Nixon's Marine y la Richland Chamber of Commerce para coordinar experiencia local y apoyo operativo para la comunidad veterana de Tri-Cities."
                : "MH Construction is hosting an annual community fishing event that connects veterans from every era and branch with volunteer captains. As a Veteran-Owned company, we partner with Nixon&apos;s Marine and the Richland Chamber of Commerce to coordinate local expertise and day-of support for the Tri-Cities veteran community."}
            </p>
            <p className="font-body mt-4 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200">
              {isEs
                ? "El objetivo planeado es Fall King Salmon. Las condiciones del rio y de pesqueria guiaran la decision final, con walleye o bass disponibles segun criterio de cada capitan si se requiere contingencia."
                : "The planned target is Fall King Salmon. River and fishery conditions will guide the final call, with walleye or bass available at each captain&apos;s discretion if a contingency is needed."}
            </p>
            <p className="font-body mt-4 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200">
              {isEs
                ? "El evento de este ano incluye una presentacion conmemorativa de Challenge Coin para destacar servicio, alianza local y el proposito veteran-first de la jornada."
                : "This year&apos;s event includes a commemorative Challenge Coin presentation to spotlight service, local partnership, and the veteran-first purpose of the day."}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 shadow-sm dark:border-white/15 dark:bg-white/15">
            {[
              [isEs ? "Cupos de veteranos" : "Veteran slots", "50"],
              [isEs ? "Flota prevista" : "Planned fleet", "10-12 vessels"],
              [
                isEs ? "Elegibilidad" : "Veteran eligibility",
                isEs ? "Todas las epocas y ramas" : "All eras & branches",
              ],
              [
                isEs ? "Objetivo principal" : "Primary target",
                "Fall King Salmon",
              ],
              [
                isEs ? "Challenge coin" : "Challenge coin",
                isEs
                  ? "Presentacion conmemorativa"
                  : "Commemorative presentation",
              ],
            ].map(([term, detail]) => (
              <div key={term} className="bg-white p-5 dark:bg-gray-950">
                <dt className="font-subheading text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                  {term}
                </dt>
                <dd className="mt-2 text-lg font-black text-brand-primary dark:text-brand-secondary-light">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="timeline" className="py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-subheading text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary-text dark:text-brand-secondary-light">
            {isEs
              ? "Calendario del evento | Cronograma operativo"
              : "Event Schedule | Operational Timeline"}
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            {isEs ? "Calendario del 26 de septiembre" : "September 26 schedule"}
          </h2>
          <div className="mt-8 grid overflow-hidden rounded-lg border border-gray-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-white/15">
            {timeline.map((item, index) => (
              <article
                key={item.time}
                className="relative border-b border-gray-200 p-6 last:border-b-0 sm:border-r sm:nth-2:border-r-0 lg:border-b-0 lg:nth-2:border-r lg:last:border-r-0 dark:border-white/15"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl font-black text-brand-primary dark:text-brand-secondary-light">
                    {item.time}
                  </span>
                  <MaterialIcon
                    icon={item.icon}
                    size="lg"
                    className="text-brand-secondary-text dark:text-brand-secondary"
                  />
                </div>
                <h3 className="mt-5 text-base font-bold">
                  {isEs ? item.titleEs : item.titleEn}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {isEs
                    ? `Parada ${index + 1} de ${timeline.length}`
                    : `Stop ${index + 1} of ${timeline.length}`}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-primary/25 bg-brand-primary py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-subheading text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary-light">
              {isEs
                ? "Estado del roster de veteranos"
                : "Veteran Roster Status"}
            </p>
            <h2 className="mt-2 text-2xl font-black">
              {alternateRoster
                ? isEs
                  ? "Roster principal completo"
                  : "Primary roster filled"
                : isEs
                  ? "Registro de veteranos abierto"
                  : "Veteran registration is open"}
            </h2>
            <p className="font-body mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
              {alternateRoster
                ? isEs
                  ? "Nuevos registros de veteranos se colocan en roster alterno por orden de envio."
                  : "New veteran registrations are being placed on the alternate roster in submission order."
                : confirmedVeterans === null
                  ? isEs
                    ? "Hay 50 posiciones primarias para veteranos, seguidas por roster alterno."
                    : "Fifty primary veteran positions are available, followed by an alternate roster."
                  : isEs
                    ? `${50 - confirmedVeterans} de 50 posiciones primarias disponibles.`
                    : `${50 - confirmedVeterans} of 50 primary veteran positions remain.`}
            </p>
          </div>
          <span
            className="shrink-0 text-5xl font-black text-brand-secondary-light"
            aria-label={
              confirmedVeterans === null
                ? isEs
                  ? "Capacidad 50"
                  : "Capacity 50"
                : isEs
                  ? `${confirmedVeterans} de 50 posiciones ocupadas`
                  : `${confirmedVeterans} of 50 positions filled`
            }
          >
            {confirmedVeterans ?? 0}
            <span className="text-2xl text-white/70">/50</span>
          </span>
        </div>
      </section>

      <section
        id="registration"
        className="bg-gray-50 py-14 dark:bg-gray-900 sm:py-18"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-subheading text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary-text dark:text-brand-secondary-light">
            {isEs
              ? "Portales de registro | Ingreso de participantes"
              : "Registration Portals | Participant Intake"}
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            {isEs
              ? "Seleccione su ruta de registro"
              : "Choose your registration path"}
          </h2>
          <p className="font-body mt-3 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200">
            {isEs
              ? "Los campos requeridos ayudan al equipo del evento a coordinar asignaciones de embarcacion, planificacion de seguridad y comunicacion del dia."
              : "Required fields help event staff coordinate vessel assignments, safety planning, and day-of communication."}
          </p>
          <div className="mt-5 rounded-lg border border-brand-primary/20 bg-brand-primary/5 px-4 py-3 dark:border-brand-secondary/30 dark:bg-brand-secondary/10">
            <p className="font-subheading text-xs font-bold uppercase tracking-[0.14em] text-brand-primary dark:text-brand-secondary-light">
              {isEs
                ? "Elemento destacado | Challenge Coin"
                : "Spotlight Feature | Challenge Coin"}
            </p>
            <p className="font-body mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              {isEs
                ? "Los participantes registrados seran reconocidos durante la presentacion de Challenge Coin como parte del bloque de premiacion de las 1400."
                : "Registered participants will be recognized during the Challenge Coin presentation as part of the 1400 awards block."}
            </p>
          </div>

          <div className="mt-9 grid gap-8 lg:grid-cols-2 lg:items-start">
            <RegistrationFormShell
              id="veteran-registration"
              icon="military_tech"
              title={isEs ? "Registro de veteranos" : "Veteran Sign-Up"}
              description={
                isEs
                  ? "Abierto para veteranos de todas las epocas y ramas de servicio. Las posiciones primarias se asignan por orden de registro."
                  : "Open to veterans from every era and service branch. Primary placements are assigned in registration order."
              }
              status={veteranStatus}
            >
              <form
                onSubmit={(event) => submitRegistration(event, "veteran")}
                className="mt-6 grid gap-5 sm:grid-cols-2"
              >
                <TextField
                  name="fullName"
                  label={isEs ? "Nombre completo" : "Full Name"}
                  autoComplete="name"
                  required
                />
                <SelectField
                  name="branchOfService"
                  label={isEs ? "Rama de servicio" : "Branch of Service"}
                  placeholder={isEs ? "Seleccione una opcion" : "Select one"}
                  required
                  options={[
                    isEs ? "Ejercito" : "Army",
                    isEs ? "Cuerpo de Marines" : "Marine Corps",
                    "Navy",
                    isEs ? "Fuerza Aerea" : "Air Force",
                    isEs ? "Fuerza Espacial" : "Space Force",
                    isEs ? "Guardia Costera" : "Coast Guard",
                    isEs ? "Guardia Nacional" : "National Guard",
                    isEs ? "Otro" : "Other",
                  ]}
                />
                <TextField
                  name="phone"
                  label={isEs ? "Telefono" : "Phone"}
                  type="tel"
                  autoComplete="tel"
                  required
                />
                <TextField
                  name="email"
                  label={isEs ? "Correo electronico" : "Email"}
                  type="email"
                  autoComplete="email"
                  required
                />
                <TextField
                  name="emergencyContact"
                  label={
                    isEs
                      ? "Contacto de emergencia (nombre y telefono)"
                      : "Emergency Contact (name and phone)"
                  }
                  autoComplete="off"
                  required
                  className="sm:col-span-2"
                />
                <SelectField
                  name="tshirtSize"
                  label={isEs ? "Talla de camiseta" : "T-Shirt Size"}
                  placeholder={isEs ? "Seleccione una opcion" : "Select one"}
                  required
                  options={["S", "M", "L", "XL", "2XL", "3XL", "4XL"]}
                />
                <HoneypotField />
                <ConsentField
                  label={
                    isEs
                      ? "Confirmo que estos datos son correctos y autorizo contacto sobre este evento."
                      : "I confirm these details are accurate and agree to be contacted about this event."
                  }
                />
                <button
                  type="submit"
                  disabled={veteranStatus.kind === "submitting"}
                  className={`${actionClass} bg-brand-primary text-white hover:bg-brand-primary-dark focus-visible:outline-brand-primary sm:col-span-2`}
                >
                  <MaterialIcon icon="how_to_reg" size="sm" />
                  {veteranStatus.kind === "submitting"
                    ? isEs
                      ? "Enviando..."
                      : "Submitting..."
                    : alternateRoster
                      ? isEs
                        ? "Unirse al roster alterno"
                        : "Join Alternate Roster"
                      : isEs
                        ? "Registrarse como veterano"
                        : "Register as a Veteran"}
                </button>
              </form>
            </RegistrationFormShell>

            <RegistrationFormShell
              id="captain-registration"
              icon="sailing"
              title={
                isEs
                  ? "Registro de capitanes voluntarios"
                  : "Volunteer Captain Sign-Up"
              }
              description={
                isEs
                  ? "Los capitanes aportan embarcacion, equipo de seguridad requerido y criterio operativo local para participantes asignados."
                  : "Captains provide the vessel, required safety equipment, and local operating judgment for assigned participants."
              }
              status={captainStatus}
            >
              <form
                onSubmit={(event) => submitRegistration(event, "captain")}
                className="mt-6 grid gap-5 sm:grid-cols-2"
              >
                <TextField
                  name="fullName"
                  label={isEs ? "Nombre completo" : "Full Name"}
                  autoComplete="name"
                  required
                />
                <TextField
                  name="phone"
                  label={isEs ? "Telefono" : "Phone"}
                  type="tel"
                  autoComplete="tel"
                  required
                />
                <TextField
                  name="email"
                  label={isEs ? "Correo electronico" : "Email"}
                  type="email"
                  autoComplete="email"
                  required
                  className="sm:col-span-2"
                />
                <TextField
                  name="vesselTypeLength"
                  label={
                    isEs
                      ? "Tipo / eslora de embarcacion"
                      : "Vessel Type / Length"
                  }
                  placeholder={
                    isEs
                      ? "Ejemplo: lancha de aluminio de 22 pies"
                      : "Example: 22 ft aluminum sled"
                  }
                  required
                  className="sm:col-span-2"
                />
                <SelectField
                  name="passengerCapacity"
                  label={
                    isEs
                      ? "Capacidad de veteranos"
                      : "Veteran Passenger Capacity"
                  }
                  placeholder={isEs ? "Seleccione una opcion" : "Select one"}
                  required
                  options={["3", "4", "5", "6"]}
                />
                <label className={`${labelClass} sm:col-span-2`}>
                  {isEs
                    ? "Notas de electronica marina / equipo"
                    : "Marine Electronics / Gear Notes"}
                  <textarea
                    name="gearNotes"
                    rows={4}
                    maxLength={1000}
                    className={fieldClass}
                    placeholder={
                      isEs
                        ? "Sonda, GPS, downriggers, asientos cubiertos, notas de accesibilidad u otros detalles utiles"
                        : "Fish finder, GPS, downriggers, covered seating, accessibility notes, or other useful details"
                    }
                  />
                </label>
                <HoneypotField />
                <ConsentField
                  label={
                    isEs
                      ? "Confirmo que estos datos son correctos y autorizo contacto sobre este evento."
                      : "I confirm these details are accurate and agree to be contacted about this event."
                  }
                />
                <button
                  type="submit"
                  disabled={captainStatus.kind === "submitting"}
                  className={`${actionClass} bg-brand-primary text-white hover:bg-brand-primary-dark focus-visible:outline-brand-primary sm:col-span-2`}
                >
                  <MaterialIcon icon="directions_boat" size="sm" />
                  {captainStatus.kind === "submitting"
                    ? isEs
                      ? "Enviando..."
                      : "Submitting..."
                    : isEs
                      ? "Registrarse como capitan"
                      : "Register as a Captain"}
                </button>
              </form>
            </RegistrationFormShell>
          </div>
        </div>
      </section>

      <section
        id="sponsorship"
        className="border-y border-gray-200 py-14 dark:border-white/10 sm:py-18"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_20rem] lg:items-center lg:px-8">
          <div>
            <p className="font-subheading text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary-text dark:text-brand-secondary-light">
              {isEs
                ? "Apoyo comunitario | Patrocinio"
                : "Community Support | Sponsorship Callout"}
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              {isEs
                ? "Ayude a equipar la jornada y fortalecer la mesa de premios."
                : "Help equip the day and strengthen the prize table."}
            </h2>
            <p className="font-body mt-5 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200 sm:text-lg">
              {isEs
                ? "Empresas locales, miembros de camara y aliados del oficio pueden apoyar el evento con articulos para rifa, equipo de pesca, suministros para participantes, alimentos o patrocinio directo. Cada contribucion se coordinara con reconocimiento claro y necesidades practicas del evento."
                : "Local businesses, Chamber members, and trade partners can support the event with high-value raffle items, fishing gear, participant supplies, meals, or direct event sponsorship. Every contribution will be coordinated with clear acknowledgment and practical event needs."}
            </p>
            <p className="font-body mt-4 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200">
              {isEs
                ? "Los patrocinadores tambien pueden apoyar la presentacion conmemorativa de Challenge Coin, que destaca el reconocimiento a veteranos y el compromiso de aliados."
                : "Sponsors can also support the commemorative Challenge Coin presentation that highlights veteran recognition and partner commitment."}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-white/15 dark:bg-gray-950">
              <Image
                src="/images/vendors/nixons-marine-greyscale.webp"
                alt="Nixon's Marine partner logo"
                width={160}
                height={64}
                className="h-10 w-auto"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-600 dark:text-gray-300">
                {isEs ? "Aliado destacado" : "Partner Highlight"}
              </span>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/downloads/events/operation-cast-recover-sponsorship.pdf"
                download
                className={`${actionClass} bg-brand-primary text-white hover:bg-brand-primary-dark focus-visible:outline-brand-primary`}
              >
                <MaterialIcon icon="picture_as_pdf" size="sm" />
                {isEs
                  ? "Descargar PDF de patrocinio"
                  : "Download Sponsorship PDF"}
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email.main}?subject=Operation%3A%20Cast%20%26%20Recover%20Sponsorship`}
                className={`${actionClass} border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus-visible:outline-brand-primary dark:border-brand-secondary dark:text-brand-secondary-light`}
              >
                <MaterialIcon icon="handshake" size="sm" />
                {isEs
                  ? "Contactar al equipo del evento"
                  : "Contact the Event Team"}
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5 text-center shadow-lg dark:border-white/15 dark:bg-gray-900">
            <Image
              src="/images/events/operation-cast-recover/registration-qr.png"
              alt="QR code for the Operation: Cast & Recover registration page"
              width={640}
              height={640}
              className="mx-auto aspect-square w-full max-w-64"
            />
            <p className="mt-3 text-sm font-bold">
              {isEs
                ? "Escanee para ver detalles y registro del evento"
                : "Scan for event details and registration"}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 py-14 text-white sm:py-18">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          <div>
            <p className="font-subheading text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary-light">
              {isEs ? "Contacto del evento" : "Event Contact"}
            </p>
            <h2 className="mt-3 text-2xl font-black">
              {isEs
                ? "Preguntas antes del dia de salida?"
                : "Questions before launch day?"}
            </h2>
            <div className="mt-5 space-y-3 text-sm text-white/85">
              <a
                className="flex items-center gap-3 hover:text-brand-secondary-light"
                href={`tel:${COMPANY_INFO.phone.tel}`}
              >
                <MaterialIcon icon="phone" size="sm" />
                {COMPANY_INFO.phone.display}
              </a>
              <a
                className="flex items-center gap-3 hover:text-brand-secondary-light"
                href={`mailto:${COMPANY_INFO.email.main}`}
              >
                <MaterialIcon icon="mail" size="sm" />
                {COMPANY_INFO.email.main}
              </a>
            </div>
          </div>
          <div>
            <p className="font-subheading text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary-light">
              {isEs ? "Sede | Punto de reunion" : "Venue | Rally Point"}
            </p>
            <h2 className="mt-3 text-xl font-black">
              Columbia Point Marina Park
            </h2>
            <p className="font-body mt-3 text-sm leading-relaxed text-white/80">
              Columbia Point at the Riverfront Trail
              <br />
              Richland, WA 99352
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Columbia+Point+Marina+Park+Richland+WA+99352"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary-light underline underline-offset-4"
            >
              <MaterialIcon icon="map" size="sm" />
              {isEs ? "Abrir mapa" : "Open map"}
            </a>
          </div>
          <div>
            <p className="font-subheading text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary-light">
              {isEs ? "Siga a MH Construction" : "Follow MH Construction"}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                ["Facebook", COMPANY_INFO.social.facebook],
                ["Instagram", COMPANY_INFO.social.instagram],
                ["LinkedIn", COMPANY_INFO.social.linkedin],
                ["YouTube", COMPANY_INFO.social.youtube],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-lg border border-white/25 px-3 py-2 text-sm font-semibold hover:border-brand-secondary hover:text-brand-secondary-light"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/15 px-4 pt-6 text-xs text-white/60 sm:px-6 lg:px-8">
          <p>
            {isEs
              ? "© 2026 MH Construction, Inc. Built on Quality, Backed by Trust."
              : "© 2026 MH Construction, Inc. Built on Quality, Backed by Trust."}
          </p>
          <p className="mt-2">
            {isEs
              ? "Profesionales en la linea. Minuciosos en los detalles."
              : "Professional on the line. Thorough in the details."}
          </p>
          <Link
            href="/events"
            className="mt-3 inline-flex items-center gap-2 font-semibold text-brand-secondary-light underline underline-offset-4"
          >
            <MaterialIcon icon="arrow_back" size="sm" />
            {isEs ? "Volver a eventos" : "Return to Events"}
          </Link>
        </div>
      </section>
    </main>
  );
}

function RegistrationFormShell({
  id,
  icon,
  title,
  description,
  status,
  children,
}: Readonly<{
  id: string;
  icon: string;
  title: string;
  description: string;
  status: FormStatus;
  children: React.ReactNode;
}>) {
  return (
    <article
      id={id}
      className="scroll-mt-28 rounded-lg border border-gray-200 bg-white p-5 shadow-lg dark:border-white/15 dark:bg-gray-950 sm:p-7"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand-primary text-white">
          <MaterialIcon icon={icon} size="md" />
        </span>
        <div>
          <h3 className="text-2xl font-black">{title}</h3>
          <p className="font-body mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
      {status.kind !== "idle" && status.kind !== "submitting" && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-5 rounded-lg border px-4 py-3 text-sm font-semibold ${status.kind === "success" ? "border-brand-primary/35 bg-brand-primary/10 text-brand-primary dark:text-brand-secondary-light" : "border-red-500/40 bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-200"}`}
        >
          {status.message}
        </div>
      )}
      {children}
    </article>
  );
}

function TextField({
  name,
  label,
  className = "",
  ...props
}: Readonly<
  {
    name: string;
    label: string;
    className?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>) {
  return (
    <label className={`${labelClass} ${className}`}>
      {label}
      <input name={name} className={fieldClass} {...props} />
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
  placeholder = "Select one",
  required,
}: Readonly<{
  name: string;
  label: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
}>) {
  return (
    <label className={labelClass}>
      {label}
      <select
        name={name}
        required={required}
        defaultValue=""
        className={fieldClass}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ConsentField({ label }: Readonly<{ label: string }>) {
  return (
    <label className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-200 sm:col-span-2">
      <input
        type="checkbox"
        required
        className="mt-1 size-5 accent-brand-primary"
      />
      <span>{label}</span>
    </label>
  );
}

function HoneypotField() {
  return (
    <label className="absolute left-[-9999px]" aria-hidden="true">
      Website
      <input name="website" tabIndex={-1} autoComplete="off" />
    </label>
  );
}
