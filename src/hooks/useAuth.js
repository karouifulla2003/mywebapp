//myproject
// src/hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import { users } from '@/data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // تحقق مما إذا كان المستخدم مسجل الدخول بالفعل
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  const login = (email, password) => {
    // محاكاة عملية تسجيل الدخول
    const foundUser = users.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      // احذف كلمة المرور قبل التخزين
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, message: "بيانات الدخول غير صحيحة" };
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const register = (userData) => {
    // محاكاة عملية التسجيل
    // في التطبيق الفعلي، ستقوم بإرسال طلب إلى الخادم
    return { success: true, message: "تم إنشاء الحساب بنجاح" };
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);