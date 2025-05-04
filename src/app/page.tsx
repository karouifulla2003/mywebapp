"use client";
import { useEffect, useState } from "react";
import Banner from "@/components/layout/Banner";
import Slider from "@/components/ui/Slider";
import CatagoryList from "@components/product/CatagoryList";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // إضافة رقم تعريف عشوائي لتجنب التخزين المؤقت
        const response = await fetch(`/api/products?nocache=${Date.now()}`);
        
        if (!response.ok) {
          // محاولة الحصول على رسالة الخطأ من الاستجابة
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `فشل الطلب مع الكود ${response.status}`);
        }
        
        const data = await response.json();
        console.log("البيانات التي تم استلامها:", data);
        setProducts(data.products || []);
      } catch (err) {
        console.error("حدث خطأ أثناء جلب المنتجات:", err.message);
        setError(err.message);
        
        // محاولة إعادة الاتصال بعد فترة قصيرة إذا فشل الاتصال (حد أقصى 3 محاولات)
        if (retryCount < 3) {
          console.log(`محاولة إعادة الاتصال ${retryCount + 1}/3...`);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 3000);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [retryCount]);
  
  return (
    <>
      <div className="">
        <Slider />
        
        {/* عرض رسالة خطأ إذا فشل جلب البيانات */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 md:mx-8 lg:mx-16 xl:mx-32 2xl:mx-64 my-4">
            <p>حدث خطأ: {error}</p>
          </div>
        )}
        
        {/* عرض مؤشر التحميل أثناء جلب البيانات */}
        {loading && (
          <div className="text-center py-4">
            <p>جاري تحميل البيانات...</p>
          </div>
        )}
        
        <div className="mt-24">
          <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mb-12">التصنيفات</h1>
          <CatagoryList />
        </div>
        
        <div className="w-full h-full">
          <Banner />
        </div>
      </div>
    </>
  );
};

export default HomePage;