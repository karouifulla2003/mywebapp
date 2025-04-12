"use client"
// src/components/auth/LoginForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Successfully logged in
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/account'); // Redirect to account page after login
      }
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      
      {loginError && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm border border-red-200">
          {loginError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#FDA619] focus:outline-none transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-[#FDA619] hover:text-[#e08900] transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#FDA619] focus:outline-none transition-all ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && <p className="mt-1 text-red-600 text-sm">{errors.password}</p>}
        </div>
        
        <div className="flex items-center">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-[#FDA619] border-gray-300 rounded focus:ring-[#FDA619]"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
            Remember me
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#FDA619] text-white py-3 px-4 rounded-md hover:bg-[#e08900] focus:outline-none focus:ring-2 focus:ring-[#FDA619] focus:ring-offset-2 disabled:opacity-70 transition-colors font-medium"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-[#FDA619] hover:text-[#e08900] font-medium transition-colors">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;