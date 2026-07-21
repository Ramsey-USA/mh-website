import {
  type ContentGovernanceRecord,
  isPubliclyVisibleContent,
} from "@/lib/content/content-governance";

export const smokeNShinePlacements = [
  { place: "1st Place", team: "Classic Grillin'" },
  { place: "2nd Place", team: "Bish Bosh BBQ" },
  { place: "3rd Place", team: "Pork Daddy's" },
  { place: "4th Place", team: "Hallmarks" },
  { place: "5th Place", team: "Army National Guard" },
  { place: "6th Place", team: "Smokin Fools BBQ" },
] as const;

export type EventLocale = "en" | "es";

export type EventLifecycleStatus =
  | "proposed"
  | "under-review"
  | "confirmed"
  | "registration-open"
  | "sold-out"
  | "completed"
  | "cancelled"
  | "archived";

const EVENT_LIFECYCLE_LABELS: Record<
  EventLifecycleStatus,
  { en: string; es: string }
> = {
  proposed: { en: "Proposed", es: "Propuesto" },
  "under-review": { en: "Under review", es: "En revision" },
  confirmed: { en: "Confirmed", es: "Confirmado" },
  "registration-open": { en: "Registration open", es: "Registro abierto" },
  "sold-out": { en: "Sold out", es: "Agotado" },
  completed: { en: "Completed", es: "Completado" },
  cancelled: { en: "Cancelled", es: "Cancelado" },
  archived: { en: "Archived", es: "Archivado" },
};

export function getEventLifecycleLabel(
  status: EventLifecycleStatus,
  locale: EventLocale,
): string {
  return EVENT_LIFECYCLE_LABELS[status][locale];
}

export const eventGalleryImages = [
  {
    src: "/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp",
    alt: "Smoke n Shine showdown event graphic",
    caption: "Smoke n Shine Showdown",
  },
  {
    src: "/images/events/cool-desert-nights/cool-desert-nights-2026.webp",
    alt: "Community street event photo",
    caption: "Community Event Highlights",
  },
] as const;

export const upcomingEvents = [
  {
    id: "next-sponsored-event",
    title: "Next Sponsored Event",
    window: "To Be Announced",
    lifecycleStatus: "proposed" as const,
    summary:
      "Reserved for the next MH Construction sponsored community event with finalized date, location, and participation details.",
    titleEs: "Proximo evento patrocinado",
    windowEs: "Por anunciar",
    summaryEs:
      "Reservado para el proximo evento comunitario patrocinado por MH Construction con fecha, ubicacion y detalles de participacion finalizados.",
  },
  {
    id: "next-hosted-event",
    title: "Next Hosted Event",
    window: "To Be Announced",
    lifecycleStatus: "under-review" as const,
    summary:
      "Dedicated section for the next MH-hosted event, including partners, timeline, and field highlights.",
    titleEs: "Proximo evento organizado",
    windowEs: "Por anunciar",
    summaryEs:
      "Seccion dedicada al proximo evento organizado por MH, incluyendo aliados, cronograma y destacados de campo.",
  },
  {
    id: "community-partnership-spotlight",
    title: "Community Partnership Spotlight",
    window: "To Be Announced",
    lifecycleStatus: "under-review" as const,
    summary:
      "Reserved for a featured collaboration with a local organization, trade ally, or community initiative.",
    titleEs: "Destacado de alianza comunitaria",
    windowEs: "Por anunciar",
    summaryEs:
      "Reservado para una colaboracion destacada con una organizacion local, aliado de oficio o iniciativa comunitaria.",
  },
] as const;

export const eventPartnerUrls = {
  chamberSchedule: "https://www.richlandchamber.org/cool-desert-nights/",
  eventbrite:
    "https://www.eventbrite.com/e/2026-cool-desert-nights-tickets-1984588946964",
  kiwanis: "https://kiwanisrichland.org/",
} as const;

export type EventRecord = {
  slug: string;
  title: string;
  status: string;
  lifecycleStatus: EventLifecycleStatus;
  location: string;
  schedule: string;
  summary: string;
  recapTitle: string;
  recapBullets: readonly string[];
  requestTitle: string;
  requestBody: string;
  partnerLabel: string;
  partnerUrl: string;
  primaryImage: string;
  secondaryImage: string;
  governance?: ContentGovernanceRecord;
  titleEs?: string;
  statusEs?: string;
  scheduleEs?: string;
  summaryEs?: string;
  recapTitleEs?: string;
  recapBulletsEs?: readonly string[];
  requestTitleEs?: string;
  requestBodyEs?: string;
  partnerLabelEs?: string;
};

