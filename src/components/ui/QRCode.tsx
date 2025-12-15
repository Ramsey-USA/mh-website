"use client";

/**
 * QRCode Component
 *
 * Generates QR codes dynamically or displays pre-generated QR code images.
 * Can be used throughout the site for sharing pages and contact information.
 *
 * @example
 * // Dynamic generation (client-side)
 * <QRCode url="https://mhc-gc.com" size={200} />
 *
 * // Use pre-generated image (recommended for better performance)
 * <QRCode preset="homepage" size={200} />
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface QRCodeProps {
  /** URL to encode in the QR code */
  url?: string;
  /** Preset QR code name (uses pre-generated images) */
  preset?:
    | "homepage"
    | "about"
    | "services"
    | "projects"
    | "team"
    | "careers"
    | "contact"
    | "booking"
    | "estimator"
    | "case-studies"
    | "allies"
    | "trade-partners"
    | "veteran-benefits"
    | "phone"
    | "email"
    | "linkedin"
    | "facebook"
    | "instagram"
    | "youtube"
    | "twitter"
    | "location";
  /** Size in pixels (width and height) */
  size?: number;
  /** Alternative text for accessibility */
  alt?: string;
  /** Additional CSS classes */
  className?: string;
  /** Error correction level (L, M, Q, H) */
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  /** Color of the QR code (default: Hunter Green) */
  color?: string;
  /** Background color (default: white) */
  backgroundColor?: string;
  /** Whether to show a download button */
  downloadable?: boolean;
}

const PRESET_DESCRIPTIONS: Record<string, string> = {
  homepage: "MH Construction Homepage",
  about: "About Us",
  services: "Our Services",
  projects: "Our Projects",
  team: "Our Team",
  careers: "Careers",
  contact: "Contact Us",
  booking: "Schedule Consultation",
  estimator: "AI Project Estimator",
  "case-studies": "Case Studies",
  allies: "Allies",
  "trade-partners": "Trade Partners",
  "veteran-benefits": "Veteran Benefits",
  phone: "Call Us",
  email: "Email Us",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  twitter: "X (Twitter)",
  location: "Our Location",
};

export function QRCode({
  url,
  preset,
  size = 200,
  alt,
  className = "",
  errorCorrectionLevel = "H",
  color = "#386851", // Hunter Green
  backgroundColor = "#FFFFFF",
  downloadable = false,
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [QRCodeLib, setQRCodeLib] = useState<any>(null);

  // Dynamic generation - load QRCode library on client side
  useEffect(() => {
    if (!url) return;

    const loadQRCode = async () => {
      try {
        const QRCodeModule = await import("qrcode");
        setQRCodeLib(QRCodeModule.default);
      } catch (err) {
        console.error("Failed to load QRCode library:", err);
        setError("Failed to load QR code generator");
        setIsLoading(false);
      }
    };

    loadQRCode();
  }, [url]);

  // Generate QR code
  useEffect(() => {
    if (!url || !QRCodeLib || !canvasRef.current) return;

    const generateQR = async () => {
      try {
        setIsLoading(true);
        setError(null);

        await QRCodeLib.toCanvas(canvasRef.current, url, {
          errorCorrectionLevel,
          width: size,
          margin: 2,
          color: {
            dark: color,
            light: backgroundColor,
          },
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Failed to generate QR code:", err);
        setError("Failed to generate QR code");
        setIsLoading(false);
      }
    };

    generateQR();
  }, [url, QRCodeLib, size, errorCorrectionLevel, color, backgroundColor]);

  // Use pre-generated image if preset is provided
  if (preset) {
    const presetPath = `/images/qr-codes/qr-${preset}.png`;
    const description = PRESET_DESCRIPTIONS[preset] || preset;
    const altText = alt || `QR Code for ${description}`;

    return (
      <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
        <div
          className="relative bg-white rounded-lg shadow-md p-2"
          style={{ width: size, height: size }}
        >
          <Image
            src={presetPath}
            alt={altText}
            width={size}
            height={size}
            className="w-full h-full object-contain"
            priority={false}
          />
        </div>
        {downloadable && (
          <a
            href={presetPath}
            download={`mh-construction-qr-${preset}.png`}
            className="text-sm text-hunter-green hover:text-leather-tan transition-colors underline"
          >
            Download QR Code
          </a>
        )}
      </div>
    );
  }

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "mh-construction-qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (!url && !preset) {
    return (
      <div className="text-red-600 text-sm p-4 border border-red-300 rounded">
        Error: QRCode component requires either a <code>url</code> or{" "}
        <code>preset</code> prop.
      </div>
    );
  }

  const altText = alt || (url ? `QR Code for ${url}` : "QR Code");

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <div
        className="relative bg-white rounded-lg shadow-md p-2"
        style={{ width: size, height: size }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hunter-green" />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-red-600 text-xs p-2 text-center">
            {error}
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={`w-full h-full ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity`}
          aria-label={altText}
          role="img"
        />
      </div>
      {downloadable && !isLoading && !error && (
        <button
          onClick={handleDownload}
          className="text-sm text-hunter-green hover:text-leather-tan transition-colors underline"
          type="button"
        >
          Download QR Code
        </button>
      )}
    </div>
  );
}

/**
 * QRCodeSection Component
 *
 * A complete section for displaying a QR code with title and description.
 * Useful for marketing materials or contact pages.
 */

interface QRCodeSectionProps {
  title?: string;
  description?: string;
  url?: string;
  preset?: QRCodeProps["preset"];
  size?: number;
  downloadable?: boolean;
  className?: string;
}

export function QRCodeSection({
  title = "Scan to Visit",
  description,
  url,
  preset,
  size = 200,
  downloadable = true,
  className = "",
}: QRCodeSectionProps) {
  return (
    <div
      className={`flex flex-col items-center text-center gap-4 ${className}`}
    >
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-600 dark:text-gray-300 max-w-md">
          {description}
        </p>
      )}
      {url ? (
        <QRCode url={url} size={size} downloadable={downloadable} />
      ) : preset ? (
        <QRCode preset={preset} size={size} downloadable={downloadable} />
      ) : null}
    </div>
  );
}

export default QRCode;
