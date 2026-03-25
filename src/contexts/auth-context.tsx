/**
 * Auth context — re-exported from src/lib/auth/auth-context.tsx for
 * consistency with the contexts/ convention used by ThemeContext.
 *
 * Import from here or from @/lib/auth/auth-context — both work.
 */
export {
  AuthProvider,
  useAuth,
  default as AuthContext,
} from "@/lib/auth/auth-context";
export type { UserProfile, UserRole } from "@/lib/auth/auth-context";
