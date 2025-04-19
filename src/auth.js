// src/auth.js
import NextAuth from "next-auth";
import { authConfig } from "./authconfig";

// إنشاء handler مع إعدادات مخصصة
const handler = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    }
  }
});

// تصدير الدوال الأساسية
export const { auth, signIn, signOut } = handler;
export const { GET, POST } = handler;

// وظائف التحقق من الصلاحيات
export const isAdmin = (session) => {
  return session?.user?.role === "admin";
};

export const isSeller = (session) => {
  return session?.user?.role === "seller" || session?.user?.role === "admin";
};

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user;
};