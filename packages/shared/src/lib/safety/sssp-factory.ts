import { getCloudflareContext } from "@opennextjs/cloudflare";
import { logger } from "@/lib/utils/logger";

export interface SsspFactoryDispatch {
  ssspId: string;
  jobId: string;
  jobNumber: string;
  jobName: string;
  location: string | null;
  pmName: string | null;
  superName: string | null;
  sourceFiles: Array<{
    id: string;
    fileKey: string;
    originalFilename: string;
    contentType: string;
  }>;
  triggeredBy: string;
  callbackUrl: string;
}

export interface SsspFactoryDispatchResult {
  success: boolean;
  error?: string;
}

interface QueueBinding<T> {
  send(body: T, options?: { contentType?: "json" }): Promise<unknown>;
}

interface FactoryConfiguration {
  queue: QueueBinding<FactoryMessage>;
  callbackBaseUrl: string;
}

interface FactoryMessage {
  schemaVersion: 1;
  type: "sssp-generate";
  idempotencyKey: string;
  workOrder: SsspFactoryDispatch;
}

function readFactoryConfiguration(): FactoryConfiguration | null {
  const activated =
    process.env["SSSP_FACTORY_ACTIVATED"]?.trim().toLowerCase() === "true";
  const callbackSecret = process.env["SSSP_CALLBACK_SECRET"]?.trim();
  const callbackBaseUrl =
    process.env["SSSP_CALLBACK_BASE_URL"]?.trim() ??
    process.env["NEXT_PUBLIC_SITE_URL"]?.trim();

  if (!activated || !callbackSecret || !callbackBaseUrl) {
    return null;
  }

  try {
    const callback = new URL(callbackBaseUrl);
    if (callback.protocol !== "https:") {
      return null;
    }

    const { env } = getCloudflareContext();
    const queue = (env as Record<string, unknown>)[
      "SSSP_FACTORY_WORK_ORDERS"
    ] as QueueBinding<FactoryMessage> | undefined;

    if (!queue || typeof queue.send !== "function") {
      return null;
    }

    return { queue, callbackBaseUrl };
  } catch {
    return null;
  }
}

export function isSsspFactoryConfigured(): boolean {
  return readFactoryConfiguration() !== null;
}

export async function dispatchSsspFactoryWorkOrder(
  workOrder: Omit<SsspFactoryDispatch, "callbackUrl">,
): Promise<SsspFactoryDispatchResult> {
  const configuration = readFactoryConfiguration();
  if (!configuration) {
    return {
      success: false,
      error: "Private SSSP factory queue is not activated",
    };
  }

  const callbackUrl = new URL(
    `/api/safety/sssp/${encodeURIComponent(workOrder.jobId)}/result`,
    configuration.callbackBaseUrl,
  ).toString();

  const message: FactoryMessage = {
    schemaVersion: 1,
    type: "sssp-generate",
    idempotencyKey: workOrder.ssspId,
    workOrder: { ...workOrder, callbackUrl },
  };

  try {
    await configuration.queue.send(message, { contentType: "json" });

    logger.info("Private SSSP factory work order queued", {
      ssspId: workOrder.ssspId,
      jobId: workOrder.jobId,
    });
    return { success: true };
  } catch (error) {
    logger.error("Private SSSP factory queue dispatch failed", {
      ssspId: workOrder.ssspId,
      jobId: workOrder.jobId,
      error,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Factory queue failed",
    };
  }
}
