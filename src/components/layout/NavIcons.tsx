"use client";

import Image from "next/image";
import CartModel from "@/components/cart/CartModel";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotificationsModel from "../notification/NotificationsModel";
import { FiBell, FiShoppingCart, FiUser } from "react-icons/fi";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const isLoggedIn = false;
  const router = useRouter();

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {/* أيقونة البروفايل - تم تحديثها باستخدام react-icons */}
      <div onClick={handleProfile} className="cursor-pointer">
        <FiUser className="w-6 h-6 text-gray-700 hover:text-primary" />
      </div>

      {/* عرض قائمة البروفايل إذا كان المستخدم مسجل الدخول */}
      {isProfileOpen && isLoggedIn && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white z-20">
          <Link href="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )}

      {/* أيقونة الإشعارات - النسخة المحسنة */}
      <div className="relative">
        <button 
          onClick={() => setIsNotificationsOpen(true)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors relative"
          aria-label="Notifications"
        >
          <FiBell className="w-6 h-6 text-gray-700 hover:text-primary" />
          <span className="absolute -top-4 -right-4 w-6 h-6 bg-Revibe rounded-full text-white text-sm flex items-center justify-center">
            3
          </span>
        </button>
      </div>

      {/* أيقونة السلة - تم تحديثها باستخدام react-icons */}
      <div className="relative">
        <button 
          onClick={() => setIsCartOpen((prev) => !prev)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors relative"
          aria-label="Cart"
        >
          <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary" />
          <span className="absolute -top-4 -right-4 w-6 h-6 bg-Revibe rounded-full text-white text-sm flex items-center justify-center">
            2
          </span>
        </button>
      </div>

      {/* عرض نموذج السلة إذا كان مفتوحًا */}
      {isCartOpen && <CartModel />}
      
      {/* عرض نموذج الإشعارات إذا كان مفتوحًا */}
      {isNotificationsOpen && (
        <NotificationsModel 
          isOpen={isNotificationsOpen} 
          onClose={() => setIsNotificationsOpen(false)} 
        />
      )}
    </div>
  );
};

export default NavIcons;