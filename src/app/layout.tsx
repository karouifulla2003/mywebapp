// src/app/layout.tsx
"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/providers/SessionAuthProviders";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // تحديث القاعدة: لا تظهر Navigation و Footer في صفحات الأدمن أو صفحات تسجيل الدخول والتسجيل
  const hideNavAndFooter = 
    pathname?.startsWith('/admin') || 
    pathname === '/auth/login' || 
    pathname === '/auth/register'||
    pathname === '/auth/forgot-password'||
    pathname === '/careers'||
    pathname === '/vision'||
    pathname === '/blog'||
    pathname === '/contact_us'||
    pathname === '/faqs'||
    pathname === '/auth/forgot-password';

  return (
    <html lang="eng" dir="ltr">
      <body className={inter.className}>
        <Providers>
          {!hideNavAndFooter && <NavBar />}
          {children}
          {!hideNavAndFooter && <Footer />}
        </Providers>
      </body>
    </html>
  );
}