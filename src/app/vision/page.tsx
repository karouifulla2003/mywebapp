// app/vision/page.tsx
import React from 'react';
import { FiZap, FiUsers, FiGlobe, FiAward, FiBook, FiHeart } from 'react-icons/fi'; // Added more icons

export default function VisionPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FDA619] to-[#3FA878] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Vision</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Shaping the future of e-commerce through innovation and technology
          </p>
        </div>
      </section>

      {/* Main Vision Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What We Believe In
            </h2>
            
            <div className="prose prose-lg text-gray-700 mb-16">
              <p>
                At the heart of our company lies a bold vision: to revolutionize the way 
                people buy and sell online. We're building more than just a platform - 
                we're creating an ecosystem where businesses of all sizes can thrive.
              </p>
              <p>
                Our journey began with a simple idea: e-commerce should be accessible, 
                intuitive, and rewarding for everyone. Today, that idea has grown into 
                a comprehensive vision that guides everything we do.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <VisionCard 
                icon={<FiZap className="w-8 h-8" />} 
                title="Innovation"
                description="We constantly push boundaries to deliver cutting-edge solutions"
              />
              <VisionCard 
                icon={<FiUsers className="w-8 h-8" />}
                title="Community"
                description="Building a network that empowers sellers and delights buyers"
              />
              <VisionCard 
                icon={<FiGlobe className="w-8 h-8" />}
                title="Global Impact"
                description="Connecting markets worldwide with seamless technology"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section - Completely different from Future Goals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <TestimonialCard 
                name="Sarah Johnson"
                role="Small Business Owner"
                quote="This platform transformed my business in just 6 months. Sales have increased by 200% and I've reached customers I never thought possible."
                icon={<FiAward className="w-6 h-6" />}
              />
              <TestimonialCard 
                name="Michael Chen"
                role="Enterprise Partner"
                quote="The integration process was seamless, and the analytics tools provided insights that directly impacted our strategy for the better."
                icon={<FiBook className="w-6 h-6" />}
              />
              <TestimonialCard 
                name="Elena Rodriguez"
                role="Startup Founder"
                quote="As a new business, we needed a solution that could scale with us. This platform provided exactly that, growing alongside our expanding customer base."
                icon={<FiHeart className="w-6 h-6" />}
              />
              <TestimonialCard 
                name="David Okonkwo"
                role="International Seller"
                quote="Breaking into new markets was our biggest challenge until we found this platform. Now we ship to 27 countries with full payment and language support."
                icon={<FiGlobe className="w-6 h-6" />}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Reusable Vision Card Component
function VisionCard({ icon, title, description }: { 
  icon: React.ReactNode,
  title: string,
  description: string 
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
      <div className="text-Revibe mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Testimonial Card Component
function TestimonialCard({ name, role, quote, icon }: {
  name: string,
  role: string,
  quote: string,
  icon: React.ReactNode
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
      <div className="flex items-center mb-4">
        <div className="bg-gray-200 p-3 rounded-full text-orange-600 mr-4">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-lg">{name}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
      <blockquote className="text-gray-700 italic border-l-4 border-orange-400 pl-4">
        "{quote}"
      </blockquote>
    </div>
  );
}