"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);
  
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl">جاري التحميل...</span>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">لوحة تحكم المسؤول</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-2">مرحباً {session?.user?.name || "مدير النظام"}</h2>
        <p className="text-gray-600">يمكنك إدارة المنتجات والمستخدمين من هنا</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
          <h3 className="text-lg font-bold mb-2">المنتجات</h3>
          <p className="text-3xl font-bold text-blue-600">10</p>
          <a href="/admin/dashboard/products" className="text-blue-500 hover:underline mt-2 inline-block">
            إدارة المنتجات
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
          <h3 className="text-lg font-bold mb-2">المستخدمين</h3>
          <p className="text-3xl font-bold text-green-600">25</p>
          <a href="/admin/dashboard/users" className="text-green-500 hover:underline mt-2 inline-block">
            إدارة المستخدمين
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
          <h3 className="text-lg font-bold mb-2">الطلبات</h3>
          <p className="text-3xl font-bold text-purple-600">8</p>
          <a href="/admin/dashboard/orders" className="text-purple-500 hover:underline mt-2 inline-block">
            عرض الطلبات
          </a>
        </div>
      </div>
    </div>
  );
}