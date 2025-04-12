'use client';
// src/app/auth/login/page.tsx
import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';
import { useSearchParams } from 'next/navigation';



export default function LoginPage() {
  return (
    <main className="py-12 px-4">
      <div className="max-w-md mx-auto">
        <ClientSideLoginPage />
      </div>
    </main>
  );
}

// هذا المكون على جانب العميل للوصول إلى useSearchParams


function ClientSideLoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  
  return (
    <>
      {registered && (
        <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6 text-sm border border-green-200">
          تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.
        </div>
      )}
      
      <LoginForm />
    </>
  );
}
