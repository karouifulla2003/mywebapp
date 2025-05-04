// hooks/useWishlist.ts
'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Product } from '@/components/product/ProductCard';

export interface WishlistProduct extends Product {
  [x: string]: ReactNode;
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);

  // استرجاع المفضلات من التخزين المحلي عند تحميل المكون
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist));
        } catch (error) {
          console.error('خطأ في تحليل بيانات المفضلة:', error);
          localStorage.removeItem('wishlist');
        }
      }
    }
  }, []);

  // حفظ المفضلات في التخزين المحلي عند تحديثها
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // التحقق ما إذا كان المنتج في المفضلة
  const isInWishlist = (productId: number): boolean => {
    return wishlist.some(item => item.id === productId);
  };

  // إضافة منتج إلى المفضلة
  const addToWishlist = (product: WishlistProduct): void => {
    if (!isInWishlist(product.id)) {
      setWishlist(prevWishlist => [...prevWishlist, product]);
    }
  };

  // إزالة منتج من المفضلة
  const removeFromWishlist = (productId: number): void => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };

  // تبديل حالة منتج في المفضلة (إضافة إذا غير موجود، إزالة إذا موجود)
  const toggleWishlist = (product: WishlistProduct): void => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // حذف جميع المنتجات من المفضلة
  const clearWishlist = (): void => {
    setWishlist([]);
  };

  return {
    wishlist,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist
  };
}