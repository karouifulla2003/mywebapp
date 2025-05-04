'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';

export interface Product {
  id: number;
  name: string;
  price: number;
  discount_price: number | null;
  stock: number;
  category_id: number;
  is_featured: boolean;
  is_active: boolean;
  description: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

interface ProductListProps {
  products?: Product[];
  title?: string;
  emptyMessage?: string;
  layout?: 'grid' | 'list';
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  showFilters?: boolean;
  isLoading?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products = [],
  title = 'Products',
  emptyMessage = 'No products found',
  layout = 'grid',
  columns = { sm: 2, md: 3, lg: 4, xl: 5 },
  showFilters = false,
  isLoading = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>('default');
  
  // استخدام useMemo بدلاً من useState وuseEffect لتصفية وترتيب المنتجات
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }

    let result = [...products];

    // Filter by category
    if (selectedCategory !== null) {
      result = result.filter(product => product.category_id === selectedCategory);
    }

    // Sort products
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
        break;
      case 'featured':
        result.sort((a, b) => (b.is_featured === a.is_featured ? 0 : b.is_featured ? 1 : -1));
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategory, sortOption]);

  // استخدام useMemo لحساب الفئات المتاحة
  const categories = useMemo(() => {
    return Array.from(
      new Set((products || []).map(product => product.category_id))
    ).sort((a, b) => a - b);
  }, [products]);

  const getGridClasses = () => {
    const gridClasses = ['grid', 'gap-4'];
    gridClasses.push('grid-cols-1');
    if (columns?.sm) gridClasses.push(`sm:grid-cols-${columns.sm}`);
    if (columns?.md) gridClasses.push(`md:grid-cols-${columns.md}`);
    if (columns?.lg) gridClasses.push(`lg:grid-cols-${columns.lg}`);
    if (columns?.xl) gridClasses.push(`xl:grid-cols-${columns.xl}`);
    return gridClasses.join(' ');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className={getGridClasses()}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg h-72 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">{title}</h2>

        {showFilters && (
          <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row gap-2">
      


          </div>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className={getGridClasses()}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              discount_price={product.discount_price}
              stock={product.stock}
              category_id={product.category_id}
              is_featured={product.is_featured}
              is_active={product.is_active}
              description={product.description}
              rating={product.rating}
              reviewCount={product.reviewCount}
              isNew={product.isNew}
              isBestseller={product.isBestseller} mainImage={''} hoverImage={''}            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;