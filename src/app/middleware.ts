// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const path = request.nextUrl.pathname;
  
  // التحقق من المسارات المحمية
  if (path.startsWith('/admin') && (!session || session.user.role !== 'admin')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  if (path.startsWith('/seller') && (!session || session.user.role !== 'seller')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  if (path.startsWith('/profile') && !session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return NextResponse.next();
}

// المسارات التي سيتم تطبيق الحماية عليها
export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/profile/:path*']
};