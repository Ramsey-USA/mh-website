import { getEventRecordBySlug } from "@/lib/data/events";
import { getLocationBySlug } from "@/lib/data/locations";
import { getNewsInsightsContent } from "@/lib/data/news-insights";
import {
  getProjectCaseStudyBySlug,
  getPublishedProjectCaseStudyBySlug,
} from "@/lib/data/project-case-studies";
import {
  getPublishedServiceDetailBySlug,
  getServiceRouteBySlug,
} from "@/lib/data/service-routes";
import { getCanonicalSiteOrigin } from "@/lib/site-config";

export const OG_DEFAULT_IMAGE_PATH = "/images/og-default.jpg" as const;
const NEWS_TEMPLATE_ID = "news-insights" as const;

const MAX_TOKEN_LENGTH = 80;
const TOKEN_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const ALLOWED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

type OgRecordStatus = "published" | "private" | "unknown";

export type OgTemplateType =
  "service" | "project" | "event" | "location" | "news";

export type OgTemplateRecord = {
  type: OgTemplateType;
  id: string;
  status: OgRecordStatus;
  title: string;
  category?: string;
  location?: string;
  dateOrStatus?: string;
  imagePath: string;
  imageAlt: string;
};

export type OgResolveResult =
  | { ok: true; record: OgTemplateRecord }
  | {
      ok: false;
      code: "invalid-type" | "invalid-id" | "private-record" | "unknown-record";
      message: string;
    };

function isSafeToken(value: string): boolean {
  return (
    value.length > 0 &&
    value.length <= MAX_TOKEN_LENGTH &&
    TOKEN_PATTERN.test(value)
  );
}

function normalizeImagePath(input?: string): string {
  if (!input) {
    return OG_DEFAULT_IMAGE_PATH;
  }

  if (!input.startsWith("/images/")) {
    return OG_DEFAULT_IMAGE_PATH;
  }

  if (input.includes("..")) {
    return OG_DEFAULT_IMAGE_PATH;
  }

  const lower = input.toLowerCase();
  const hasSupportedExtension = [...ALLOWED_IMAGE_EXTENSIONS].some((ext) =>
    lower.endsWith(ext),
  );

  if (!hasSupportedExtension) {
    return OG_DEFAULT_IMAGE_PATH;
  }

  return input;
}

export function createOgImageUrl(type: OgTemplateType, id: string): string {
  const origin = getCanonicalSiteOrigin();
  const params = new URLSearchParams({ type, id });
  return `${origin}/api/og?${params.toString()}`;
}

export function resolveOgTemplateRecord(
  type: string,
  id: string,
): OgResolveResult {
  if (!isSafeToken(type) || !isKnownTemplateType(type)) {
    return {
      ok: false,
      code: "invalid-type",
      message: "Unsupported OG template type.",
    };
  }

  if (!isSafeToken(id)) {
    return {
      ok: false,
      code: "invalid-id",
      message: "Invalid OG template identifier.",
    };
  }

  switch (type) {
    case "service": {
      const service = getPublishedServiceDetailBySlug(id);
      if (service) {
        return {
          ok: true,
          record: {
            type,
            id,
            status: "published",
            title: service.title,
            category: service.category,
            dateOrStatus: service.publishStatus,
            imagePath: normalizeImagePath(service.ogImage),
            imageAlt: `${service.title} service overview`,
          },
        };
      }

      if (getServiceRouteBySlug(id)) {
        return {
          ok: false,
          code: "private-record",
          message: "Service record is not published.",
        };
      }

      return {
        ok: false,
        code: "unknown-record",
        message: "Service record not found.",
      };
    }

    case "project": {
      const project = getPublishedProjectCaseStudyBySlug(id);
      if (project) {
        return {
          ok: true,
          record: {
            type,
            id,
            status: "published",
            title: project.title,
            category: project.category,
            location: `${project.location.city}, ${project.location.state}`,
            dateOrStatus: String(project.yearCompleted),
            imagePath: normalizeImagePath(project.ogImage),
            imageAlt: `${project.title} case study`,
          },
        };
      }

      if (getProjectCaseStudyBySlug(id)) {
        return {
          ok: false,
          code: "private-record",
          message: "Project record is not published.",
        };
      }

      return {
        ok: false,
        code: "unknown-record",
        message: "Project record not found.",
      };
    }

    case "event": {
      const event = getEventRecordBySlug(id);
      if (!event) {
        return {
          ok: false,
          code: "unknown-record",
          message: "Event record not found.",
        };
      }

      return {
        ok: true,
        record: {
          type,
          id,
          status: "published",
          title: event.title,
          category: "Community Event",
          location: event.location,
          dateOrStatus: `${event.schedule} - ${event.status}`,
          imagePath: normalizeImagePath(event.primaryImage),
          imageAlt: `${event.title} event recap`,
        },
      };
    }

    case "location": {
      const location = getLocationBySlug(id);
      if (!location) {
        return {
          ok: false,
          code: "unknown-record",
          message: "Location record not found.",
        };
      }

      return {
        ok: true,
        record: {
          type,
          id,
          status: "published",
          title: `${location.city}, ${location.state}`,
          category: "Service Location",
          location: `${location.city}, ${location.state}`,
          dateOrStatus: location.county,
          imagePath: OG_DEFAULT_IMAGE_PATH,
          imageAlt: `MH Construction service area in ${location.city}, ${location.state}`,
        },
      };
    }

    case "news": {
      if (id !== NEWS_TEMPLATE_ID) {
        return {
          ok: false,
          code: "unknown-record",
          message: "News record not found.",
        };
      }

      const content = getNewsInsightsContent("en");
      const latestDate = content.cards
        .map((card) => card.date)
        .sort()
        .reverse()[0];
      const dateOrStatus = latestDate ? { dateOrStatus: latestDate } : {};

      return {
        ok: true,
        record: {
          type,
          id,
          status: "published",
          title: content.title,
          category: content.subtitle,
          ...dateOrStatus,
          imagePath: OG_DEFAULT_IMAGE_PATH,
          imageAlt: "MH Construction news and insights",
        },
      };
    }

    default: {
      return {
        ok: false,
        code: "invalid-type",
        message: "Unsupported OG template type.",
      };
    }
  }
}

function isKnownTemplateType(value: string): value is OgTemplateType {
  return (
    value === "service" ||
    value === "project" ||
    value === "event" ||
    value === "location" ||
    value === "news"
  );
}
