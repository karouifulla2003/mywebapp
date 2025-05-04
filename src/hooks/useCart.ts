// src/hooks/useCart.ts
"use client";

import { useState, useEffect } from 'react';

const useCart = () => {
  // حالة منتجات السلة
  const [products, setProducts] = useState([
    // بيانات افتراضية للعرض - استبدلها بمنطق الاسترجاع من التخزين المحلي أو API
    { id: 1, name: "قميص كلاسيكي", price: 49.99, quantity: 2 },
    { id: 2, name: "بنطلون جينز", price: 89.99, quantity: 1 }
  ]);
  
  // معلومات الشحن والتخفيض
  const [shippingCost, setShippingCost] = useState(9.99);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState(null);
  
  // حساب المجموع الفرعي
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  
  // تحديث طريقة الشحن
  const updateShippingMethod = (method) => {
    if (method) {
      setShippingCost(method.price);
    }
  };
  
  // إضافة منتج إلى السلة
  const addProduct = (product) => {
    const existingProduct = products.find(p => p.id === product.id);
    
    if (existingProduct) {
      // إذا كان المنتج موجوداً بالفعل، قم بزيادة الكمية
      setProducts(products.map(p => 
        p.id === product.id 
          ? { ...p, quantity: p.quantity + (product.quantity || 1) }
          : p
      ));
    } else {
      // إضافة المنتج الجديد
      setProducts([...products, { ...product, quantity: product.quantity || 1 }]);
    }
  };
  
  // إزالة منتج من السلة
  const removeProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };
  
  // تحديث كمية منتج
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeProduct(productId);
      return;
    }
    
    setProducts(products.map(p => 
      p.id === productId ? { ...p, quantity } : p
    ));
  };
  
  // تطبيق كوبون خصم
  const applyCoupon = (code) => {
    // في تطبيق حقيقي، ستتحقق من صلاحية الكوبون عبر API
    // هذا مثال بسيط
    
    if (code === 'DISCOUNT20') {
      setDiscount(subtotal * 0.2); // خصم 20%
      setCouponCode(code);
      return true;
    }
    
    if (code === 'FREESHIP') {
      setShippingCost(0);
      setCouponCode(code);
      return true;
    }
    
    return false;
  };
  
  // إزالة الكوبون
  const removeCoupon = () => {
    setDiscount(0);
    setCouponCode(null);
    
    // إعادة تكلفة الشحن الافتراضية إذا كان الكوبون للشحن المجاني
    if (couponCode === 'FREESHIP') {
      setShippingCost(9.99);
    }
  };
  
  // حساب الضريبة (مثال: 15% ضريبة القيمة المضافة)
  const calculateTax = () => {
    return subtotal * 0.15;
  };
  
  // احفظ السلة في التخزين المحلي عند تغييرها
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({
      products,
      couponCode,
      discount
    }));
  }, [products, couponCode, discount]);
  
  // استرجع السلة من التخزين المحلي عند تحميل الصفحة
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setProducts(parsedCart.products || []);
        setCouponCode(parsedCart.couponCode || null);
        setDiscount(parsedCart.discount || 0);
      } catch (error) {
        console.error('Error parsing cart from localStorage', error);
      }
    }
  }, []);

  return {
    products,
    subtotal,
    shippingCost,
    discount,
    couponCode,
    addProduct,
    removeProduct,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    calculateTax,
    updateShippingMethod
  };
};

export default useCart;