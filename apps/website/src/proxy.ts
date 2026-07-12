import type { NextRequest } from "next/server";
import { middleware } from "../middleware";

export function proxy(request: NextRequest) {
  return middleware(request);
}

export const config = {
  matcher: [
    "/((?!api/health|api/security/status|api/cf-|_next|favicon\\.ico|sw\\.js|manifest\\.json|robots\\.txt|sitemap\\.xml|sitemap-index\\.xml|llms\\.txt|google[a-z0-9]+\\.html|[A-Za-z0-9]{8,128}\\.txt|_headers|_redirects|fonts|icons|images|videos).*)",
  ],
};
