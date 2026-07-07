import { getCloudflareContext } from "@opennextjs/cloudflare";

function readCloudflareEnv(name: string): string | undefined {
  try {
    const { env } = getCloudflareContext();
    const value = (env as Record<string, unknown>)[name];
    return typeof value === "string" && value.length > 0 ? value : undefined;
  } catch {
    return undefined;
  }
}

export function getRuntimeEnv(name: string): string | undefined {
  const processValue = process.env[name];
  if (processValue) return processValue;

  return readCloudflareEnv(name);
}

export function getResendConfig(): {
  apiKey?: string;
  fromEmail?: string;
} {
  return {
    apiKey: getRuntimeEnv("RESEND_API_KEY"),
    fromEmail: getRuntimeEnv("EMAIL_FROM"),
  };
}
