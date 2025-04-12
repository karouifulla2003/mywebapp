"use client"
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const SellerGuideComponent = () => {
  const [activeTab, setActiveTab] = useState("basics");
  
  // Sample data for promotions and statistics
  const promotions = [
    {
      id: 1,
      title: "20% discount on selling fees",
      description: "For the first three months for all new sellers",
      image: "/promo1.png"
    },
    {
      id: 2,
      title: "Free shipping for limited time",
      description: "On all orders over 100 SAR",
      image: "/promo2.avif"
    }
  ];

  const successStories = [
    {
      id: 1,
      name: "Ahmed Mohamed",
      sales: "1200+ sales",
      image: "/seller1.png"
    },
    {
      id: 2,
      name: "Sarah Abdullah",
      sales: "800+ sales",
      image: "/seller2.webp"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-[#FDA210] to-[#3FA878] text-white">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <Image 
          src="/seller-hero.webp" 
          alt="Seller Guide"
          fill
          className="object-cover"
        />
        <div className="relative z-20 p-8 h-full flex flex-col justify-center">
          <h2 className="text-3xl font-bold">Revibe Seller Center</h2>
          <p className="mt-2 text-lg">Everything you need to start selling and succeed on our platform</p>
          <div className="mt-4 flex gap-4">
            <Link href="/sell">
              <button className="px-6 py-2 bg-white text-[#FDA210] font-medium rounded-lg hover:bg-opacity-90 transition-all">
                Start Selling Now
              </button>
            </Link>
            <button className="px-6 py-2 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#FDA210] transition-all">
              Watch Intro Video
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50">
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="text-2xl font-bold text-[#FDA210]">1,200+</div>
          <div className="text-gray-600">Active Sellers</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="text-2xl font-bold text-[#3FA878]">50,000+</div>
          <div className="text-gray-600">Listed Products</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="text-2xl font-bold text-[#FDA210]">95%</div>
          <div className="text-gray-600">Customer Satisfaction</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="text-2xl font-bold text-[#3FA878]">24/7</div>
          <div className="text-gray-600">Technical Support</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Tabs Navigation */}
        <div className="md:w-1/4 bg-gray-50 p-4 border-r border-gray-200">
          <div className="sticky top-4 space-y-2">
            <button
              onClick={() => setActiveTab("basics")}
              className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg ${
                activeTab === "basics"
                  ? "bg-[#FDA210] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Selling Basics
            </button>
            <button
              onClick={() => setActiveTab("tips")}
              className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg ${
                activeTab === "tips"
                  ? "bg-[#FDA210] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Sales Tips
            </button>
            <button
              onClick={() => setActiveTab("rules")}
              className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg ${
                activeTab === "rules"
                  ? "bg-[#FDA210] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Rules & Policies
            </button>
            <button
              onClick={() => setActiveTab("faqs")}
              className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg ${
                activeTab === "faqs"
                  ? "bg-[#FDA210] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => setActiveTab("success")}
              className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg ${
                activeTab === "success"
                  ? "bg-[#FDA210] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Success Stories
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="md:w-3/4 p-6">
          {activeTab === "basics" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Selling Basics on Revibe</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#FDA210]/10 p-3 rounded-full">
                      <svg className="w-6 h-6 text-[#FDA210]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg">Create Seller Account</h4>
                  </div>
                  <p className="text-gray-600">
                    Register as a seller on our platform in minutes. All you need is basic information and a valid email.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#3FA878]/10 p-3 rounded-full">
                      <svg className="w-6 h-6 text-[#3FA878]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg">Add Your Products</h4>
                  </div>
                  <p className="text-gray-600">
                    Add your products with high-quality images and accurate descriptions. The clearer the information, the better your sales.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold text-lg mb-4">Getting Started Steps:</h4>
                <ol className="space-y-4 list-decimal list-inside">
                  <li className="text-gray-700">
                    <span className="font-medium">Create Seller Account</span>
                    <p className="text-gray-500 text-sm mt-1">Register your basic information and payment details</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Add Products</span>
                    <p className="text-gray-500 text-sm mt-1">Select product category and add clear images</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Set Pricing</span>
                    <p className="text-gray-500 text-sm mt-1">Set competitive prices based on market</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Start Selling</span>
                    <p className="text-gray-500 text-sm mt-1">After product approval, it will be visible to buyers</p>
                  </li>
                </ol>
              </div>
            </div>
          )}
          
          {activeTab === "tips" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Tips to Boost Your Sales</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                    <Image 
                      src="/product-photo-tips.webp" 
                      alt="Photo Tips"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Professional Product Photos</h4>
                  <p className="text-gray-600">
                    Use good lighting, clean background, and show product from multiple angles. Good photos increase sales by 40%.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                    <Image 
                      src="/pricing-tips.jpg" 
                      alt="Pricing Tips"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Pricing Strategies</h4>
                  <p className="text-gray-600">
                    Compare competitor prices, use psychological pricing (like 99.95 instead of 100), and offer seasonal promotions.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold text-lg mb-4">More Tips:</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#FDA210]/10 p-2 rounded-full flex-shrink-0">
                      <svg className="w-5 h-5 text-[#FDA210]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Quick Response to Inquiries</h5>
                      <p className="text-gray-500 text-sm mt-1">Buyers who get quick responses are 70% more likely to purchase</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#3FA878]/10 p-2 rounded-full flex-shrink-0">
                      <svg className="w-5 h-5 text-[#3FA878]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Quality Assurance</h5>
                      <p className="text-gray-500 text-sm mt-1">Ensure product exactly matches description to avoid returns and negative reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "success" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Seller Success Stories</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {successStories.map((seller) => (
                  <div key={seller.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image 
                          src={seller.image}
                          alt={seller.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{seller.name}</h4>
                        <p className="text-[#FDA210] font-medium">{seller.sales}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      "I started by selling some old household items, and now I have a full store on Revibe with over 500 products. The platform helped me turn my hobby into a primary source of income."
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-[#FDA210] to-[#3FA878] p-6 rounded-xl text-white">
                <h4 className="font-bold text-xl mb-2">Be the next successful seller!</h4>
                <p className="mb-4">Register now and start your e-commerce journey</p>
                <Link href="/sell">
                  <button className="px-6 py-2 bg-white text-[#FDA210] font-medium rounded-lg hover:bg-opacity-90 transition-all">
                    Start Selling Now
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Promotions Section */}
      <div className="p-6 bg-gray-50">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Current Promotions & Discounts</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {promotions.map((promo) => (
            <div key={promo.id} className="relative h-48 rounded-xl overflow-hidden">
              <Image 
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <div>
                  <h4 className="text-white font-bold text-lg">{promo.title}</h4>
                  <p className="text-white/90">{promo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerGuideComponent;