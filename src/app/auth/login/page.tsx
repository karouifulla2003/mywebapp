// components/auth/LoginForm.tsx
"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  callbackUrl?: string | null;
}

export default function LoginForm({ callbackUrl }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (result.error) {
        setError("بيانات الدخول غير صحيحة");
        return;
      }
      
      // تم تسجيل الدخول بنجاح، سنقوم بإعادة توجيه المستخدم
      // استخدم callbackUrl إذا كان موجودًا وإلا استخدم المسار الافتراضي
      router.push(callbackUrl || '/admin/dashboard');
      router.refresh();
    } catch (error) {
      setError("حدث خطأ في تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            كلمة المرور
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <p className="text-gray-600">
          لتسجيل الدخول كمسؤول استخدم:
        </p>
        <p className="text-gray-800">
          البريد: admin@example.com / كلمة المرور: Admin@1234
        </p>
      </div>
    </div>
  );
}