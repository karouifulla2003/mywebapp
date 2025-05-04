// myproject
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useForm, FieldErrors } from "@/hooks/useForm"; // استيراد useForm من الملف الصحيح

// تعريف واجهة المستخدم
interface User {
  id?: string;
  email?: string;
  storeName?: string;
  phone?: string;
  [key: string]: any; // لأي خصائص إضافية
}

// تعريف واجهة قيم النموذج
interface FormValues {
  storeName: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  logo: string;
  banner: string;
  shippingPolicy: string;
  returnPolicy: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  taxId: string;
  [key: string]: string;
}

export default function SellerProfile() {
  const { user: authUser, updateUser } = useAuth();
  // تحويل نوع المستخدم إلى النوع المعرف
  const user = authUser as User | null;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // استخدام useForm بشكل صحيح حسب التعريف في useForm.ts
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState,
    errors
  } = useForm<FormValues>({
    // تعريف القيم الافتراضية للنموذج
    storeName: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    logo: "",
    banner: "",
    shippingPolicy: "",
    returnPolicy: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    taxId: "",
  });

  useEffect(() => {
    async function loadProfile() {
      if (user?.id) {
        setIsLoading(true);
        try {
          // استبدل بالـ API الفعلي
          const response = await fetch(`/api/seller/profile?sellerId=${user.id}`);
          const profileData = await response.json();
          
          // تحديث قيم النموذج باستخدام reset
          reset(profileData);
        } catch (error) {
          console.error("فشل تحميل ملف البائع الشخصي:", error);
          // إذا فشل الـ API، استخدم بيانات المستخدم إذا كانت متوفرة
          if (user) {
            // تحديث القيم الأساسية من معلومات المستخدم
            reset({
              email: user.email || "",
              storeName: user.storeName || "",
              phone: user.phone || "",
            });
          }
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    loadProfile();
  }, [user, reset]);

  // معالج تقديم النموذج باستخدام handleSubmit من useForm
  const onSubmit = async (values: FormValues) => {
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");
    
    try {
      // استبدل بالـ API الفعلي
      await fetch(`/api/seller/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      // تحديث سياق المصادقة بمعلومات الملف الشخصي الجديدة
      if (updateUser && user) {
        updateUser({
          ...user,
          storeName: values.storeName,
          phone: values.phone,
        });
      }
      
      setSuccessMessage("تم تحديث الملف الشخصي بنجاح");
      
      // مسح رسالة النجاح بعد 3 ثواني
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("فشل تحديث الملف الشخصي:", error);
      setErrorMessage("فشل تحديث الملف الشخصي. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(field as keyof FormValues, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <div className="p-6">جاري تحميل الملف الشخصي...</div>;
  }

  return (
    <div className="p-6" dir="ltr">
      <h1 className="text-2xl font-bold mb-6">ملف البائع الشخصي</h1>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* معلومات المتجر */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">معلومات المتجر</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم المتجر*
              </label>
              <input
                {...register("storeName", { required: "اسم المتجر مطلوب" })}
                className={`w-full p-2 border rounded ${errors.storeName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.storeName && (
                <p className="text-red-500 text-xs mt-1">{errors.storeName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني*
              </label>
              <input
                {...register("email", { 
                  required: "البريد الإلكتروني مطلوب",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "البريد الإلكتروني غير صالح"
                  }
                })}
                className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم الهاتف*
              </label>
              <input
                {...register("phone", { required: "رقم الهاتف مطلوب" })}
                className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وصف المتجر
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          
          {/* صور المتجر */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شعار المتجر
              </label>
              <div className="flex items-center gap-4">
                {getValues("logo") ? (
                  <img 
                    src={getValues("logo")}
                    alt="شعار المتجر"
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">
                    <span className="text-gray-500">لا يوجد شعار</span>
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'logo')}
                  accept="image/*"
                  className="text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                صورة غلاف المتجر
              </label>
              <div className="flex items-center gap-4">
                {getValues("banner") ? (
                  <img 
                    src={getValues("banner")}
                    alt="صورة غلاف المتجر"
                    className="w-40 h-24 object-cover rounded"
                  />
                ) : (
                  <div className="w-40 h-24 bg-gray-200 flex items-center justify-center rounded">
                    <span className="text-gray-500">لا يوجد غلاف</span>
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'banner')}
                  accept="image/*"
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* معلومات العنوان */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">معلومات العنوان</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                عنوان الشارع
              </label>
              <input
                {...register("address")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المدينة
              </label>
              <input
                {...register("city")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المحافظة/المقاطعة
              </label>
              <input
                {...register("state")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الرمز البريدي
              </label>
              <input
                {...register("zipCode")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الدولة
              </label>
              <input
                {...register("country")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        
        {/* سياسات المتجر */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">سياسات المتجر</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                سياسة الشحن
              </label>
              <textarea
                {...register("shippingPolicy")}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                سياسة الإرجاع
              </label>
              <textarea
                {...register("returnPolicy")}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        
        {/* معلومات الدفع */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">معلومات الدفع</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم البنك
              </label>
              <input
                {...register("bankName")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم الحساب
              </label>
              <input
                {...register("accountNumber")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم التوجيه
              </label>
              <input
                {...register("routingNumber")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الرقم الضريبي / رقم الضريبة على القيمة المضافة
              </label>
              <input
                {...register("taxId")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving || formState.isSubmitting}
            className={`px-6 py-2 rounded ${
              isSaving || formState.isSubmitting ? 'bg-gray-400' : 'bg-blue-600'
            } text-white font-medium`}
          >
            {isSaving || formState.isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </form>
    </div>
  );
}