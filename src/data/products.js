// src/data/products.js
export const products = [
    {
      id: 1,
      title: "هاتف ذكي",
      description: "هاتف ذكي بمواصفات عالية",
      price: 1200,
      discountedPrice: 1100,
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      category: "electronics",
      seller: 2, // ID البائع
      stock: 50,
      rating: 4.7,
      reviews: 120,
      createdAt: "2023-05-01T00:00:00.000Z",
      isActive: true,
      features: ["شاشة 6.5 بوصة", "كاميرا 48 ميجابكسل", "بطارية 5000mAh"]
    },
    {
      id: 2,
      title: "لابتوب",
      description: "لابتوب مثالي للعمل والترفيه",
      price: 3500,
      discountedPrice: 3200,
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      category: "electronics",
      seller: 2, // ID البائع
      stock: 25,
      rating: 4.5,
      reviews: 80,
      createdAt: "2023-06-01T00:00:00.000Z",
      isActive: true,
      features: ["معالج قوي", "ذاكرة 16GB", "تخزين SSD 512GB"]
    }
  ];