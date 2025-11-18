/**
 * Cloudflare R2 Storage Service
 * Handles file uploads to R2 buckets
 */

import { logger } from "@/lib/utils/logger";

export interface R2Bucket {
  put(
    key: string,
    value: ReadableStream | ArrayBuffer | string,
    options?: {
      httpMetadata?: {
        contentType?: string;
        contentDisposition?: string;
      };
      customMetadata?: Record<string, string>;
    },
  ): Promise<void>;
  get(key: string): Promise<{
    body: ReadableStream;
    httpMetadata: Record<string, string>;
  } | null>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number }): Promise<{
    objects: Array<{ key: string; size: number; uploaded: Date }>;
  }>;
}

export interface UploadResult {
  success: boolean;
  key?: string;
  url?: string;
  size?: number;
  error?: string;
}

/**
 * R2 Storage Service for handling file uploads
 */
export class R2StorageService {
  private bucket: R2Bucket | null = null;
  private bucketName: string;

  constructor(bucket: R2Bucket | null, bucketName: string) {
    this.bucket = bucket;
    this.bucketName = bucketName;
  }

  /**
   * Upload a file to R2
   */
  async uploadFile(
    file: File | Buffer | ArrayBuffer,
    key: string,
    contentType?: string,
    metadata?: Record<string, string>,
  ): Promise<UploadResult> {
    if (!this.bucket) {
      logger.warn("R2 bucket not initialized");
      return {
        success: false,
        error: "R2 bucket not configured",
      };
    }

    try {
      let buffer: ArrayBuffer;
      let actualContentType = contentType;

      if (file instanceof File) {
        buffer = await file.arrayBuffer();
        actualContentType = actualContentType || file.type;
      } else if (Buffer.isBuffer(file)) {
        // Convert Buffer to ArrayBuffer (handles both ArrayBuffer and SharedArrayBuffer)
        const uint8Array = new Uint8Array(
          file.buffer,
          file.byteOffset,
          file.byteLength,
        );
        buffer = uint8Array.buffer.slice(
          uint8Array.byteOffset,
          uint8Array.byteOffset + uint8Array.byteLength,
        ) as ArrayBuffer;
      } else {
        buffer = file;
      }

      const putOptions: {
        httpMetadata: {
          contentType: string;
          contentDisposition: string;
        };
        customMetadata?: Record<string, string>;
      } = {
        httpMetadata: {
          contentType: actualContentType || "application/octet-stream",
          contentDisposition: `attachment; filename="${key.split("/").pop()}"`,
        },
      };

      // Only add customMetadata if it's provided
      if (metadata) {
        putOptions.customMetadata = metadata;
      }

      await this.bucket.put(key, buffer, putOptions);

      // Generate public URL (adjust based on your R2 public access configuration)
      const url = `https://pub-${this.bucketName}.r2.dev/${key}`;

      logger.info("File uploaded to R2", { key, size: buffer.byteLength });

      return {
        success: true,
        key,
        url,
        size: buffer.byteLength,
      };
    } catch (error) {
      logger.error("R2 upload error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }

  /**
   * Get a file from R2
   */
  async getFile(key: string): Promise<{
    success: boolean;
    data?: ArrayBuffer;
    contentType?: string;
    error?: string;
  }> {
    if (!this.bucket) {
      return { success: false, error: "R2 bucket not configured" };
    }

    try {
      const object = await this.bucket.get(key);

      if (!object) {
        return { success: false, error: "File not found" };
      }

      const data = await new Response(object.body).arrayBuffer();

      const result: {
        success: true;
        data: ArrayBuffer;
        contentType?: string;
      } = {
        success: true,
        data,
      };

      // Only add contentType if it exists
      if (object.httpMetadata["contentType"]) {
        result.contentType = object.httpMetadata["contentType"];
      }

      return result;
    } catch (error) {
      logger.error("R2 get error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Get failed",
      };
    }
  }

  /**
   * Delete a file from R2
   */
  async deleteFile(key: string): Promise<boolean> {
    if (!this.bucket) {
      return false;
    }

    try {
      await this.bucket.delete(key);
      logger.info("File deleted from R2", { key });
      return true;
    } catch (error) {
      logger.error("R2 delete error:", error);
      return false;
    }
  }

  /**
   * List files in R2 with optional prefix
   */
  async listFiles(
    prefix?: string,
    limit = 100,
  ): Promise<Array<{ key: string; size: number; uploaded: Date }>> {
    if (!this.bucket) {
      return [];
    }

    try {
      const listOptions: { prefix?: string; limit: number } = { limit };

      // Only add prefix if it's provided
      if (prefix) {
        listOptions.prefix = prefix;
      }

      const result = await this.bucket.list(listOptions);
      return result.objects;
    } catch (error) {
      logger.error("R2 list error:", error);
      return [];
    }
  }
}

/**
 * Get R2 bucket from Cloudflare Workers environment
 */
export function getR2Bucket(bucketName: "RESUMES" | "ASSETS"): R2Bucket | null {
  // In Cloudflare Workers environment, bindings are available on globalThis
  if (typeof globalThis !== "undefined") {
    const bucket = (globalThis as Record<string, unknown>)[
      bucketName
    ] as R2Bucket;
    return bucket || null;
  }
  return null;
}

/**
 * Helper to generate a unique file key
 */
export function generateFileKey(
  folder: string,
  filename: string,
  userId?: string,
): string {
  const timestamp = Date.now();
  const sanitized = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const prefix = userId ? `${folder}/${userId}` : folder;
  return `${prefix}/${timestamp}-${sanitized}`;
}

/**
 * Check if file size is small enough for email attachment (< 2MB)
 */
export function isSmallEnoughForEmail(sizeInBytes: number): boolean {
  const MAX_EMAIL_ATTACHMENT_SIZE = 2 * 1024 * 1024; // 2MB
  return sizeInBytes <= MAX_EMAIL_ATTACHMENT_SIZE;
}

/**
 * Convert file to base64 for email attachment
 */
export async function fileToBase64(file: File | ArrayBuffer): Promise<string> {
  let buffer: ArrayBuffer;

  if (file instanceof File) {
    buffer = await file.arrayBuffer();
  } else {
    buffer = file;
  }

  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    const byte = bytes[i];
    if (byte !== undefined) {
      binary += String.fromCharCode(byte);
    }
  }
  return btoa(binary);
}
