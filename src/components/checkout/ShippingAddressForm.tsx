// src/components/checkout/ShippingAddressForm.tsx
"use client";

import React from 'react';

export const ShippingAddressForm = ({ shippingAddress, setShippingAddress, useAsBilling, setUseAsBilling }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="shipping-address mb-8 p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">عنوان الشحن</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">الاسم الأول</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={shippingAddress.firstName || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">اسم العائلة</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={shippingAddress.lastName || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="streetAddress" className="block text-sm font-medium mb-1">العنوان</label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={shippingAddress.streetAddress || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-1">المدينة</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingAddress.city || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium mb-1">المنطقة/المحافظة</label>
          <input
            type="text"
            id="state"
            name="state"
            value={shippingAddress.state || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium mb-1">الرمز البريدي</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={shippingAddress.postalCode || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1">الدولة</label>
          <select
            id="country"
            name="country"
            value={shippingAddress.country || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">اختر الدولة</option>
            <option value="SA">المملكة العربية السعودية</option>
            <option value="AE">الإمارات العربية المتحدة</option>
            <option value="EG">مصر</option>
            <option value="JO">الأردن</option>
            <option value="KW">الكويت</option>
            <option value="BH">البحرين</option>
            <option value="QA">قطر</option>
            <option value="OM">عمان</option>
            {/* يمكن إضافة المزيد من الدول حسب الحاجة */}
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="phone" className="block text-sm font-medium mb-1">رقم الهاتف</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={shippingAddress.phone || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="md:col-span-2 mt-2">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              checked={useAsBilling} 
              onChange={() => setUseAsBilling(!useAsBilling)}
              className="mr-2"
            />
            <span className="text-sm">استخدم نفس العنوان للفوترة</span>
          </label>
        </div>
      </div>
    </div>
  );
};

// Default export
export default ShippingAddressForm;
