//src/app/admin/layout.js
import { getCurrentUser } from '@/auth';
import { isAdmin } from '@/auth';
import { redirect } from 'next/navigation';
import "@/components/admin-dashboard/globals.css";

export default async function AdminLayout({ children }) {
  const user = await getCurrentUser();
  console.log("User in AdminLayout:", user);
  
  if (!user || !isAdmin(user)) {
    console.log("غير مصرح: تحويل إلى صفحة تسجيل الدخول");
    redirect('/auth/login');
  }

  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}