export const eventRecords: EventRecord[] = [
  {
    slug: "cool-desert-nights",
    title: "Cool Desert Nights 2026",
    status: "Archived Event Record",
    lifecycleStatus: "archived",
    location: "Tri-Cities, WA",
    schedule: "June 2026",
    summary:
      "Archived event record for MH Construction's 2026 Smoke n Shine participation, with final placements, recap notes, and a path for future event partnerships.",
    recapTitle: "Event Recap",
    recapBullets: [
      "Smoke n Shine placements were finalized and archived as the canonical public result record.",
      "The recap highlights the event graphic, placement leaderboard, and photo archive.",
      "Future event partners can use the request section to coordinate a new sponsored or hosted opportunity.",
    ],
    requestTitle: "Partnership Request",
    requestBody:
      "Use this channel to discuss a sponsored event, hosted community placement, or local partnership opportunity with MH Construction.",
    partnerLabel: "View the archive route",
    partnerUrl: "/cool-desert-nights",
    primaryImage:
      "/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp",
    secondaryImage:
      "/images/events/cool-desert-nights/cool-desert-nights-2026.webp",
    governance: {
      stableId: "event-record:cool-desert-nights",
      ownerRole: "community-partnerships",
      lifecycle: "archived",
      approvalState: "approved",
      publishState: "public",
      approvalReference: "Archived event record approved",
      nextReviewAt: "2027-06-30",
      archiveReason: "Event cycle completed",
      sourceReferences: [
        {
          sourceType: "route",
          reference: "cool-desert-nights",
        },
        {
          sourceType: "media",
          reference:
            "/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp",
        },
      ],
    },
    titleEs: "Cool Desert Nights 2026",
    statusEs: "Registro de evento archivado",
    scheduleEs: "Junio 2026",
    summaryEs:
      "Registro archivado del evento de participacion Smoke n Shine 2026 de MH Construction, con posiciones finales, notas de resumen y una ruta para futuras alianzas de eventos.",
    recapTitleEs: "Resumen del evento",
    recapBulletsEs: [
      "Las posiciones de Smoke n Shine se finalizaron y archivaron como registro publico canonico de resultados.",
      "El resumen destaca el grafico del evento, el tablero de posiciones y el archivo fotografico.",
      "Los futuros aliados de eventos pueden usar la seccion de solicitud para coordinar una nueva oportunidad patrocinada u organizada.",
    ],
    requestTitleEs: "Solicitud de alianza",
    requestBodyEs:
      "Use este canal para hablar sobre un evento patrocinado, una participacion comunitaria organizada o una oportunidad de alianza local con MH Construction.",
    partnerLabelEs: "Ver la ruta de archivo",
  },
] as const;

export function getLocalizedEventRecord(
  event: EventRecord,
  locale: EventLocale,
): EventRecord {
  if (locale !== "es") {
    return event;
  }

  return {
    ...event,
    title: event.titleEs ?? event.title,
    status: event.statusEs ?? event.status,
    schedule: event.scheduleEs ?? event.schedule,
    summary: event.summaryEs ?? event.summary,
    recapTitle: event.recapTitleEs ?? event.recapTitle,
    recapBullets: event.recapBulletsEs ?? event.recapBullets,
    requestTitle: event.requestTitleEs ?? event.requestTitle,
    requestBody: event.requestBodyEs ?? event.requestBody,
    partnerLabel: event.partnerLabelEs ?? event.partnerLabel,
  };
}

export function getLocalizedUpcomingEvents(locale: EventLocale) {
  return upcomingEvents.map((event) => {
    if (locale === "es") {
      return {
        ...event,
        title: event.titleEs,
        window: event.windowEs,
        status: getEventLifecycleLabel(event.lifecycleStatus, locale),
        summary: event.summaryEs,
      };
    }

    return {
      ...event,
      status: getEventLifecycleLabel(event.lifecycleStatus, locale),
    };
  });
}

export function getEventRecordBySlug(slug: string): EventRecord | undefined {
  return eventRecords.find(
    (event) =>
      event.slug === slug &&
      (event.governance ? isPubliclyVisibleContent(event.governance) : true),
  );
}
