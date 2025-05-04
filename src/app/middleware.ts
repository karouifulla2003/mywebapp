import { NextResponse } from "next/server";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function middleware(request) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";

  // إذا حاول المستخدم الدخول إلى /admin ولم يكن أدمن
  if (request.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}