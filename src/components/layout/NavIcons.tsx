"use client";

import { useState } from "react";
import CartModel from "@/components/cart/CartModel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotificationsModel from "../notification/NotificationsModel";
import { FiBell, FiShoppingCart, FiHeart } from "react-icons/fi";
import ProfileDropdown from "./ProfileDropdown";
import { useWishlist } from "@/hooks/useWishlist";

const NavIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // استخدام هوك المفضلات
  const { wishlist } = useWishlist();
  
  // يمكنك تغيير هذه القيمة لاختبار الحالتين
  const isLoggedIn = false;
  const router = useRouter();

  // بيانات المستخدم (تستخدم فقط إذا كان المستخدم مسجل دخول)
  const userData = {
    name: "اسم المستخدم",
    image: "/images/user-avatar.jpg" // استبدل هذا بالمسار الفعلي للصورة
  };

  const handleLogout = () => {
    // قم بإضافة منطق تسجيل الخروج هنا
    console.log("تسجيل الخروج");
    // يمكنك إعادة توجيه المستخدم بعد تسجيل الخروج
    // router.push("/");
  };

  return (
    <div className="flex items-center gap-3 xl:gap-5 relative">
      {/* مكون البروفايل الجديد */}
      <ProfileDropdown 
        isLoggedIn={isLoggedIn}
        userData={userData}
        onLogout={handleLogout}
      />

      {/* أيقونة الإشعارات */}
      <div className="relative">
        <button 
          onClick={() => setIsNotificationsOpen(true)}
          className="p-1 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors relative"
          aria-label="Notifications"
        >
          <FiBell className="w-5 h-5 text-gray-700 hover:text-[#FDA210] active:text-[#787a79] hover:scale-110 active:scale-95 transition-all duration-300" />
          <span className="absolute -top-3 -right-3 w-5 h-5 bg-Revibe rounded-full text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>
      </div>

      {/* أيقونة المفضلة - تم تعديلها للانتقال إلى صفحة المفضلة */}
      <div className="relative">
        <Link href="/wishlist">
          <button 
            className="p-1 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors relative"
            aria-label="Favorites"
          >
            <FiHeart className="w-5 h-5 text-gray-700 hover:text-[#FDA210] active:text-[#787a79] hover:scale-110 active:scale-95 transition-all duration-300" />
            {wishlist.length > 0 && (
              <span className="absolute -top-3 -right-3 w-5 h-5 bg-Revibe rounded-full text-white text-xs flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
        </Link>
      </div>

      {/* أيقونة السلة */}
      <div className="relative">
        <button 
          onClick={() => setIsCartOpen((prev) => !prev)}
          className="p-1 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors relative"
          aria-label="Cart"
        >
          <FiShoppingCart className="w-5 h-5 text-gray-700 hover:text-[#FDA210] active:text-[#787a79] hover:scale-110 active:scale-95 transition-all duration-300" />
          <span className="absolute -top-3 -right-3 w-5 h-5 bg-Revibe rounded-full text-white text-xs flex items-center justify-center">
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