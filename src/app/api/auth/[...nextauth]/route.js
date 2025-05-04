// /src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// قائمة بالمستخدمين المعتمدين (في الإنتاج ستستخدم قاعدة بيانات)
const users = [
  {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  }
];

// قائمة لتخزين رموز إعادة تعيين كلمة المرور مؤقتًا
// في الإنتاج يجب تخزين هذه في قاعدة بيانات
const resetTokens = new Map();

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        // بيانات الأدمن الافتراضية
        const hardcodedAdmin = {
          id: "1",
          name: "Admin",
          email: "admin@example.com",
          password: "admin123",
          role: "admin"
        };

        if (
          credentials.email === hardcodedAdmin.email &&
          credentials.password === hardcodedAdmin.password
        ) {
          return hardcodedAdmin;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  debug: true // أضف هذا للمساعدة في تشخيص المشكلات
};

// إنشاء معالجي GET و POST للمسار الرئيسي
const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;