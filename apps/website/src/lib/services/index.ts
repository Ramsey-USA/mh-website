/**
 * Services Module
 *
 * Exports utilities for external service integration:
 * - Service health monitoring
 * - Service configuration validation
 */

export {
  checkAllServices,
  checkResendStatus,
  checkTwilioStatus,
  checkD1Status,
  checkKVStatus,
  checkR2Status,
  checkAIStatus,
  getQuickHealthStatus,
  type ServiceStatus,
  type ServiceHealthReport,
} from "./health-check";
