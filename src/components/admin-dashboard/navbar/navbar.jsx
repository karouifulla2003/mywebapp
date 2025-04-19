"use client";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function AdminNavbar({ user }) {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const pageTitle = pathname.split("/").pop() || "dashboard";
  const formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  
  return (
    <header className="bg-white shadow-sm h-16 flex items-center px-6">
      <div className="flex-1 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">{formattedTitle}</h1>
        </div>
        
        <div className="flex items-center">
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-700 focus:outline-none"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="ml-2">{user?.name || "مدير النظام"}</span>
              <img
                src={user?.image || "https://ui-avatars.com/api/?name=Admin"}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </button>
            
            {showDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}