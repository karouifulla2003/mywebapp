// app/admin/page.jsx
import { redirect } from 'next/navigation';
import { auth, isAdmin } from '@/auth';

export default async function AdminPage() {
  const session = await auth();
  
  // التحقق من صلاحيات المستخدم
  if (!session) {
    redirect('/auth/login');
  }
  
  const admin = await isAdmin(session);
  if (!admin) {
    redirect('/');
  }
  
  // إعادة توجيه إلى لوحة التحكم
  redirect('/admin/dashboard');
}