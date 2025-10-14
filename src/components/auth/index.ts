// Authentication components exports
export {
  AuthProvider,
  useAuth,
  useRequireAuth,
  useRequireAdmin,
  useRequireTeamMember,
} from '@/lib/auth/AuthContext'
export {
  ProtectedRoute,
  DashboardProtection,
  AdminProtection,
} from '@/lib/auth/ProtectedRoute'
export { UserProfile } from './UserProfile'
