"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { COMPANY_INFO } from "@/lib/constants/company";

const timeline = [
  {
    time: "0500",
    title: "Check-In, Breakfast & Safety Briefing",
    icon: "fact_check",
  },
  { time: "0600", title: "Fleet Launch", icon: "sailing" },
  { time: "1330", title: "Fleet Recovery & Weigh-In", icon: "scale" },
  {
    time: "1400",
    title: "Awards Ceremony & Prize Raffle",
    icon: "emoji_events",
  },
] as const;

const fieldClass =
  "mt-2 min-h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-body text-base text-gray-950 shadow-sm outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25 dark:border-white/25 dark:bg-gray-950 dark:text-white";
const labelClass =
  "font-subheading text-sm font-semibold text-gray-900 dark:text-white";
const actionClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 font-heading text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

type RegistrationType = "veteran" | "captain";
type FormStatus = {
  kind: "idle" | "submitting" | "success" | "error";
  message?: string;
};

export function OperationCastRecoverPageClient() {
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
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Registration could not be completed.");
      }

      form.reset();
      if (registrationType === "veteran") {
        if (result.rosterStatus === "alternate") {
          setConfirmedVeterans(50);
          setStatus({
            kind: "success",
            message:
              "Your registration is complete. The primary roster is full, so you have been added to the alternate roster.",
          });
        } else {
          setConfirmedVeterans((current) => Math.min((current ?? 0) + 1, 50));
          setStatus({
            kind: "success",
            message:
              "Your veteran registration is confirmed. Event staff will follow up with final details.",
          });
        }
      } else {
        setStatus({
          kind: "success",
          message:
            "Your captain registration has been received. Event staff will contact you about vessel coordination.",
        });
      }
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Registration could not be completed.",
      });
    }
  };

  const alternateRoster = confirmedVeterans !== null && confirmedVeterans >= 50;

  return (
    <main className="bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
      <section className="relative min-h-[76svh] overflow-hidden border-b border-brand-secondary/40 text-white">
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
        <div className="hero-safe-top hero-safe-bottom relative mx-auto flex min-h-[76svh] max-w-7xl items-end px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl pb-8 sm:pb-12">
            <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary-light sm:text-sm">
              MH Construction Presents
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
              Operation: Cast & Recover
            </h1>
            <p className="font-body mt-4 max-w-3xl text-base leading-relaxed text-white/90 sm:text-xl">
              Annual Community Fishing Event for Veterans and Volunteer Captains
              | Columbia Point Marina Park, Richland, WA
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white sm:text-base">
              <span className="inline-flex items-center gap-2">
                <MaterialIcon
                  icon="calendar_month"
                  size="sm"
                  className="text-brand-secondary-light"
                />
                September 26, 2026
              </span>
              <span className="inline-flex items-center gap-2">
                <MaterialIcon
                  icon="directions_boat"
                  size="sm"
                  className="text-brand-secondary-light"
                />
                Launch 0600
              </span>
              <span className="inline-flex items-center gap-2">
                <MaterialIcon
                  icon="military_tech"
                  size="sm"
                  className="text-brand-secondary-light"
                />
                Awards 1400
              </span>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#veteran-registration"
                className={`${actionClass} bg-brand-secondary text-gray-950 hover:bg-brand-secondary-light focus-visible:outline-brand-secondary`}
              >
                <MaterialIcon icon="how_to_reg" size="sm" />
                Veteran Registration
              </a>
              <a
                href="#captain-registration"
                className={`${actionClass} border-2 border-white bg-gray-950/45 text-white backdrop-blur-sm hover:bg-white hover:text-gray-950 focus-visible:outline-white`}
              >
                <MaterialIcon icon="sailing" size="sm" />
                Captain / Boat Registration
              </a>
            </div>
            <p className="mt-5 text-xs text-white/70">
              Venue photo: Allen4names, CC BY-SA 3.0, via Wikimedia Commons.
            </p>
          </div>
        </div>
      </section>

      <div className="border-b border-gray-200 bg-white dark:border-white/10 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Events", href: "/events" },
              { label: "Operation: Cast & Recover" },
            ]}
          />
        </div>
      </div>

      <section className="border-b border-gray-200 bg-gray-50 py-14 dark:border-white/10 dark:bg-gray-900 sm:py-18">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div>
            <p className="font-subheading text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary-text dark:text-brand-secondary-light">
              Community Event | Mission Brief
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              A day on the water, built around service and connection.
            </h2>
            <p className="font-body mt-5 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200 sm:text-lg">
              MH Construction is hosting an annual community fishing event that
              connects veterans from every era and branch with volunteer
              captains. As a Veteran-Owned company, we partner with Nixon&apos;s
              Marine and the Richland Chamber of Commerce to coordinate local
              expertise and day-of support for the Tri-Cities veteran community.
            </p>
            <p className="font-body mt-4 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200">
              The planned target is Fall King Salmon. River and fishery
              conditions will guide the final call, with walleye or bass
              available at each captain&apos;s discretion if a contingency is
              needed.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 shadow-sm dark:border-white/15 dark:bg-white/15">
            {[
              ["Veteran slots", "50"],
              ["Planned fleet", "10-12 vessels"],
              ["Veteran eligibility", "All eras & branches"],
              ["Primary target", "Fall King Salmon"],
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
            Event Schedule | Operational Timeline
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            September 26 schedule
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
                <h3 className="mt-5 text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Stop {index + 1} of {timeline.length}
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
              Veteran Roster Status
            </p>
            <h2 className="mt-2 text-2xl font-black">
              {alternateRoster
                ? "Primary roster filled"
                : "Veteran registration is open"}
            </h2>
            <p className="font-body mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
              {alternateRoster
                ? "New veteran registrations are being placed on the alternate roster in submission order."
                : confirmedVeterans === null
                  ? "Fifty primary veteran positions are available, followed by an alternate roster."
                  : `${50 - confirmedVeterans} of 50 primary veteran positions remain.`}
            </p>
          </div>
          <span
            className="shrink-0 text-5xl font-black text-brand-secondary-light"
            aria-label={
              confirmedVeterans === null
                ? "Capacity 50"
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
            Registration Portals | Participant Intake
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Choose your registration path
          </h2>
          <p className="font-body mt-3 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200">
            Required fields help event staff coordinate vessel assignments,
            safety planning, and day-of communication.
          </p>

          <div className="mt-9 grid gap-8 lg:grid-cols-2 lg:items-start">
            <RegistrationFormShell
              id="veteran-registration"
              icon="military_tech"
              title="Veteran Sign-Up"
              description="Open to veterans from every era and service branch. Primary placements are assigned in registration order."
              status={veteranStatus}
            >
              <form
                onSubmit={(event) => submitRegistration(event, "veteran")}
                className="mt-6 grid gap-5 sm:grid-cols-2"
              >
                <TextField
                  name="fullName"
                  label="Full Name"
                  autoComplete="name"
                  required
                />
                <SelectField
                  name="branchOfService"
                  label="Branch of Service"
                  required
                  options={[
                    "Army",
                    "Marine Corps",
                    "Navy",
                    "Air Force",
                    "Space Force",
                    "Coast Guard",
                    "National Guard",
                    "Other",
                  ]}
                />
                <TextField
                  name="phone"
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  required
                />
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <TextField
                  name="emergencyContact"
                  label="Emergency Contact (name and phone)"
                  autoComplete="off"
                  required
                  className="sm:col-span-2"
                />
                <SelectField
                  name="tshirtSize"
                  label="T-Shirt Size"
                  required
                  options={["S", "M", "L", "XL", "2XL", "3XL", "4XL"]}
                />
                <HoneypotField />
                <ConsentField />
                <button
                  type="submit"
                  disabled={veteranStatus.kind === "submitting"}
                  className={`${actionClass} bg-brand-primary text-white hover:bg-brand-primary-dark focus-visible:outline-brand-primary sm:col-span-2`}
                >
                  <MaterialIcon icon="how_to_reg" size="sm" />
                  {veteranStatus.kind === "submitting"
                    ? "Submitting..."
                    : alternateRoster
                      ? "Join Alternate Roster"
                      : "Register as a Veteran"}
                </button>
              </form>
            </RegistrationFormShell>

            <RegistrationFormShell
              id="captain-registration"
              icon="sailing"
              title="Volunteer Captain Sign-Up"
              description="Captains provide the vessel, required safety equipment, and local operating judgment for assigned participants."
              status={captainStatus}
            >
              <form
                onSubmit={(event) => submitRegistration(event, "captain")}
                className="mt-6 grid gap-5 sm:grid-cols-2"
              >
                <TextField
                  name="fullName"
                  label="Full Name"
                  autoComplete="name"
                  required
                />
                <TextField
                  name="phone"
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  required
                />
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  required
                  className="sm:col-span-2"
                />
                <TextField
                  name="vesselTypeLength"
                  label="Vessel Type / Length"
                  placeholder="Example: 22 ft aluminum sled"
                  required
                  className="sm:col-span-2"
                />
                <SelectField
                  name="passengerCapacity"
                  label="Veteran Passenger Capacity"
                  required
                  options={["3", "4", "5", "6"]}
                />
                <label className={`${labelClass} sm:col-span-2`}>
                  Marine Electronics / Gear Notes
                  <textarea
                    name="gearNotes"
                    rows={4}
                    maxLength={1000}
                    className={fieldClass}
                    placeholder="Fish finder, GPS, downriggers, covered seating, accessibility notes, or other useful details"
                  />
                </label>
                <HoneypotField />
                <ConsentField />
                <button
                  type="submit"
                  disabled={captainStatus.kind === "submitting"}
                  className={`${actionClass} bg-brand-primary text-white hover:bg-brand-primary-dark focus-visible:outline-brand-primary sm:col-span-2`}
                >
                  <MaterialIcon icon="directions_boat" size="sm" />
                  {captainStatus.kind === "submitting"
                    ? "Submitting..."
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
              Community Support | Sponsorship Callout
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Help equip the day and strengthen the prize table.
            </h2>
            <p className="font-body mt-5 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200 sm:text-lg">
              Local businesses, Chamber members, and trade partners can support
              the event with high-value raffle items, fishing gear, participant
              supplies, meals, or direct event sponsorship. Every contribution
              will be coordinated with clear acknowledgment and practical event
              needs.
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
                Partner Highlight
              </span>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/downloads/events/operation-cast-recover-sponsorship.pdf"
                download
                className={`${actionClass} bg-brand-primary text-white hover:bg-brand-primary-dark focus-visible:outline-brand-primary`}
              >
                <MaterialIcon icon="picture_as_pdf" size="sm" />
                Download Sponsorship PDF
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email.main}?subject=Operation%3A%20Cast%20%26%20Recover%20Sponsorship`}
                className={`${actionClass} border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus-visible:outline-brand-primary dark:border-brand-secondary dark:text-brand-secondary-light`}
              >
                <MaterialIcon icon="handshake" size="sm" />
                Contact the Event Team
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
              Scan for event details and registration
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 py-14 text-white sm:py-18">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          <div>
            <p className="font-subheading text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary-light">
              Event Contact
            </p>
            <h2 className="mt-3 text-2xl font-black">
              Questions before launch day?
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
              Venue | Rally Point
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
              Open map
            </a>
          </div>
          <div>
            <p className="font-subheading text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary-light">
              Follow MH Construction
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
            &copy; 2026 MH Construction, Inc. Built on Quality, Backed by Trust.
          </p>
          <p className="mt-2">
            Professional on the line. Thorough in the details.
          </p>
          <Link
            href="/events"
            className="mt-3 inline-flex items-center gap-2 font-semibold text-brand-secondary-light underline underline-offset-4"
          >
            <MaterialIcon icon="arrow_back" size="sm" />
            Return to Events
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
  required,
}: Readonly<{
  name: string;
  label: string;
  options: string[];
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
          Select one
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

function ConsentField() {
  return (
    <label className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-200 sm:col-span-2">
      <input
        type="checkbox"
        required
        className="mt-1 size-5 accent-brand-primary"
      />
      <span>
        I confirm these details are accurate and agree to be contacted about
        this event.
      </span>
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
