// تحديث مكون OrderSummary لتضمين معلومات الشحن
// src/components/checkout/OrderSummary.tsx
"use client";

import React from 'react';

const OrderSummary = ({ 
  products, 
  subtotal, 
  shipping, 
  tax, 
  discount, 
  couponCode, 
  onRemoveCoupon,
  shippingMethod 
}) => {
  // حساب المجموع النهائي
  const total = subtotal + shipping + tax - discount;

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">ملخص الطلب</h2>
      
      {/* قائمة المنتجات */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">المنتجات</h3>
        <ul className="space-y-2">
          {products.map(product => (
            <li key={product.id} className="flex justify-between">
              <span>{product.name} x {product.quantity}</span>
              <span>${(product.price * product.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* معلومات طريقة الشحن المختارة */}
      {shippingMethod && (
        <div className="mb-4 pb-2 border-b">
          <h3 className="font-medium mb-1">طريقة الشحن:</h3>
          <p>{shippingMethod}</p>
        </div>
      )}
      
      {/* الكوبون - إذا كان موجوداً */}
      {couponCode && (
        <div className="mb-4 pb-2 border-b">
          <div className="flex justify-between items-center">
            <span>كوبون: {couponCode}</span>
            <button 
              onClick={onRemoveCoupon}
              className="text-red-500 text-sm hover:text-red-600"
            >
              إزالة
            </button>
          </div>
        </div>
      )}
      
      {/* المبالغ */}
      <div className="space-y-2 mb-4 pb-2 border-b">
        <div className="flex justify-between">
          <span>المجموع الفرعي:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>الشحن:</span>
          <span>{shipping === 0 ? 'مجاناً' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span>الضريبة:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>الخصم:</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
      </div>
      
      {/* المجموع النهائي */}
      <div className="flex justify-between font-bold text-lg">
        <span>المجموع:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;