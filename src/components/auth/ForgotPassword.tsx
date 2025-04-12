"use client"
// src/components/auth/ForgotPassword.tsx
import { useState } from 'react';
import Link from 'next/link';

interface ForgotPasswordProps {
  onSuccess?: () => void;
}

const ForgotPassword = ({ onSuccess }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestError, setRequestError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestError('');
    
    if (!validateEmail()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Replace with actual API call
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send password reset link');
      }
      
      // Successfully sent password reset link
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'An error occurred while processing your request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Password Recovery</h2>
      
      {isSubmitted ? (
        <div className="text-center space-y-4">
          <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4 text-sm border border-green-200">
            A password reset link has been sent to your email. Please check your inbox.
          </div>
          
          <p className="text-gray-600 mb-4">
            Didn't receive the email? Check your spam folder or 
            <button 
              onClick={handleSubmit} 
              className="text-[#FDA619] hover:text-[#e08900] ml-1 font-medium transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Resending...' : 'Resend email'}
            </button>
          </p>
          
          <Link href="/auth/login" className="block text-[#FDA619] hover:text-[#e08900] font-medium transition-colors">
            Back to Login
          </Link>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          {requestError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm border border-red-200">
              {requestError}
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
                value={email}
                onChange={handleEmailChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#FDA619] focus:outline-none transition-all ${
                  emailError ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {emailError && <p className="mt-1 text-red-600 text-sm">{emailError}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FDA619] text-white py-3 px-4 rounded-md hover:bg-[#e08900] focus:outline-none focus:ring-2 focus:ring-[#FDA619] focus:ring-offset-2 disabled:opacity-70 transition-colors font-medium"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            <div className="text-center">
              <Link href="/auth/login" className="text-[#FDA619] hover:text-[#e08900] font-medium transition-colors">
                Back to Login
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;