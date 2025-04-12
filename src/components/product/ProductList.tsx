// ProductList.tsx
"use client"
import { Product } from "./ProductCard";
import ProductCard from "./ProductCard";

const ProductList = () => {
  // إنشاء مصفوفة من بيانات المنتجات
  const products: Product[] = [
    {
      id: 1,
      name: "Latest Model Digital Camera",
      price: "6000 Da",
      description: "A high-tech digital camera with the newest features and best performance",
      mainImage: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      hoverImage: "https://images.pexels.com/photos/12629754/pexels-photo-12629754.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
      id: 2,
      name: "Anti-Acne Skincare Serum",
      price: "3200 Da",
      description: "A special skincare liquid designed to fight acne and improve skin health.",
      mainImage: "https://images.pexels.com/photos/7353843/pexels-photo-7353843.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      hoverImage: "https://images.pexels.com/photos/12538690/pexels-photo-12538690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      name: "Winter Wool Sweater",
      price: "1800 Da",
      description: "A warm and cozy sweater made of wool, perfect for cold weather.",
      mainImage: "https://images.pexels.com/photos/14641423/pexels-photo-14641423.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      hoverImage: "https://images.pexels.com/photos/6630846/pexels-photo-6630846.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
      id: 4,
      name: "iPhone 14 Pro Max",
      price: "190 000 Da",
      description: "Apple's premium smartphone with advanced features and top performance.",
      mainImage: "https://images.pexels.com/photos/18525573/pexels-photo-18525573/free-photo-of-nature-main-apple-pomme.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      hoverImage: "https://images.pexels.com/photos/13399477/pexels-photo-13399477.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
      id: 5,
      name: "Trendy Denim Caps",
      price: "2850 Da",
      description: "Fashionable caps made of denim fabric, perfect for a casual and stylish look.",
      mainImage: "https://i.pinimg.com/736x/c2/9f/f4/c29ff4bace53b4ac8fb66d3d54c28bc8.jpg",
      hoverImage: "https://i.pinimg.com/736x/ed/a5/e4/eda5e4d79edc732d74f0ca4fe25b9ea6.jpg"
    },
    {
      id: 6,
      name: "Authentic Wooden Utensils",
      price: "5500 Da",
      description: "High-quality kitchen utensils crafted from natural wood, durable and elegant.",
      mainImage: "https://i.pinimg.com/736x/ac/e6/7b/ace67b0f65ff97fa743431d4b8f7b9db.jpg",
      hoverImage: "https://i.pinimg.com/736x/65/f2/84/65f284700be1e43189629dace88e8ec5.jpg"
    },
    {
      id: 7,
      name: "Mountain Hiking Boots",
      price: "4000 Da",
      description: "Strong and comfortable boots designed for hiking and outdoor adventures.",
      mainImage: "https://i.pinimg.com/736x/1e/7c/d4/1e7cd44b39f14693851c1680e46cc839.jpg",
      hoverImage: "https://i.pinimg.com/736x/fb/94/3f/fb943f80e8a1f8ad9b634592aabff2da.jpg"
    },
    {
      id: 8,
      name: "Fun Octopus Toy",
      price: "1500 DA",
      description: "An entertaining toy designed like an octopus, bringing joy and excitement.",
      mainImage: "https://i.pinimg.com/736x/21/ff/af/21ffafc671d9050bafb220cfdceb8c39.jpg",
      hoverImage: "https://i.pinimg.com/736x/d1/c2/92/d1c29250cf9d542511b1db2922b67b4b.jpg"
    }
  ];

  // تحسين تباعد وتنسيق الشبكة
  return (
    <div className="mt-16 flex gap-x-10 gap-y-20 flex-wrap px-4 sm:px-6 lg:px-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;