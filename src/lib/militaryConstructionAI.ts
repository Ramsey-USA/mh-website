// Migration to modular AI system - now using src/lib/ai/
// This file now exports from the new modular AI architecture
// All functionality has been moved to src/lib/ai/ for better maintainability
export * from "./ai";
export { militaryConstructionAI as default } from "./ai";
