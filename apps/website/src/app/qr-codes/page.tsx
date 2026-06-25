import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  BrandColorBlobs,
  DiagonalStripePattern,
} from "@/components/ui/backgrounds";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";

type QrCodeEntry = {
  name: string;
  filename: string;
  relativePath: string;
  folder: string;
  variant: "color" | "bw";
  url: string;
  description: string;
};

type QrCodeManifest = {
  qrCodes: QrCodeEntry[];
};

const FOLDER_LABELS: Record<string, string> = {
  core: "Core",
  contact: "Contact",
  rfq: "RFQ",
  safety: "Safety",
  social: "Social",
  "safety-sections": "Safety Sections",
  "safety-forms": "Safety Forms",
  team: "Team",
};

const SITE_URL = "https://www.mhc-gc.com";

export const metadata: Metadata = {
  title: "QR Code Library | MH Construction",
  description:
    "Browse every MH Construction QR code, view each image at full size, and download the PNG files individually.",
  alternates: {
    canonical: `${SITE_URL}/qr-codes`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "QR Code Library | MH Construction",
    description:
      "Open and download every MH Construction QR code from one central library.",
    url: `${SITE_URL}/qr-codes`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Library | MH Construction",
    description:
      "Open and download every MH Construction QR code from one central library.",
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "QR Codes", url: `${SITE_URL}/qr-codes` },
]);

async function loadQrCodes(): Promise<QrCodeEntry[]> {
  const manifestPath = join(
    process.cwd(),
    "public/images/qr-codes/qr-codes-manifest.json",
  );
  const manifest = JSON.parse(
    await readFile(manifestPath, "utf8"),
  ) as QrCodeManifest;

  return manifest.qrCodes.slice().sort((left, right) => {
    const folderOrder = left.folder.localeCompare(right.folder);
    if (folderOrder !== 0) return folderOrder;

    const nameOrder = left.name.localeCompare(right.name);
    if (nameOrder !== 0) return nameOrder;

    return left.variant.localeCompare(right.variant);
  });
}

function groupByFolder(entries: QrCodeEntry[]) {
  return entries.reduce<Record<string, QrCodeEntry[]>>((groups, entry) => {
    if (!groups[entry.folder]) {
      groups[entry.folder] = [];
    }

    groups[entry.folder].push(entry);
    return groups;
  }, {});
}

function folderLabel(folder: string): string {
  return FOLDER_LABELS[folder] ?? folder.replace(/-/g, " ");
}

export default async function QrCodesPage() {
  const qrCodes = await loadQrCodes();
  const groupedQrCodes = groupByFolder(qrCodes);
  const folders = Object.keys(groupedQrCodes).sort();

  return (
    <>
      <PageTrackingClient pageName="qr-codes" />
      <StructuredData data={breadcrumbSchema} />

      <div className="relative min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <DiagonalStripePattern />
        <BrandColorBlobs />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "QR Codes", href: "/qr-codes" },
            ]}
          />

          <section className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 rounded-full px-4 py-1.5 mb-5">
              <MaterialIcon
                icon="qr_code_2"
                size="sm"
                className="text-brand-primary"
              />
              <span className="text-brand-primary dark:text-brand-secondary text-sm font-semibold tracking-wide uppercase">
                QR Asset Library
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              Browse and Download Every QR Code
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Each code is available as a full-size PNG. Open the image to
              inspect it, or download it directly from the card below.
            </p>
          </section>

          <div className="grid gap-6 mb-12 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-brand-primary/20 bg-white/90 dark:bg-gray-800/90 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3 mb-2">
                <MaterialIcon
                  icon="folder"
                  size="sm"
                  className="text-brand-primary"
                />
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  Canonical location
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Files are stored in{" "}
                <span className="font-semibold">public/images/qr-codes</span>
                and served from{" "}
                <span className="font-semibold">/images/qr-codes</span>.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-primary/20 bg-white/90 dark:bg-gray-800/90 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3 mb-2">
                <MaterialIcon
                  icon="visibility"
                  size="sm"
                  className="text-brand-primary"
                />
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  Full-size preview
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Click any QR image to open it in a new tab at native resolution.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-primary/20 bg-white/90 dark:bg-gray-800/90 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3 mb-2">
                <MaterialIcon
                  icon="download"
                  size="sm"
                  className="text-brand-primary"
                />
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  Direct downloads
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Each card includes a download action for the specific PNG file.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {folders.map((folder) => (
              <section key={folder}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center shadow-sm">
                    <MaterialIcon
                      icon="qr_code_2"
                      size="sm"
                      className="text-white"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {folderLabel(folder)}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {groupedQrCodes[folder].length} QR code
                      {groupedQrCodes[folder].length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {groupedQrCodes[folder].map((entry) => {
                    const imageHref = `/images/qr-codes/${entry.relativePath}`;

                    return (
                      <article
                        key={`${entry.relativePath}-${entry.variant}`}
                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                      >
                        <a
                          href={imageHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-white p-5"
                          aria-label={`Open ${entry.description} QR code`}
                        >
                          <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-white shadow-inner dark:border-gray-700">
                            <Image
                              src={imageHref}
                              alt={`${entry.description} QR code`}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-contain p-4"
                            />
                          </div>
                        </a>

                        <div className="border-t border-gray-100 p-5 dark:border-gray-700">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                {entry.description}
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {entry.filename}
                              </p>
                            </div>
                            <span className="inline-flex items-center rounded-full border border-brand-primary/20 bg-brand-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary dark:border-brand-secondary/30 dark:bg-brand-secondary/10 dark:text-brand-secondary-light">
                              {entry.variant}
                            </span>
                          </div>

                          <p className="mb-4 break-all text-xs text-gray-600 dark:text-gray-300">
                            {entry.url}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            <a
                              href={imageHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-primary px-3 py-1.5 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
                            >
                              <MaterialIcon
                                icon="visibility"
                                size="sm"
                                className="text-brand-primary"
                              />
                              Open
                            </a>
                            <a
                              href={imageHref}
                              download={entry.filename}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-primary px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-dark"
                            >
                              <MaterialIcon
                                icon="download"
                                size="sm"
                                className="text-white"
                              />
                              Download PNG
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              <MaterialIcon
                icon="arrow_back"
                size="sm"
                className="text-brand-primary"
              />
              Back to Resources
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-secondary-dark"
            >
              <MaterialIcon icon="groups" size="sm" className="text-white" />
              Team Profiles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
