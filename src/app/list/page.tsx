"use client";
import { useEffect, useState } from 'react';
import Filter from "@/components/filters/Filter";
import ProductList from "@/components/product/ProductList";
import Image from "next/image";

// تعريف نوع البيانات لتسهيل التعامل معها
import { Product } from "@/components/product/ProductList";

const ListPage = () => {
  // التأكد من أن نوع البيانات صحيح
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // جلب المنتجات عند تحميل الصفحة
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('فشل في جلب المنتجات');
        }
        
        const data = await response.json();
        
        // تصحيح 1: تسجيل البيانات المستلمة بشكل كامل
        console.log("البيانات المستلمة:", data);
        
        // تصحيح 2: التحقق من هيكل البيانات والتعامل مع الحالات المختلفة
        if (data && Array.isArray(data)) {
          // الحالة 1: البيانات هي مصفوفة مباشرة
          setProducts(data);
        } else if (data && data.products && Array.isArray(data.products)) {
          // الحالة 2: البيانات مغلفة في كائن به خاصية products
          setProducts(data.products);
        } else if (data && typeof data === 'object') {
          // الحالة 3: البيانات هي كائن يحتوي على المنتجات بشكل آخر
          // محاولة تحويل الكائن إلى مصفوفة
          const productsArray = Object.values(data).filter(item => 
            typeof item === 'object' && item !== null
          );
          
          if (productsArray.length > 0) {
            setProducts(productsArray as Product[]);
          } else {
            console.error("لم يتم العثور على منتجات صالحة في البيانات:", data);
            setError("تنسيق البيانات غير متوافق");
          }
        } else {
          console.error("لم يتم العثور على بيانات صالحة:", data);
          setError("تنسيق البيانات غير متوافق");
        }
      } catch (err: any) {
        console.error("خطأ في جلب المنتجات:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // تصحيح 3: التحقق من حالة المنتجات قبل التمرير
  useEffect(() => {
    if (products.length > 0) {
      console.log("تم تحميل المنتجات بنجاح:", products);
    }
  }, [products]);

  return (
    <div className='relative pt-28 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
      {/* حملة إعلانية */}
      <div className="hidden bg-pink-300 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">تسوق معنا لاكتشاف أحدث المنتجات!</h1>
          <button className="rounded-3xl bg-pink-900 text-white w-max py-3 px-5 text-sm">تسوق الآن</button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      
      {/* عوامل التصفية */}
      <Filter/>
            
      {/* قائمة المنتجات */}
      <h1 className="mt-12 text-xl font-semibold">منتجاتنا لك</h1>
      
      {/* تصحيح 4: إظهار عدد المنتجات للتأكد من أنها تمر بشكل صحيح */}
      {!loading && products.length > 0 && (
        <p className="text-sm text-gray-500 mb-4">
          تم العثور على {products.length} منتج
        </p>
      )}
      
      {/* تمرير المنتجات إلى مكون ProductList مع حالات التحميل */}
      <ProductList 
        products={products} 
        isLoading={loading}
        title="" 
        emptyMessage="لا توجد منتجات متاحة حاليًا"
        layout="grid"
        columns={{ sm: 2, md: 3, lg: 3, xl: 4 }}
        showFilters={true}
      />
      
      {/* عرض رسالة الخطأ إذا حدث خطأ */}
      {error && (
        <div className="py-8 text-center text-red-500">
          <p>حدث خطأ: {error}</p>
        </div>
      )}
      
      {/* تصحيح 5: إضافة تصحيح للحالة التي تكون فيها البيانات موجودة ولكن لا تظهر */}
      {!loading && !error && products.length === 0 && (
        <div className="py-8 text-center text-yellow-500">
          <p>تم الاتصال بنجاح، ولكن لم يتم العثور على منتجات. الرجاء التحقق من قاعدة البيانات.</p>
        </div>
      )}
    </div>
  );
}

export default ListPage;