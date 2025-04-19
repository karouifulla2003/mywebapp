"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MdDashboard, 
  MdPeople, 
  MdShoppingBag, 
  MdAttachMoney, 
  MdSettings,
  MdLogout 
} from "react-icons/md";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { name: "لوحة التحكم", path: "/admin/dashboard", icon: <MdDashboard size={20} /> },
    { name: "المنتجات", path: "/admin/dashboard/products", icon: <MdShoppingBag size={20} /> },
    { name: "المستخدمين", path: "/admin/dashboard/users", icon: <MdPeople size={20} /> },
    { name: "الطلبات", path: "/admin/dashboard/orders", icon: <MdAttachMoney size={20} /> },
    { name: "الإعدادات", path: "/admin/dashboard/settings", icon: <MdSettings size={20} /> }
  ];
  
  return (
    <aside className="bg-gray-800 w-64 h-full flex flex-col text-white">
      <div className="p-5 border-b border-gray-700">
        <h2 className="text-2xl font-bold">لوحة الإدارة</h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center px-5 py-3 mb-1 rounded-lg transition-colors ${
                  pathname === item.path
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span className="ml-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="flex items-center w-full px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <MdLogout size={20} className="ml-3" />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}