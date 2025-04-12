"use client";

import React from 'react';
import CheckoutForm from "../../components/checkout/CheckoutForm";
import OrderSummary from "../../components/checkout/OrderSummary";
import useCart from "../../hooks/useCart";

const CheckoutPage = () => {
  // استخدام خطاف سلة التسوق للحصول على البيانات الحالية
  const { 
    products, 
    subtotal, 
    shippingCost,
    discount,
    couponCode,
    removeCoupon,
    calculateTax
  } = useCart();
  
  // حساب الضريبة
  const tax = calculateTax();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">إتمام عملية الشراء</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* نموذج معلومات الدفع والشحن - يشغل عمودين */}
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        
        {/* ملخص الطلب - يشغل عمود واحد */}
        <div className="lg:col-span-1">
          <OrderSummary 
            products={products}
            subtotal={subtotal}
            shipping={shippingCost}
            tax={tax}
            discount={discount}
            couponCode={couponCode || undefined} // تحويل null إلى undefined
            onRemoveCoupon={removeCoupon}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;