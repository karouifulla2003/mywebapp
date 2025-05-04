'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useCart from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

interface ProductCardProps {
  id: number;
  name: string;
  price: number | string;
  discount_price: number | string | null;
  stock: number;
  category_id: number;
  is_featured: boolean;
  is_active: boolean;
  description: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  mainImage: string;
  hoverImage: string; // أصبحت إجبارية الآن
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  discount_price,
  stock,
  category_id,
  is_featured,
  is_active,
  description,
  rating = 0,
  reviewCount = 0,
  isNew = false,
  isBestseller = false,
  mainImage,
  hoverImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addProduct } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [inWishlist, setInWishlist] = useState(isInWishlist(id));
  const [imageError, setImageError] = useState(false);

  // دالة مساعدة لتحويل القيم إلى أرقام بشكل آمن
  const safeNumber = (value: unknown, defaultValue = 0): number => {
    if (typeof value === 'number') return value;
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  };

  // تحويل الأسعار
  const numericPrice = safeNumber(price);
  const numericDiscountPrice = discount_price !== null ? safeNumber(discount_price) : null;
  
  const displayPrice = numericDiscountPrice !== null ? numericDiscountPrice : numericPrice;
  const hasDiscount = numericDiscountPrice !== null && numericDiscountPrice < numericPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addProduct({
      id,
      name,
      price: displayPrice,
      image: mainImage,
      quantity: 1,
    });
  };
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(id);
      setInWishlist(false);
    } else {
      addToWishlist({
        id,
        name,
        price: displayPrice,
        image: mainImage,
      });
      setInWishlist(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden h-full flex flex-col group">
      <Link 
        href={`/product/${id}`}
        className="flex flex-col h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product image container with hover effects */}
        <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
          {/* Product badges */}
          <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
            {hasDiscount && numericDiscountPrice !== null && (
              <span className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                {Math.round(((numericPrice - numericDiscountPrice) / numericPrice) * 100)}% OFF
              </span>
            )}
            {isNew && (
              <span className="bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                NEW
              </span>
            )}
            {isBestseller && (
              <span className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                BESTSELLER
              </span>
            )}
            {is_featured && (
              <span className="bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                FEATURED
              </span>
            )}
          </div>
          
          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 z-20 bg-white/80 hover:bg-white rounded-full p-2 transition-colors duration-300 shadow-sm"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {inWishlist ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
          
          {/* Main Image with hover effects */}
          <div className="relative w-full h-full transition-all duration-500 transform group-hover:scale-110">
            <Image 
              src={mainImage} 
              alt={name} 
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-opacity duration-500 group-hover:opacity-0"
              onError={() => setImageError(true)}
              priority
            />
            
            {/* Hover Image with effects */}
            <Image 
              src={hoverImage} 
              alt={name} 
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            />
          </div>
        </div>
        
        {/* Product info */}
        <div className="flex flex-col gap-1 p-4 flex-grow">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium text-gray-800 line-clamp-2 flex-grow">{name}</h3>
            <div className="flex flex-col items-end shrink-0">
              <span className="font-semibold text-gray-900">
                ${displayPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-500 line-through">
                  ${numericPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{description}</p>
          
          {/* Rating stars */}
          {rating > 0 && (
            <div className="flex items-center gap-1 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500">({reviewCount})</span>
            </div>
          )}
        </div>
      </Link>
      
      {/* Add to cart button */}
      <button 
        onClick={handleAddToCart}
        disabled={!is_active || stock <= 0}
        className={`mx-4 mb-4 mt-auto rounded-full ring-1 ring-Revibe text-Revibe w-auto py-2 px-6 text-sm hover:bg-Revibe hover:text-white transition-colors duration-300 ${
          (!is_active || stock <= 0) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;