import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

// Explicitly set Next.js build command to avoid infinite recursion:
// opennextjs-cloudflare's default buildCommand is "npm run build", which
// would re-invoke itself since package.json "build" = opennextjs-cloudflare.
config.buildCommand = "npx next build";

export default config;
