"use client";
import React, { useState, useEffect } from 'react';

// مكون لعرض خطوات تتبع الشحنة
const ShippingTracking = ({ trackingNumber, carrier, estimatedDelivery, steps }) => {
  return (
    <div className="shipping-tracking p-6 border rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">تتبع الشحنة</h2>
        <div className="text-sm text-gray-500">
          <p>رقم التتبع: <span className="font-medium">{trackingNumber}</span></p>
          <p>شركة الشحن: <span className="font-medium">{carrier}</span></p>
        </div>
      </div>
      
      <div className="relative">
        {/* شريط التقدم */}
        <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
        
        {/* الخطوات */}
        <div className="space-y-8 relative z-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex">
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full mr-4 ${
                step.completed ? 'bg-green-500' : 'bg-gray-200'
              }`}>
                {step.completed ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  <span className="text-xs text-gray-600">{index + 1}</span>
                )}
              </div>
              
              <div>
                <h3 className={`font-medium ${step.completed ? 'text-black' : 'text-gray-500'}`}>
                  {step.status}
                </h3>
                <p className="text-sm text-gray-500">
                  {step.date || 'قيد الانتظار'}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-400 mt-1">{step.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-center">
        <p className="font-medium">موعد التسليم المتوقع: {estimatedDelivery}</p>
        <p className="text-gray-500 mt-1">الشحنة في الطريق!</p>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          الاتصال بخدمة العملاء
        </button>
      </div>
    </div>
  );
};

// مكون لعرض تفاصيل الطلب
const OrderDetails = ({ order }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">تفاصيل الطلب #{order.orderId}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">تاريخ الطلب</h3>
          <p>{order.orderDate}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">الحالة</h3>
          <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {order.status}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">عنوان التسليم</h3>
          <p className="text-sm">{order.shippingAddress}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">طريقة الدفع</h3>
          <p>{order.paymentMethod}</p>
        </div>
      </div>
    </div>
  );
};

export default function OrderTrackingPage({ params }) {
  const { id } = params;
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // محاكاة جلب بيانات التتبع من API
  useEffect(() => {
    // في تطبيق حقيقي، ستقوم بجلب البيانات من API
    const fetchTrackingData = async () => {
      try {
        // محاكاة طلب API باستخدام setTimeout
        // في التطبيق الحقيقي، استبدل هذا بـ fetch لـ API الخاص بك
        setTimeout(() => {
          setTrackingData({
            orderId: id,
            trackingNumber: 'TRK' + id.padStart(8, '0'),
            carrier: 'أرامكس للشحن السريع',
            estimatedDelivery: '28 أبريل 2025',
            orderDate: '21 أبريل 2025',
            status: 'قيد الشحن',
            shippingAddress: 'شارع الملك فهد، حي العليا، الرياض، المملكة العربية السعودية',
            paymentMethod: 'بطاقة ائتمان',
            steps: [
              {
                id: 1,
                status: 'تم استلام الطلب',
                date: '21 أبريل 2025 - 10:30 ص',
                description: 'تم استلام طلبك وهو قيد المعالجة',
                completed: true
              },
              {
                id: 2,
                status: 'تم تجهيز الطلب',
                date: '22 أبريل 2025 - 2:45 م',
                description: 'تم تجهيز طلبك وهو جاهز للشحن',
                completed: true
              },
              {
                id: 3,
                status: 'تم شحن الطلب',
                date: '23 أبريل 2025 - 9:15 ص',
                description: 'تم شحن طلبك وهو الآن في الطريق',
                completed: true
              },
              {
                id: 4,
                status: 'في مرحلة التوصيل',
                date: '25 أبريل 2025 - 11:20 ص',
                description: 'طلبك مع مندوب التوصيل وسيتم تسليمه قريبًا',
                completed: true
              },
              {
                id: 5,
                status: 'تم التسليم',
                date: null,
                description: 'سيتم تحديث هذه الخطوة عند تسليم طلبك',
                completed: false
              }
            ]
          });
          setLoading(false);
        }, 1500);
      } catch (err) {
        setError('عذراً، حدث خطأ أثناء جلب بيانات التتبع. يرجى المحاولة مرة أخرى لاحقاً.');
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, [id]);

  // عرض حالة التحميل
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">جاري تحميل بيانات التتبع...</p>
      </div>
    );
  }

  // عرض رسالة الخطأ
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mr-3">
              <h3 className="text-sm font-medium text-red-800">حدث خطأ</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                >
                  إعادة المحاولة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // عرض صفحة التتبع
  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">تتبع الطلب #{id}</h1>
        <p className="text-gray-600">تابع شحنتك لحظة بلحظة</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrderDetails order={trackingData} />
          <ShippingTracking 
            trackingNumber={trackingData.trackingNumber}
            carrier={trackingData.carrier}
            estimatedDelivery={trackingData.estimatedDelivery}
            steps={trackingData.steps}
          />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">المساعدة</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="ml-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                الأسئلة الشائعة
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="ml-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                التواصل عبر البريد الإلكتروني
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="ml-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                اتصل بنا
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">تفاصيل إضافية</h2>
            <div className="border-t border-gray-200 pt-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">عدد المنتجات</dt>
                  <dd className="text-sm text-gray-900 text-left">3 منتجات</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">إجمالي الطلب</dt>
                  <dd className="text-sm text-gray-900 text-left">750 ريال</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">تكلفة الشحن</dt>
                  <dd className="text-sm text-gray-900 text-left">30 ريال</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-900 font-bold">المجموع النهائي</dt>
                  <dd className="text-sm text-gray-900 font-bold text-left">780 ريال</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}