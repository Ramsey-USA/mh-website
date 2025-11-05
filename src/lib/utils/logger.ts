/**
 * Development and Production Logging Utility
 *
 * This utility provides environment-aware logging that:
 * - Only outputs in development mode
 * - Can be extended to send to external services in production
 * - Provides consistent logging interface across the application
 */

type LogLevel = "log" | "info" | "warn" | "error" | "debug";

interface LoggerConfig {
  isDevelopment: boolean;
  enableProductionErrors: boolean;
  externalLogger?: (level: LogLevel, message: string, data?: any) => void;
}

class Logger {
  private config: LoggerConfig;

  constructor(config?: Partial<LoggerConfig>) {
    this.config = {
      isDevelopment: process.env.NODE_ENV === "development",
      enableProductionErrors: true,
      ...config,
    };
  }

  /**
   * General logging - only in development
   */
  log(message: string, ...args: any[]): void {
    if (this.config.isDevelopment) {
      console.log(`[LOG] ${message}`, ...args);
    }
  }

  /**
   * Informational messages - only in development
   */
  info(message: string, ...args: any[]): void {
    if (this.config.isDevelopment) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  /**
   * Warnings - shown in development, sent to external service in production
   */
  warn(message: string, ...args: any[]): void {
    if (this.config.isDevelopment) {
      console.warn(`[WARN] ${message}`, ...args);
    } else if (this.config.externalLogger) {
      this.config.externalLogger("warn", message, args);
    }
  }

  /**
   * Errors - always logged (development console, production external service)
   */
  error(message: string, error?: any, ...args: any[]): void {
    if (this.config.isDevelopment) {
      console.error(`[ERROR] ${message}`, error, ...args);
    } else if (this.config.enableProductionErrors) {
      if (this.config.externalLogger) {
        this.config.externalLogger("error", message, { error, args });
      } else {
        // Fallback: at least log to console in production for critical errors
        console.error(`[ERROR] ${message}`, error);
      }
    }
  }

  /**
   * Debug messages - only in development
   */
  debug(message: string, ...args: any[]): void {
    if (this.config.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Performance metric logging
   */
  metric(metricName: string, value: number, unit?: string): void {
    if (this.config.isDevelopment) {
      console.log(`[METRIC] ${metricName}: ${value}${unit || ""}`);
    } else if (this.config.externalLogger) {
      this.config.externalLogger("info", `metric:${metricName}`, {
        value,
        unit,
      });
    }
  }

  /**
   * Update logger configuration
   */
  configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// Export singleton instance
export const logger = new Logger();

// Export class for custom instances
export { Logger };
export type { LogLevel, LoggerConfig };

// Convenience exports
export const { log, info, warn, error, debug, metric } = logger;
