"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const CatagoryList = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const categoryNames = [
    "Fashion",
    "Electronics",
    "Home & Furniture",
    "Kitchen",
    "Toys & Games",
    "Sports & Outdoors",
    "Beauty & Personal Care"
  ];

  const imageUrls = [
    "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/255514/pexels-photo-255514.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth"
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth"
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // إضافة التمرير الأوتوماتيكي
  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);

    // // إضافة حركة التمرير التلقائي
    // const interval = setInterval(() => {
    //   if (scrollContainerRef.current) {
    //     scrollContainerRef.current.scrollBy({
    //       left: 1,
    //       behavior: "smooth"
    //     });
    //   }
    // }, 30); // كل 30 ملي ثانية، تحرك بمقدار صغير جداً

    return () => {
      window.removeEventListener('resize', handleScroll);
      // clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative px-4 py-6">
      {showLeftButton && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-100 focus:outline-none"
          aria-label="تمرير للخلف"
          type="button"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}

      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
        onScroll={handleScroll}
      >
        {categoryNames.map((name, index) => (
          <Link 
            key={index}
            href={`/list?cal=${name.replace(/\s+/g, '-')}`} 
            className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 group"
          >
            <div className="relative bg-slate-100 w-full h-64 overflow-hidden rounded-2xl border border-gray-200 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
              <Image 
                src={imageUrls[index]} 
                alt={`صورة فئة ${name}`}
                fill
                sizes="20vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80"></div>
              <div className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                {name}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {showRightButton && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-100 focus:outline-none"
          aria-label="تمرير للأمام"
          type="button"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
};

export default CatagoryList;