import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const users = [
  {
    id: "admin-001",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    name: "مدير النظام",
    username: "admin",
    img: "/noavatar.png"
  }
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = users.find(u => u.email === credentials.email);
        if (user && user.password === credentials.password) {
          return user;
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username || user.name;
        token.img = user.img;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.username = token.username;
      session.user.img = token.img;
      return session;
    }
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export async function serverSignOut() {
  "use server";
  
  // اسم الكوكي الذي يجب حذفه (قد يختلف اعتمادًا على الإعدادات)
  const cookieName = authOptions.cookies?.sessionToken?.name || "next-auth.session-token";
  
  // حذف كوكي الجلسة
  cookies().delete(cookieName);
  
  // يمكنك أيضًا حذف كوكيز أخرى مرتبطة بـ next-auth
  cookies().delete("next-auth.csrf-token");
  cookies().delete("next-auth.callback-url");
  
  // إعادة توجيه إلى الصفحة الرئيسية أو صفحة تسجيل الدخول
  return { redirectTo: "/" };
}

export const auth = async () => {
  const session = await getServerSession(authOptions);
  return { user: session?.user };
};

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    return session?.user;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const isAdmin = (user) => user?.role === "admin";
export const isSeller = (user) => ["seller", "admin"].includes(user?.role);