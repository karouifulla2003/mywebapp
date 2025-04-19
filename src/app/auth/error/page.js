// src/app/auth/error/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorPage() {
  const params = useSearchParams();
  const error = params.get('error');

  // قاموس رسائل الخطأ (يمكنك إضافة المزيد)
  const errorMap = {
    Signin: 'فشل تسجيل الدخول: بيانات غير صحيحة',
    OAuthSignin: 'خطأ في الاتصال بـ Google',
    Callback: 'مشكلة في إتمام العملية',
    Default: 'حدث خطأ غير متوقع'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          🚨 خطأ في النظام
        </h1>
        <p className="mb-6 text-gray-700">
          {errorMap[error] || errorMap.Default}
        </p>
        <Link
          href="/auth/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          العودة لصفحة التسجيل
        </Link>
      </div>
    </div>
  );
}