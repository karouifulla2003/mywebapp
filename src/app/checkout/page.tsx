"use client";

import React, { useState } from 'react';
import CheckoutForm from "../../components/checkout/CheckoutForm";
import OrderSummary from "../../components/checkout/OrderSummary";

import { ShippingAddressForm } from "../../components/checkout/ShippingAddressForm";
import useCart from "../../hooks/useCart";
import ShippingOptions from '@/components/checkout/ShippingOptions';

const CheckoutPage = () => {
  // استخدام خطاف سلة التسوق للحصول على البيانات الحالية
  const { 
    products, 
    subtotal, 
    shippingCost,
    discount,
    couponCode,
    removeCoupon,
    calculateTax,
    updateShippingMethod
  } = useCart();
  
  // إضافة حالة للعنوان ومعلومات الشحن
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: ''
  });
  
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [useAsBilling, setUseAsBilling] = useState(true);
  
  // تحديث طريقة الشحن عند الاختيار
  const handleShippingMethodChange = (method) => {
    setSelectedShippingMethod(method);
    updateShippingMethod(method); // تحديث السعر في سلة التسوق
  };
  
  // حساب الضريبة
  const tax = calculateTax();

  // تنظيم عملية الدفع بمراحل
  const [checkoutStep, setCheckoutStep] = useState(1);

  const goToNextStep = () => {
    setCheckoutStep(prevStep => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setCheckoutStep(prevStep => prevStep - 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">إتمام عملية الشراء</h1>
      
      {/* خطوات عملية الدفع */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex-1 text-center pb-2 ${checkoutStep >= 1 ? 'border-b-2 border-blue-500 font-semibold' : 'border-b text-gray-500'}`}>
            معلومات الشحن
          </div>
          <div className={`flex-1 text-center pb-2 ${checkoutStep >= 2 ? 'border-b-2 border-blue-500 font-semibold' : 'border-b text-gray-500'}`}>
            طريقة الدفع
          </div>
          <div className={`flex-1 text-center pb-2 ${checkoutStep >= 3 ? 'border-b-2 border-blue-500 font-semibold' : 'border-b text-gray-500'}`}>
            مراجعة الطلب
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* نموذج معلومات الشحن والدفع - يشغل عمودين */}
        <div className="lg:col-span-2">
          {checkoutStep === 1 && (
            <>
              <ShippingAddressForm 
                shippingAddress={shippingAddress} 
                setShippingAddress={setShippingAddress}
                useAsBilling={useAsBilling}
                setUseAsBilling={setUseAsBilling}
              />
              
              <ShippingOptions 
                selectedMethod={selectedShippingMethod}
                setSelectedMethod={handleShippingMethodChange}
                orderTotal={subtotal}
              />
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={goToNextStep}
                  disabled={!selectedShippingMethod || !shippingAddress.firstName}
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                >
                  متابعة لطريقة الدفع
                </button>
              </div>
            </>
          )}
          
          {checkoutStep === 2 && (
            <>
              <CheckoutForm />
              
              <div className="mt-6 flex justify-between">
                <button 
                  onClick={goToPreviousStep}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  العودة لمعلومات الشحن
                </button>
                
                <button 
                  onClick={goToNextStep}
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  مراجعة الطلب
                </button>
              </div>
            </>
          )}
          
          {checkoutStep === 3 && (
            <>
              <div className="space-y-6">
                <div className="p-4 border rounded-md">
                  <h3 className="font-semibold mb-2">عنوان الشحن</h3>
                  <p>
                    {shippingAddress.firstName} {shippingAddress.lastName}<br/>
                    {shippingAddress.streetAddress}<br/>
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}<br/>
                    {shippingAddress.country}
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-semibold mb-2">طريقة الشحن</h3>
                  <p>
                    {selectedShippingMethod?.name} - ${selectedShippingMethod?.price.toFixed(2)}<br/>
                    وقت التوصيل المتوقع: {selectedShippingMethod?.days} أيام عمل
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-semibold mb-2">المنتجات</h3>
                  <ul className="divide-y">
                    {products.map(product => (
                      <li key={product.id} className="py-2 flex justify-between">
                        <span>{product.name} x {product.quantity}</span>
                        <span>${(product.price * product.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button 
                  onClick={goToPreviousStep}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  العودة لطريقة الدفع
                </button>
                
                <button 
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  تأكيد الطلب
                </button>
              </div>
            </>
          )}
        </div>
        
        {/* ملخص الطلب - يشغل عمود واحد */}
        <div className="lg:col-span-1">
          <OrderSummary 
            products={products}
            subtotal={subtotal}
            shipping={selectedShippingMethod?.price || shippingCost}
            tax={tax}
            discount={discount}
            couponCode={couponCode || undefined}
            onRemoveCoupon={removeCoupon}
            shippingMethod={selectedShippingMethod?.name}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;