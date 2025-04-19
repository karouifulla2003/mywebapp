// src/authconfig.js
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const MOCK_USERS = [
  {
    id: "admin-1",
    name: "مدير النظام",
    email: "admin@example.com",
    password: "Admin@1234", // كلمة مرور قوية
    role: "admin",
    image: "https://ui-avatars.com/api/?name=Admin"
  }
  // ... باقي المستخدمين
];

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "البريد الإلكتروني", type: "email" },
        password: { label: "كلمة المرور", type: "password" }
      },
      async authorize(credentials) {
        const user = MOCK_USERS.find(u => 
          u.email === credentials?.email?.trim() &&
          u.password === credentials?.password
        );
        return user || null;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
};