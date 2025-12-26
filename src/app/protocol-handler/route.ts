import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Missing URL parameter" },
      { status: 400 },
    );
  }

  // Parse the custom protocol URL
  // Format: web+mhconstruction://action?params
  try {
    const protocolUrl = new URL(url);
    const action = protocolUrl.hostname;
    const params = Object.fromEntries(protocolUrl.searchParams);

    console.info("[Protocol Handler] Received:", { action, params });

    // Handle different protocol actions
    switch (action) {
      case "contact":
        return NextResponse.redirect(new URL("/contact", request.url), {
          status: 302,
        });

      case "project":
        const projectId = params["id"];
        if (projectId) {
          return NextResponse.redirect(
            new URL(`/projects/${projectId}`, request.url),
            { status: 302 },
          );
        }
        return NextResponse.redirect(new URL("/projects", request.url), {
          status: 302,
        });

      case "estimate":
        return NextResponse.redirect(
          new URL("/contact?type=estimate", request.url),
          { status: 302 },
        );

      case "booking":
        return NextResponse.redirect(
          new URL("/contact?type=consultation", request.url),
          { status: 302 },
        );

      default:
        // Unknown action, redirect to home
        return NextResponse.redirect(new URL("/", request.url), {
          status: 302,
        });
    }
  } catch (error) {
    console.error("[Protocol Handler] Error parsing URL:", error);
    return NextResponse.redirect(new URL("/", request.url), { status: 302 });
  }
}
