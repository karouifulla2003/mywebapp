'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductImagesProps {
  images: string[];
  productName: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images, productName }) => {
  const [mainImage, setMainImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("صور المنتج:", images);
    if (images && images.length > 0) {
      setMainImage('/placeholder-product.jpg');
    } else {
      // Default image if no images are provided
      setMainImage('/placeholder-product.jpg');
    }
    setLoading(false);
  }, [images]);

  const handleThumbnailClick = (image: string) => {
    setMainImage('/placeholder-product.jpg');
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="product-images w-full">
      {/* Main Image */}
      <div className="main-image-container mb-4 relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={mainImage || '/placeholder-product.jpg'}
          alt={`${productName} - Main Image`}
          fill
          style={{ objectFit: 'contain' }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Thumbnails */}
      {images && images.length > 1 ? (
        <div className="thumbnails-container flex gap-2 mt-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail-item cursor-pointer relative w-20 h-20 border-2 rounded-md overflow-hidden ${
                mainImage === image ? 'border-blue-500' : 'border-gray-200'
              }`}
              onClick={() => handleThumbnailClick(image)}
            >
              <Image
                src={mainImage || '/placeholder-product.jpg'}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="80px"
              />
            </div>
          ))}
        </div>
      ) : null}
      
      {/* Image Controls for zooming can be added here in future */}
      <div className="image-controls mt-4 flex justify-end">
        <button 
          className="text-sm text-gray-600 flex items-center"
          onClick={() => {
            // Open full screen view or modal with all images (to be implemented)
            console.log('View all images clicked');
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-4 h-4 mr-1"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" 
            />
          </svg>
          View all {images?.length} images
        </button>
      </div>
    </div>
  );
};

export default ProductImages;