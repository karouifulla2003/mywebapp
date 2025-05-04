// components/wishlist/WishlistItem.tsx
'use client';

import { WishlistProduct } from '@/hooks/useWishlist';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/hooks/useWishlist';

interface WishlistItemProps {
  product: WishlistProduct;
}

export default function WishlistItem({ product }: WishlistItemProps) {
  const { removeFromWishlist } = useWishlist();

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
      <div className="relative w-full h-64">
        {/* زر إزالة المنتج من المفضلة */}
        <button
          onClick={() => removeFromWishlist(product.id)}
          className="absolute top-2 right-2 z-20 p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="إزالة من المفضلة"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4E88" className="w-5 h-5">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-5.201-3.893 8.212 8.212 0 01-2.3-5.695C4.116 7.799 6.87 5.012 10.254 5.012c1.584 0 3.039.655 4.13 1.759 1.09-1.104 2.544-1.759 4.129-1.759 3.386 0 6.142 2.788 6.142 6.34 0 2.149-.813 4.073-2.3 5.694a15.233 15.233 0 01-5.201 3.893l-.022.013-.007.003-.001.001a.75.75 0 01-.704 0l-.001-.001z" />
          </svg>
        </button>
        
        <Link href={`/product/${product.id}`}>
          <div className="relative w-full h-full overflow-hidden">
            <Image 
              src={product.mainImage} 
              alt={product.name} 
              fill 
              sizes="25vw" 
              className="absolute object-cover rounded-t-md z-10 group-hover:opacity-0 transition-opacity duration-500"
            />
            <Image 
              src={product.hoverImage} 
              alt={product.name} 
              fill 
              sizes="25vw"
              className="object-cover rounded-t-md"
            />
          </div>
        </Link>
      </div>
      
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg hover:text-Revibe transition-colors duration-300">{product.name}</h3>
            <span className="font-semibold text-Revibe">{product.price}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        </Link>
        
        {/* تقييم النجوم */}
        <div className="flex gap-1 text-yellow-400 mt-2">
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
          <span className="text-xs text-gray-600 ml-1">({product.reviewCount})</span>
        </div>

        {/* زر إضافة إلى السلة */}
        <button 
          className="w-full mt-4 py-2 px-4 bg-Revibe text-white rounded-md hover:bg-Revibe/90 transition-colors duration-300 flex items-center justify-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            // هنا يمكنك إضافة وظيفة إضافة المنتج إلى السلة
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          إضافة إلى السلة
        </button>
      </div>
    </div>
  );
}