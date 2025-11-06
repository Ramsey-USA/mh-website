/**
 * Veteran Benefits Automation System
 * Export refactored modular system
 *
 * Original file backed up to: VeteranBenefitsAutomation.backup.ts
 * Refactored into modular components:
 * - benefits/types.ts - Type definitions (189 lines)
 * - benefits/DiscountCalculator.ts - Discount calculation (248 lines)
 * - benefits/VABenefitsCoordinator.ts - VA benefits coordination (229 lines)
 * - benefits/SpecialistManager.ts - Specialist assignment (264 lines)
 * - benefits/index.ts - Main orchestrator (368 lines)
 *
 * Total: 1,298 lines (modular) vs 1,101 lines (monolithic)
 * Main orchestrator reduced from 1,101 to 368 lines (67% reduction)
 */

export * from "./benefits";
