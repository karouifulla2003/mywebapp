"use client";
import Footer from "@/components/layout/Footer";
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <main className="flex-grow pt-24 pb-12 container mx-auto px-4">
        {/* Hero Section with Custom Gradient */}
        <section className="py-20 mb-16 text-center bg-gradient-to-r from-[#FDA619] to-[#3FA878] rounded-2xl shadow-xl">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-white mb-6">Our Company</h1>
            <p className="text-xl text-white/90 mb-8">
              We connect people and build communities to create economic opportunity for all.
            </p>
            <p className="text-lg text-white/80 mb-10">
              At our marketplace, we create pathways to connect millions of sellers and buyers worldwide. 
              Our technology empowers everyone to grow and thrive — no matter who they are or where they are.
            </p>
            <button className="px-8 py-3 bg-white text-[#3FA878] rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              Learn more →
            </button>
          </div>
        </section>

        {/* Card Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* For Sellers Card */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border-l-4 border-[#FDA619]">
            <div className="flex items-center mb-6">
              <div className="bg-[#FFF5E5] p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-[#FDA619]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">For Sellers</h2>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[#FDA619]">Reach new customers & grow your business</h3>
            <p className="text-gray-600 mb-6">
              We offer sellers the ability to grow with little barrier to entry regardless of size or location. 
              We never compete with our sellers - we win when you succeed.
            </p>
            <button className="flex items-center text-[#FDA619] font-medium hover:text-[#E69500] transition-colors">
              Learn more
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* For Buyers Card */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border-l-4 border-[#3FA878]">
            <div className="flex items-center mb-6">
              <div className="bg-[#E8F5EE] p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-[#3FA878]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">For Buyers</h2>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[#3FA878]">Explore vast inventory & unique selection</h3>
            <p className="text-gray-600 mb-6">
              Enjoy a highly personalized experience with an unparalleled selection at great value across our marketplace 
              and mobile apps.
            </p>
            <button className="flex items-center text-[#3FA878] font-medium hover:text-[#2E8B63] transition-colors">
              Learn more
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Purpose Section */}
        <section className="mb-20 text-center relative overflow-hidden py-16 rounded-2xl bg-white shadow-md">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-[#FDA619] to-[#3FA878]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FDA619] to-[#3FA878]">
              Our Purpose in Action
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Our marketplace uplifts and brings people together through commerce.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20 bg-gradient-to-br from-[#FDA619] to-[#3FA878] p-10 rounded-2xl shadow-xl text-white">
          <h2 className="text-2xl font-bold text-center mb-12">Global Scale & Reach</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "2.3B", label: "Live listings", color: "from-[#FFD700] to-[#FDA619]" },
              { value: "134M", label: "Active buyers", color: "from-[#3FA878] to-[#2E8B63]" },
              { value: "190+", label: "Global markets", color: "from-[#FDA619] to-[#3FA878]" }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:scale-105 transition-transform">
                <p className={`text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r DA{stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Sections */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Our Leaders",
              icon: "👥",
              desc: "Meet the visionaries driving the future of ecommerce.",
              link: "#leaders",
              color: "bg-[#E8F5EE] text-[#3FA878]"
            },
            {
              title: "Technology",
              icon: "💻",
              desc: "Innovative solutions powering seamless experiences.",
              link: "#tech",
              color: "bg-[#FFF5E5] text-[#FDA619]"
            },
            {
              title: "Impact",
              icon: "🌍",
              desc: "Creating opportunities and positive change worldwide.",
              link: "#impact",
              color: "bg-gradient-to-r from-[#FFF5E5] to-[#E8F5EE] text-[#3FA878]"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all group">
              <div className={`w-12 h-12 rounded-full DA{feature.color} flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 group-hover:text-[DA{index === 1 ? '#FDA619' : '#3FA878'}] transition-colors`}>
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-5">{feature.desc}</p>
              <a href={feature.link} className="text-sm font-medium flex items-center text-gray-500 hover:text-[#3FA878] transition-colors">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* News Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            Latest Company News
            <span className="ml-4 text-sm bg-[#E8F5EE] text-[#3FA878] px-3 py-1 rounded-full">Updated daily</span>
          </h2>
          
          {[
            {
              date: "Mar 19, 2025",
              category: "Company Foundation",
              title: "Foundation Board Taps Three New Leaders",
              desc: "New leaders bring diverse expertise to drive greater impact.",
              shares: ["LinkedIn", "Facebook", "Twitter"]
            },
            {
              date: "Mar 6, 2025",
              category: "Company for Charity",
              title: "Raised Over DA192 Million in 2024",
              desc: "2024 was our greatest year of charitable commerce yet.",
              shares: ["LinkedIn", "Facebook", "Twitter"]
            },
            {
              date: "Feb 26, 2025",
              category: "Earnings",
              title: "Reports Fourth Quarter 2024 Results",
              desc: "Q4 Revenue of DA2.6 billion with strong growth.",
              shares: ["LinkedIn", "Facebook", "Twitter"]
            }
          ].map((news, index) => (
            <div key={index} className="border-b border-gray-200 pb-8 mb-8 group">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <p className="text-sm text-gray-500">{news.date}</p>
                  <span className="text-xs font-medium px-2 py-1 bg-[#FFF5E5] text-[#E69500] rounded-full">{news.category}</span>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#3FA878] transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{news.desc}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    {news.shares.map((share, i) => (
                      <button key={i} className="text-sm flex items-center text-gray-500 hover:text-[#3FA878] transition-colors">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12l-4-4v3H3v2h15v3l4-4z" />
                        </svg>
                        {share}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button className="mt-6 px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-[#E8F5EE] hover:text-[#3FA878] transition-colors flex items-center mx-auto">
            View all company news
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;