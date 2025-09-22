// Authentication context and provider for user management
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { getFirebaseAuth, getFirebaseDb } from '../firebase/config'

// User role types
export type UserRole = 'admin' | 'team_member' | 'client'

// Extended user profile interface
export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: UserRole
  photoURL?: string
  isVeteran?: boolean
  phoneNumber?: string
  company?: string
  createdAt: Date
  lastLoginAt: Date
  isActive: boolean
}

// Authentication context interface
interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName: string, role?: UserRole) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>
}

// Create authentication context
const AuthContext = createContext<AuthContextType | null>(null)

// Google Auth provider
const googleProvider = new GoogleAuthProvider()

// Authentication provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Get user profile from Firestore
  const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const db = getFirebaseDb()
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile
      }
      return null
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  // Create or update user profile in Firestore
  const createUserProfile = async (
    user: User,
    additionalData: Partial<UserProfile> = {}
  ) => {
    try {
      const db = getFirebaseDb()
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        role: 'client', // Default role
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isActive: true,
        photoURL: user.photoURL || '',
        ...additionalData,
      }

      await setDoc(doc(db, 'users', user.uid), userProfile)
      return userProfile
    } catch (error) {
      console.error('Error creating user profile:', error)
      throw error
    }
  }

  // Update user profile (admin function to update any user)
  const updateUserProfileById = async (uid: string, updates: Partial<UserProfile>) => {
    try {
      const db = getFirebaseDb()
      await updateDoc(doc(db, 'users', uid), {
        ...updates,
        lastLoginAt: new Date(),
      })
      
      // Update local state if it's the current user
      if (userProfile && userProfile.uid === uid) {
        setUserProfile({ ...userProfile, ...updates })
      }
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
  }

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const auth = getFirebaseAuth()
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  // Sign up with email and password
  const signUp = async (
    email: string,
    password: string,
    displayName: string,
    role?: UserRole
  ) => {
    try {
      const auth = getFirebaseAuth()
      const result = await createUserWithEmailAndPassword(auth, email, password)
      
      // Create user profile in Firestore
      await createUserProfile(result.user, { displayName, role: role || 'client' })
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const auth = getFirebaseAuth()
      const googleProvider = new GoogleAuthProvider()
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      })
      
      const result = await signInWithPopup(auth, googleProvider)
      
      // Check if user profile exists, create one if not
      const existingProfile = await getUserProfile(result.user.uid)
      if (!existingProfile) {
        await createUserProfile(result.user)
      }
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  // Sign out
  const logout = async () => {
    try {
      const auth = getFirebaseAuth()
      await signOut(auth)
      setUser(null)
      setUserProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  // Update user profile (current user only)
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in')
    
    try {
      const db = getFirebaseDb()
      await updateDoc(doc(db, 'users', user.uid), {
        ...updates,
        lastLoginAt: new Date(),
      })
      
      // Update local state
      if (userProfile) {
        setUserProfile({ ...userProfile, ...updates })
      }
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
  }

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const auth = getFirebaseAuth()
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.error('Error resetting password:', error)
      throw error
    }
  }

  // Listen for authentication state changes
  useEffect(() => {
    const auth = getFirebaseAuth()
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        // Fetch user profile from Firestore
        const profile = await getUserProfile(firebaseUser.uid)
        setUserProfile(profile)
      } else {
        setUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use authentication context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Role-based access control hooks
export function useRequireAuth(requiredRole?: UserRole) {
  const { user, userProfile, loading } = useAuth()
  
  const hasAccess = React.useMemo(() => {
    if (!user || !userProfile) return false
    if (!requiredRole) return true
    
    const roleHierarchy: Record<UserRole, number> = {
      'client': 0,
      'team_member': 1,
      'admin': 2
    }
    
    return roleHierarchy[userProfile.role] >= roleHierarchy[requiredRole]
  }, [user, userProfile, requiredRole])

  return { user, userProfile, loading, hasAccess }
}

// Admin access hook
export function useRequireAdmin() {
  return useRequireAuth('admin')
}

// Team member access hook  
export function useRequireTeamMember() {
  return useRequireAuth('team_member')
}