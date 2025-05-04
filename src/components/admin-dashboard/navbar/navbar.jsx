"use client";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Search from "@/components/admin-dashboard/search/search";

export default function AdminNavbar({ user }) {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const pageTitle = pathname.split("/").pop() || "dashboard";
  const formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  
  return (
    <header className="bg-[#182237] shadow-sm h-16 flex items-center px-6">
      <div className="flex-1 flex justify-between items-center">
        {/* عنوان الصفحة في اليمين */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-white">{formattedTitle}</h1>
        </div>
        
        {/* المساحة الوسطى */}
        <div className="flex-1"></div>
        
        {/* شريط البحث في أقصى اليسار */}
        <div className="flex items-center">
          <div className="ml-4">
            <Search placeholder="Search..." />
          </div>
          

        </div>
      </div>
    </header>
  );
}