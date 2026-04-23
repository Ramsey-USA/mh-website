/**
 * Dynamic OG Image Generation
 *
 * API route for generating dynamic Open Graph images for social sharing
 * Supports custom titles, descriptions, and branding elements
 */

import { ImageResponse } from "next/og";

const BRAND_PRIMARY = "#386851";
const BRAND_SECONDARY = "#91AA6F";

/**
 * OG Image Generation Handler
 * Generates 1200x630px images for social media sharing
 *
 * Query parameters:
 * - title: Main heading text (required)
 * - description: Secondary text (optional)
 * - icon: Material Icon name (optional)
 * - type: 'page' | 'article' | 'project' (default: 'page')
 * - theme: 'light' | 'dark' (default: 'light')
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "MH Construction";
  const description =
    searchParams.get("description") || "Expert Construction Services";
  const type = searchParams.get("type") || "page";
  const theme = searchParams.get("theme") || "light";

  const isDark = theme === "dark";
  const bgColor = isDark ? "#1a202c" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#111827";
  const accentColor = isDark ? BRAND_SECONDARY : BRAND_PRIMARY;
  const subtleColor = isDark ? "#d1d5db" : "#6b7280";

  try {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: bgColor,
          backgroundImage: `linear-gradient(135deg, ${bgColor} 0%, ${isDark ? "#2d3748" : "#f3f4f6"} 100%)`,
          padding: "60px",
          fontFamily: '"Segoe UI", Roboto, sans-serif',
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Background Element */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentColor}20, transparent)`,
            top: "-100px",
            right: "-100px",
            zIndex: 0,
          }}
        />

        {/* Header Branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: accentColor,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: bgColor,
              }}
            >
              MH
            </span>
          </div>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: textColor,
            }}
          >
            MH Construction
          </span>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            flex: 1,
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Type Badge */}
          {type !== "page" && (
            <div
              style={{
                display: "inline-flex",
                width: "fit-content",
                padding: "8px 16px",
                backgroundColor: `${accentColor}20`,
                borderRadius: "20px",
                border: `2px solid ${accentColor}`,
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: accentColor,
                  textTransform: "uppercase",
                }}
              >
                {type === "article" ? "Article" : "Project"}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "900",
              color: textColor,
              lineHeight: "1.2",
              margin: "0",
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p
              style={{
                fontSize: "24px",
                color: subtleColor,
                lineHeight: "1.4",
                margin: "0",
                maxWidth: "900px",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Footer - Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            position: "relative",
            zIndex: 1,
            borderTop: `2px solid ${isDark ? "#374151" : "#e5e7eb"}`,
            paddingTop: "24px",
          }}
        >
          <p
            style={{
              margin: "0",
              fontSize: "14px",
              color: subtleColor,
            }}
          >
            Founded 2010 • Veteran-Owned • Tri-State Service Area
          </p>
          <p
            style={{
              margin: "0",
              fontSize: "12px",
              color: subtleColor,
            }}
          >
            www.mhc-gc.com • (509) 308-6489
          </p>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        // Use system fonts only (no fetching external fonts)
      },
    );
  } catch (error) {
    console.error("OG Image generation error:", error);

    // Fallback response
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: BRAND_PRIMARY,
          alignItems: "center",
          justifyContent: "center",
          fontSize: "48px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        MH Construction
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  }
}
