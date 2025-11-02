// Authentication context and provider for user management
// NOTE: This is a stub implementation. Firebase authentication has been removed.
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
  user: any | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    role?: UserRole
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateUserProfileById: (
    uid: string,
    updates: Partial<UserProfile>
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading] = useState(false);

  const signIn = async () => {
    throw new Error("Authentication not configured");
  };

  const signUp = async () => {
    throw new Error("Authentication not configured");
  };

  const signInWithGoogle = async () => {
    throw new Error("Authentication not configured");
  };

  const logout = async () => {
    setUser(null);
    setUserProfile(null);
  };

  const resetPassword = async () => {
    throw new Error("Authentication not configured");
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!userProfile) throw new Error("No user profile");
    setUserProfile({ ...userProfile, ...updates });
  };

  const updateUserProfileById = async () => {
    throw new Error("Authentication not configured");
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
