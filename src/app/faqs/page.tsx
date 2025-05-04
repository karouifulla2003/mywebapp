'use client';

import { useState, useEffect } from 'react';

// FAQ data model
interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

// Custom expandable component
const Disclosure = ({ 
  children, 
  buttonContent,
  defaultOpen = false
}: { 
  children: React.ReactNode, 
  buttonContent: React.ReactNode,
  defaultOpen?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center"
      >
        {buttonContent}
        <svg 
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

// Main FAQs page
export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch FAQs data from endpoint
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/faqs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs data');
        }
        
        const data = await response.json();
        setFaqs(data);
        
        // Extract unique categories with explicit type
        const uniqueCategories = Array.from(
          new Set(data.map((faq: FAQ) => faq.category))
        ) as string[];
        
        setCategories(uniqueCategories);
        
      } catch (err) {
        setError('Error loading FAQs');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  // Filter FAQs by selected category
  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  // Primary brand color
  const primaryColor = "#FDA619";

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl" style={{ color: primaryColor }}>
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Find answers to the most common questions about our products and services
        </p>
      </div>

 

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: primaryColor }}></div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="p-4 mb-8 rounded border-l-4" style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}10` }}>
          <p className="text-sm font-medium" style={{ color: primaryColor }}>{error}</p>
        </div>
      )}

      {/* FAQs list */}
      <div className="space-y-4 mt-8">
        {filteredFAQs.length === 0 && !isLoading ? (
          <p className="text-center text-gray-500">No FAQs found in this category</p>
        ) : (
          filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-white shadow-md overflow-hidden rounded-lg border-l-4" style={{ borderColor: primaryColor }}>
              <Disclosure 
                buttonContent={
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                }
              >
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </Disclosure>
            </div>
          ))
        )}
      </div>

      {/* Contact link */}
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Didn't find your answer?{' '}
          <a href="/contact_us" className="font-medium hover:underline" style={{ color: primaryColor }}>
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}

