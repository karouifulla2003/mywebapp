// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// محاكاة التحقق من المستخدم - في الإنتاج استخدم JWT أو طرق آمنة
export function middleware(request: NextRequest) {
  const user = request.cookies.get('user')?.value;
  const path = request.nextUrl.pathname;
  
  // التحقق من المسارات المحمية
  if (path.startsWith('/admin') && (!user || JSON.parse(user).role !== 'admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (path.startsWith('/seller') && (!user || JSON.parse(user).role !== 'seller')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (path.startsWith('/profile') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// المسارات التي سيتم تطبيق الحماية عليها
export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/profile/:path*']
};