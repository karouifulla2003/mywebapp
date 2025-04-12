// ProductCard.tsx
"use client"
import Link from "next/link";
import Image from "next/image";

// تعريف واجهة للمنتج
export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  mainImage: string;
  hoverImage: string;
}

// تعريف واجهة لخصائص مكون ProductCard
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/product/${product.id}`} className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] group">
      {/* تم إضافة ظل وتأثيرات تحويم للبطاقة */}
      <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:scale-[1.02]">
        <Image 
          src={product.mainImage} 
          alt={product.name} 
          fill 
          sizes="25vw" 
          className="absolute object-cover rounded-md z-10 group-hover:opacity-0 transition-opacity duration-500 transform group-hover:scale-110"
        />
        <Image 
          src={product.hoverImage} 
          alt={product.name} 
          fill 
          sizes="25vw"
          className="object-cover rounded-md transform transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* تحسين تباعد وتنسيق المعلومات */}
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-lg">{product.name}</span>
        <span className="font-semibold text-Revibe text-lg">{product.price}</span>
      </div>
      <div className="text-sm text-gray-600 -mt-2">{product.description}</div>
      
      {/* إضافة تقييم النجوم */}
      <div className="flex gap-1 text-yellow-400 -mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-300">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
        </svg>
        <span className="text-xs text-gray-500 ml-1">(4.0)</span>
      </div>
      
      {/* زر إضافة إلى السلة الدائم */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          console.log(`Adding ${product.name} to cart`);
        }}
        className="rounded-2xl ring-1 ring-Revibe text-Revibe w-max py-2 px-4 text-sm hover:bg-Revibe hover:text-white transition-colors duration-300 flex items-center gap-2 mt-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        Add to cart
      </button>
    </Link>
  );
};

export default ProductCard;