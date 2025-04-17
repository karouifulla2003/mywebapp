// src/components/auth/LoginForm.tsx
"use client";
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = login(email, password);
    
    if (result.success) {
      // توجيه المستخدم بناءً على دوره
      switch (result.user.role) {
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'seller':
          router.push('/seller/dashboard');
          break;
        case 'customer':
          router.push('/');
          break;
        default:
          router.push('/');
      }
    } else {
      setError(result.message);
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
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
}