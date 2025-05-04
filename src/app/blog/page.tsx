"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

// نوع المنشور
interface BlogPost {
  id: number;
  title: string;
  category: 'review' | 'tip';
  excerpt: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

// بيانات المدونة (اختصرتها لثلاثة منشورات فقط)
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 10 Essential Shopping Tips for Online Buyers",
    category: 'tip',
    excerpt: "Discover the best practices for safe and efficient online shopping with these essential tips.",
    author: "Emily Johnson",
    date: "April 15, 2025",
    image: "/shopping-tips.jpg",
    tags: ["shopping", "online", "tips", "e-commerce"]
  },
  {
    id: 2,
    title: "Review: The Latest Premium Smartphone - Worth the Investment?",
    category: 'review',
    excerpt: "An in-depth analysis of the newest flagship smartphone and whether it justifies its premium price tag.",
    author: "Michael Chen",
    date: "April 10, 2025",
    image: "/smartphone-review.jpg",
    tags: ["review", "smartphone", "technology"]
  },
  {
    id: 3,
    title: "5 Essential Home Maintenance Tips Every Homeowner Should Know",
    category: 'tip',
    excerpt: "Learn these critical maintenance tasks to protect your home investment and avoid costly repairs.",
    author: "Sarah Martinez",
    date: "April 5, 2025",
    image: "/home-maintenance.jpg",
    tags: ["home", "maintenance", "tips"]
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);

  // تصفية المنشورات
  useEffect(() => {
    const filtered = blogPosts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div style={{ backgroundColor: "#FCFCFC" }} className="min-h-screen">
      {/* العنوان */}
      <div style={{ background: `linear-gradient(135deg, #FDA619 0%, #E48C00 100%)` }} className="w-full py-12">
        <h1 className="text-4xl font-bold text-center text-white">Insights & Reviews</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* شريط البحث والتصفية */}
        <div className="bg-white rounded-lg shadow-md p-4 -mt-8 mb-8 flex flex-wrap gap-2 justify-between">
          <div className="flex gap-2">
            <button 
              className="px-4 py-2 rounded-full transition-all"
              style={selectedCategory === 'all' ? {backgroundColor: "#FDA619", color: "white"} : {backgroundColor: "#F3F4F6"}}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            <button 
              className="px-4 py-2 rounded-full transition-all"
              style={selectedCategory === 'tip' ? {backgroundColor: "#FDA619", color: "white"} : {backgroundColor: "#F3F4F6"}}
              onClick={() => setSelectedCategory('tip')}
            >
              Tips
            </button>
            <button 
              className="px-4 py-2 rounded-full transition-all"
              style={selectedCategory === 'review' ? {backgroundColor: "#FDA619", color: "white"} : {backgroundColor: "#F3F4F6"}}
              onClick={() => setSelectedCategory('review')}
            >
              Reviews
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Search blogs..."
            className="px-4 py-2 border border-gray-300 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* قائمة المدونات */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg">
                <div className="relative h-40 bg-gray-200 overflow-hidden">
                  <Image 
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: post.category === 'tip' ? '#E0F7E6' : '#F3E8FF',
                        color: post.category === 'tip' ? '#166534' : '#581C87'
                      }}
                    >
                      {post.category === 'tip' ? 'Tip' : 'Review'}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">{post.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <span className="text-xs">A</span>
                      </div>
                      <span className="text-sm">{post.author}</span>
                    </div>
                    <button style={{ color: "#FDA619" }} className="text-sm font-medium">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <h3 className="text-xl font-medium text-gray-700">No blog posts found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters</p>
            <button 
              className="mt-4 px-4 py-2 rounded-full text-white"
              style={{ backgroundColor: "#FDA619" }}
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* النشرة البريدية */}
        <div className="mt-12 p-6 rounded-xl text-center" style={{ backgroundColor: "#FEF2DE" }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: "#E48C00" }}>Stay Updated</h3>
          <p className="text-gray-700 mb-4">Subscribe to our newsletter for the latest tips and reviews</p>
          <div className="flex max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-4 py-2 rounded-l-full border-0 flex-grow"
            />
            <button 
              className="px-5 py-2 rounded-r-full text-white"
              style={{ backgroundColor: "#FDA619" }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}