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

interface FactoryConfiguration {
  webhookUrl: string;
  dispatchSecret: string;
  callbackBaseUrl: string;
}

function readFactoryConfiguration(): FactoryConfiguration | null {
  const webhookUrl = process.env["SSSP_FACTORY_WEBHOOK_URL"]?.trim();
  const dispatchSecret = process.env["SSSP_FACTORY_DISPATCH_SECRET"]?.trim();
  const callbackSecret = process.env["SSSP_CALLBACK_SECRET"]?.trim();
  const callbackBaseUrl =
    process.env["SSSP_CALLBACK_BASE_URL"]?.trim() ??
    process.env["NEXT_PUBLIC_SITE_URL"]?.trim();

  if (!webhookUrl || !dispatchSecret || !callbackSecret || !callbackBaseUrl) {
    return null;
  }

  try {
    const webhook = new URL(webhookUrl);
    const callback = new URL(callbackBaseUrl);
    if (webhook.protocol !== "https:" || callback.protocol !== "https:") {
      return null;
    }
  } catch {
    return null;
  }

  return { webhookUrl, dispatchSecret, callbackBaseUrl };
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
      error: "Private SSSP factory transport is not configured",
    };
  }

  const callbackUrl = new URL(
    `/api/safety/sssp/${encodeURIComponent(workOrder.jobId)}/result`,
    configuration.callbackBaseUrl,
  ).toString();

  try {
    const response = await fetch(configuration.webhookUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${configuration.dispatchSecret}`,
        "Content-Type": "application/json",
        "Idempotency-Key": workOrder.ssspId,
      },
      body: JSON.stringify({
        schemaVersion: 1,
        type: "sssp-generate",
        workOrder: { ...workOrder, callbackUrl },
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      logger.error("Private SSSP factory rejected work order", {
        ssspId: workOrder.ssspId,
        jobId: workOrder.jobId,
        status: response.status,
      });
      return {
        success: false,
        error: `Private SSSP factory returned HTTP ${response.status}`,
      };
    }

    logger.info("Private SSSP factory accepted work order", {
      ssspId: workOrder.ssspId,
      jobId: workOrder.jobId,
    });
    return { success: true };
  } catch (error) {
    logger.error("Private SSSP factory dispatch failed", {
      ssspId: workOrder.ssspId,
      jobId: workOrder.jobId,
      error,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Factory dispatch failed",
    };
  }
}
