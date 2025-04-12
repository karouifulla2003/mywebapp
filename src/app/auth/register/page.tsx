// src/app/auth/register/page.tsx
import { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'إنشاء حساب جديد | متجر إلكتروني',
  description: 'إنشاء حساب جديد في المتجر الإلكتروني',
};

export default function RegisterPage() {
  return (
    <main className="py-12 px-4">
      <div className="max-w-md mx-auto">
        <RegisterForm />
      </div>
    </main>
  );
}
