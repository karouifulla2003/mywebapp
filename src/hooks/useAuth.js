"use client";
import { useState, createContext, useContext } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// إنشاء سياق للمصادقة
const AuthContext = createContext(null);

// مكون AuthProvider المطلوب
export function AuthProvider({ children }) {
  const authValues = useAuth();
  
  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
}

// استخدام سياق المصادقة
export function useAuthContext() {
  return useContext(AuthContext);
}

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result.error) {
        return {
          success: false,
          message: "بيانات الدخول غير صحيحة"
        };
      }

      // الحصول على بيانات المستخدم من MOCK_USERS
      const mockUsers = [
        {
          id: "admin-1",
          name: "مدير النظام",
          email: "admin@example.com",
          role: "admin",
        },
        {
          id: "user-1",
          name: "مستخدم عادي",
          email: "user@example.com",
          role: "user",
        },
        {
          id: "seller-1",
          name: "بائع",
          email: "seller@example.com",
          role: "seller",
        }
      ];

      const user = mockUsers.find(user => user.email === email);
      
      return {
        success: true,
        user: user || { role: "user" }
      };
    } catch (error) {
      return {
        success: false,
        message: "حدث خطأ في تسجيل الدخول"
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}