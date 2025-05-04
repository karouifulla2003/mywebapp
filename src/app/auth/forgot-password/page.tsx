import { Metadata } from 'next';
import ForgotPassword from '@/components/auth/ForgotPassword';

// تعريف الـ metadata للصفحة
export const metadata: Metadata = {
  title: 'password recovery',
  description: 'استعادة كلمة المرور لحسابك',
};

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto">
      <ForgotPassword />
    </div>
  );
}