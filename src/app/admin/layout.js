// app/admin/layout.jsx
'use server';

import { auth, isAdmin } from '@/auth';
import { redirect } from 'next/navigation';
import AdminNavbar from '@/components/admin-dashboard/navbar/navbar';
import AdminSidebar from '@/components/admin-dashboard/sidebar/sidebar';

export default async function AdminLayout({ children }) {
  const session = await auth().catch(() => null);
  
  if (!session?.user) {
    redirect('/auth/login?error=session');
  }
  
  if (!(await isAdmin(session))) {
    redirect('/auth/login?error=unauthorized');
  }

  return (
    <div className="flex h-screen bg-gray-100 rtl">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar user={session.user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}