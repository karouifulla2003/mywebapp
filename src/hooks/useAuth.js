"use client"
import { useState, useEffect, useContext, createContext } from 'react';

// إنشاء سياق للمصادقة
const authContext = createContext();

// هذا هو المزود الذي سيغلف تطبيقك لتوفير حالة المصادقة
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// استخدام السياق لإنشاء خطاف مخصص
export const useAuth = () => {
  return useContext(authContext);
};

// المنطق الأساسي للمصادقة
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // تأثير لتحميل حالة المستخدم عند بدء التشغيل
  useEffect(() => {
    // التحقق من وجود توكن في التخزين المحلي
    const token = localStorage.getItem('token');
    if (token) {
      // استدعاء API للتحقق من التوكن واسترجاع بيانات المستخدم
      fetchUserData(token)
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          // في حالة وجود مشكلة، قم بتسجيل الخروج
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  
  // دالة لاسترجاع بيانات المستخدم من API
  const fetchUserData = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('فشل التحقق من المستخدم');
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  // دالة تسجيل الدخول
  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'فشل تسجيل الدخول');
      }
      
      const data = await response.json();
      
      // تخزين التوكن في التخزين المحلي
      localStorage.setItem('token', data.token);
      
      // تعيين بيانات المستخدم
      setUser(data.user);
      
      return data.user;
    } catch (error) {
      throw error;
    }
  };
  
  // دالة التسجيل (إنشاء حساب)
  const register = async (name, email, password) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'فشل إنشاء الحساب');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  // دالة تسجيل الخروج
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  
  // دالة إعادة تعيين كلمة المرور
  const resetPassword = async (email) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'فشل إرسال طلب إعادة تعيين كلمة المرور');
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  // دالة تغيير كلمة المرور
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('يجب تسجيل الدخول أولاً');
      
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'فشل تغيير كلمة المرور');
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  // دالة للتحقق إذا كان المستخدم مسجل الدخول
  const isAuthenticated = () => {
    return !!user;
  };
  
  // إرجاع الدوال والحالات التي نريد إتاحتها للتطبيق
  return {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    changePassword,
    isAuthenticated
  };
}