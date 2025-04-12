
// src/app/auth/forgot-password/page.tsx
import { Metadata } from 'next';
import ForgotPassword from '@/components/auth/ForgotPassword';

export const metadata: Metadata = {
  title: 'استعادة كلمة المرور | متجر إلكتروني',
  description: 'استعادة كلمة المرور في المتجر الإلكتروني',
};

export default function ForgotPasswordPage() {
  return (
    <main className="py-12 px-4">
      <div className="max-w-md mx-auto">
        <ForgotPassword />
      </div>
    </main>
  );
}