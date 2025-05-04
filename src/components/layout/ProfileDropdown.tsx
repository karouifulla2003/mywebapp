"use client";

import { useState } from "react";
import Link from "next/link";
import { FiUser, FiSettings, FiLogOut, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ProfileDropdownProps {
  isLoggedIn: boolean;
  userData?: {
    name: string;
  };
  onLogout?: () => void;
}

const ProfileDropdown = ({ isLoggedIn, userData, onLogout }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleProfileClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogin = () => {
    // لا تغيير هنا حيث أننا نستخدم التوجيه الداخلي
    // لكن صفحة التسجيل ستظهر بدون NavBar وFooter بسبب التعديل في layout.tsx
    router.push("/auth/login");
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div onClick={handleProfileClick} className="cursor-pointer">
        <FiUser className="w-6 h-6 text-gray-700 rounded-full hover:bg-gray-100 hover:text-[#FDA210] active:text-[#787a79] hover:scale-110 active:scale-95 transition-all duration-300" />
      </div>

      {/* Dropdown for non-logged in users */}
      {isOpen && !isLoggedIn && (
        <div className="absolute p-5 rounded-lg top-14 right-0 w-72 text-base shadow-[0_5px_15px_rgb(0,0,0,0.2)] bg-white z-20 border border-gray-100">
          {/* Close button */}
          <button 
            onClick={handleClose} 
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center">
            <div className="bg-gray-100 rounded-full p-4 mb-3">
              <FiUser className="w-14 h-14 text-gray-500" />
            </div>
            <h3 className="font-medium text-lg mb-1">Welcome!</h3>
            <p className="text-center mb-4 text-gray-600">Please sign in to access your account</p>
            <button 
              onClick={handleLogin}
              className="w-full bg-[#FDA210] text-white py-3 px-4 rounded-lg hover:bg-[#e99100] transition-colors font-medium text-base"
            >
              Sign In
            </button>
            <p className="mt-3 text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-[#FDA210] hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Dropdown for logged in users */}
      {isOpen && isLoggedIn && userData && (
        <div className="absolute p-5 rounded-lg top-14 right-0 w-72 text-base shadow-[0_5px_15px_rgb(0,0,0,0.2)] bg-white z-20 border border-gray-100">
          {/* Close button */}
          <button 
            onClick={handleClose} 
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-[#FDA210] rounded-full p-3 mr-3">
                <span className="text-white font-bold text-xl">
                  {userData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-lg">{userData.name}</h3>
                <p className="text-gray-500 text-sm">Account Member</p>
              </div>
            </div>
            
            <div className="w-full border-t border-gray-100 pt-3">
              <Link 
                href="/profile" 
                className="flex items-center py-3 px-3 hover:bg-gray-50 rounded-md transition-colors mb-1 text-gray-700"
              >
                <FiUser className="mr-3 text-[#FDA210]" />
                <span>My Profile</span>
              </Link>
              
              <Link 
                href="/settings" 
                className="flex items-center py-3 px-3 hover:bg-gray-50 rounded-md transition-colors mb-1 text-gray-700"
              >
                <FiSettings className="mr-3 text-[#FDA210]" />
                <span>Account Settings</span>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center py-3 px-3 hover:bg-gray-50 rounded-md transition-colors text-red-600 mt-2"
              >
                <FiLogOut className="mr-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;