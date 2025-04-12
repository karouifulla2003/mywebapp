"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, Truck, CreditCard, ShoppingBag } from "lucide-react";

const images = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/14641423/pexels-photo-14641423.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    alt: "صورة المنتج الأولى"
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/6630846/pexels-photo-6630846.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    alt: "صورة المنتج الثانية"
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/30263570/pexels-photo-30263570/free-photo-of-pulls-plies-confortables-aux-couleurs-chaudes-de-l-automne.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    alt: "صورة المنتج الثالثة"
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/6630834/pexels-photo-6630834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "صورة المنتج الرابعة"
  },
];

const ProductImages = () => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loadedImages, setLoadedImages] = useState([images[0].url]);

  // تحميل الصور مسبقاً
  useEffect(() => {
    const preloadImages = () => {
      const newLoadedImages = [...loadedImages];
      images.forEach(img => {
        if (!loadedImages.includes(img.url)) {
          const image = new window.Image();
          image.src = img.url;
          newLoadedImages.push(img.url);
        }
      });
      setLoadedImages(newLoadedImages);
    };
    preloadImages();
  }, []);

  // التنقل بين الصور
  const goToNextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsZoomed(false);
  };

  const goToPreviousImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  // تبديل وضع التكبير
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // معالج حدث الشراء
  const handleBuyNow = () => {
    alert("جاري الانتقال إلى صفحة الشراء");
    // يمكن هنا إضافة المنطق الخاص بالانتقال إلى صفحة الشراء
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      

      {/* العرض الرئيسي للصور */}
      <div className="relative">
        <div className={`h-[500px] relative rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`} onClick={toggleZoom}>
          <Image
            src={images[index].url}
            alt={images[index].alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover rounded-md transition-all duration-500 ${isZoomed ? "scale-150" : "scale-100"}`}
            priority
          />
        </div>

        {/* أيقونة التكبير */}
        <button 
          className="absolute top-4 right-4 bg-white bg-opacity-60 p-2 rounded-full shadow-md hover:bg-opacity-80 transition-all z-10"
          onClick={toggleZoom}
          aria-label={isZoomed ? "تصغير الصورة" : "تكبير الصورة"}
        >
          <ZoomIn size={20} />
        </button>

        {/* أزرار التنقل */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 p-2 rounded-full shadow-md hover:bg-opacity-80 transition-all z-10"
          onClick={goToPreviousImage}
          aria-label="الصورة السابقة"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 p-2 rounded-full shadow-md hover:bg-opacity-80 transition-all z-10"
          onClick={goToNextImage}
          aria-label="الصورة التالية"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* الصور المصغرة */}
      <div className="flex justify-between gap-3 mt-4">
        {images.map((img, i) => (
          <div
            className={`relative w-1/4 h-24 sm:h-32 cursor-pointer transition-all duration-300 overflow-hidden rounded-md ${
              index === i
                ? "ring-2 ring-offset-2 ring-blue-500"
                : "opacity-70 hover:opacity-100"
            }`}
            key={img.id}
            onClick={() => {
              setIndex(i);
              setIsZoomed(false);
            }}
            aria-label={`عرض ${img.alt}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="20vw"
              className="object-cover rounded-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* عداد الصور */}
      <div className="text-center mt-2 text-sm text-gray-500 rtl:font-sans">
        {index + 1} / {images.length}
      </div>
    </div>
  );
};

export default ProductImages;