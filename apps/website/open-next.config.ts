import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

// Explicitly set Next.js build command to avoid infinite recursion:
// opennextjs-cloudflare's default buildCommand is "npm run build", which
// would re-invoke itself since package.json "build" = opennextjs-cloudflare.
// Next.js 16 Turbopack does not emit middleware.js.nft.json, but OpenNext's
// adapter currently expects that trace file during packaging.
config.buildCommand = "npx next build --webpack";

export default config;
