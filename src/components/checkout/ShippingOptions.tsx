// src/components/checkout/ShippingOptions.tsx
"use client";

import React from 'react';

// خيارات الشحن المتاحة
const shippingMethods = [
  { id: 'standard', name: 'الشحن القياسي', price: 9.99, days: '٣-٥' },
  { id: 'express', name: 'الشحن السريع', price: 19.99, days: '١-٢' },
  { id: 'free', name: 'الشحن المجاني', price: 0, days: '٥-٧', minOrder: 200 },
  { id: 'international', name: 'الشحن الدولي', price: 29.99, days: '٧-١٤' }
];

const ShippingOptions = ({ selectedMethod, setSelectedMethod, orderTotal }) => {
  return (
    <div className="shipping-options mb-8 p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">طريقة الشحن</h2>
      
      <div className="space-y-3">
        {shippingMethods.map(method => {
          // تعطيل خيار الشحن المجاني إذا كان إجمالي الطلب أقل من الحد الأدنى
          const isDisabled = method.id === 'free' && orderTotal < method.minOrder;
          
          return (
            <div 
              key={method.id}
              className={`border p-4 rounded-md cursor-pointer ${
                selectedMethod?.id === method.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isDisabled && setSelectedMethod(method)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    id={method.id} 
                    name="shipping-method" 
                    checked={selectedMethod?.id === method.id}
                    readOnly
                    disabled={isDisabled}
                  />
                  <label htmlFor={method.id} className="font-medium">
                    {method.name}
                    <p className="text-sm text-gray-500">
                      التوصيل خلال {method.days} أيام عمل
                    </p>
                    {method.id === 'free' && (
                      <p className="text-xs text-gray-500">
                        (للطلبات التي تزيد عن ${method.minOrder})
                      </p>
                    )}
                  </label>
                </div>
                <span className="font-semibold">
                  {method.price === 0 ? 'مجاناً' : `$${method.price.toFixed(2)}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShippingOptions;
