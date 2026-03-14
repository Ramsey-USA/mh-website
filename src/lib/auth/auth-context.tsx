// Authentication context and provider for user management
// NOTE: This is a stub implementation. Authentication uses Cloudflare Access/Zero Trust.
"use client";

import React, { createContext, useContext, useState } from "react";

export type UserRole = "admin" | "team_member" | "client";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  isVeteran?: boolean;
  phoneNumber?: string;
  company?: string;
  createdAt: Date;
  lastLoginAt: Date;
  isActive: boolean;
}

interface AuthContextType {
  user: unknown | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    role?: UserRole,
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateUserProfileById: (
    uid: string,
    updates: Partial<UserProfile>,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading] = useState(false);

  // Stub implementations - Authentication system not yet configured
  // These return Promises to match AuthContextType interface for future async implementation
  const signIn = () => {
    return Promise.reject(new Error("Authentication not configured"));
  };

  const signUp = () => {
    return Promise.reject(new Error("Authentication not configured"));
  };

  const signInWithGoogle = () => {
    return Promise.reject(new Error("Authentication not configured"));
  };

  const logout = () => {
    setUser(null);
    setUserProfile(null);
    return Promise.resolve();
  };

  const resetPassword = () => {
    return Promise.reject(new Error("Authentication not configured"));
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (!userProfile) {
      throw new Error("No user profile");
    }
    setUserProfile({ ...userProfile, ...updates });
    return Promise.resolve();
  };

  const updateUserProfileById = () => {
    return Promise.reject(new Error("Authentication not configured"));
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    updateUserProfileById,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
