// /src/hooks/useAuth.js
"use client";
import { createContext, useContext } from 'react';
import { useSession } from "next-auth/react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // الآن useSession ستعمل لأنها مغلفة بـ SessionProvider في layout.tsx
  const { data: session, status } = useSession();

  const value = {
    user: session?.user,
    isAdmin: session?.user?.role === "admin",
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated"
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}