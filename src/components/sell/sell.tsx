"use client"
import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

interface FormData {
  title: string;
  category: string;
  condition: string;
  price: string;
  description: string;
  images: File[];
  location?: string;
}

const SellComponent = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    condition: "",
    price: "",
    description: "",
    images: []
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newImages]);
    
    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const checkApprovalStatus = () => {
    setIsCheckingStatus(true);
    // Simulate API call
    setTimeout(() => {
      const randomApproval = Math.random() > 0.5;
      setIsApproved(randomApproval);
      setIsCheckingStatus(false);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {/* Success Message */}
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your product has been submitted for review!</h2>
              <p className="text-gray-600 mb-6">
                Our team will review your listing within 24 hours. You'll receive a notification once it's approved.
              </p>
              
              {/* Approval Status Section */}
              {isApproved !== null ? (
                <div className={`p-4 rounded-lg mb-6 ${isApproved ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
                  <div className="flex items-center justify-center">
                    {isApproved ? (
                      <>
                        <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="font-medium">Approved! Your listing is now live.</span>
                      </>
                    ) : (
                      <>
                        <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        <span className="font-medium">Pending Approval. We need more information.</span>
                      </>
                    )}
                  </div>
                  {!isApproved && (
                    <p className="mt-2 text-sm">
                      Please check your email for details or contact support.
                    </p>
                  )}
                </div>
              ) : (
                <button
                  onClick={checkApprovalStatus}
                  disabled={isCheckingStatus}
                  className={`px-6 py-3 rounded-lg font-medium ${isCheckingStatus ? 'bg-gray-300 text-gray-600' : 'bg-[#3FA878] text-white hover:bg-[#2d8a62]'} transition-colors`}
                >
                  {isCheckingStatus ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Checking Status...
                    </span>
                  ) : (
                    "Check Approval Status"
                  )}
                </button>
              )}
              
              <div className="mt-6 flex justify-center space-x-4">
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Edit Listing
                </button>
                <Link 
                  href="/" 
                  className="px-6 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Page Header */}
          <div className="p-8 bg-gradient-to-r from-[#FDA210] to-[#3FA878]">
            <h1 className="text-3xl font-bold text-white">Sell your products on Revibe</h1>
            <p className="text-white mt-2 opacity-90">
              Create a new listing and start earning from the products you no longer use
            </p>
          </div>

          {/* Sell Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Title */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                  Product Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Example: Apple AirPods Pro - Excellent Condition"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDA210]"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDA210]"
                  required
                >
                  <option value="">Choose a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing & Accessories</option>
                  <option value="home">Home & Garden</option>
                  <option value="sports">Sports & Hobbies</option>
                  <option value="toys">Toys & Entertainment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="condition">
                  Product Condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDA210]"
                  required
                >
                  <option value="">Select condition</option>
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="used">Used</option>
                  <option value="for-parts">For Parts</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDA210]"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                  Your Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  placeholder="City, Region"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDA210]"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                  Product Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write a detailed description of your product. Be sure to mention features, any defects, and any important information for the buyer."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDA210]"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="images"
                    name="images"
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <div className="mx-auto w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-gray-100">
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </div>
                    <p className="text-gray-700">Drag and drop images here or click to select</p>
                    <p className="text-sm text-gray-500 mt-1">You can upload up to 8 images (PNG, JPG)</p>
                  </label>
                </div>

                {/* Image Preview */}
                {previewImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previewImages.map((src, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden h-24">
                        <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const newPreviewImages = [...previewImages];
                            newPreviewImages.splice(index, 1);
                            setPreviewImages(newPreviewImages);
                            
                            const newImages = [...formData.images];
                            newImages.splice(index, 1);
                            setFormData({...formData, images: newImages});
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#FDA210] to-[#3FA878] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                List Product for Sale
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tips for Quick Sales</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3FA878] flex items-center justify-center text-white mr-3 mt-1">✓</div>
                <p className="text-gray-600">Use clear, attractive photos from multiple angles</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3FA878] flex items-center justify-center text-white mr-3 mt-1">✓</div>
                <p className="text-gray-600">Be honest about the product condition and any defects</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3FA878] flex items-center justify-center text-white mr-3 mt-1">✓</div>
                <p className="text-gray-600">Set a competitive price based on condition and similar listings</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#3FA878] flex items-center justify-center text-white mr-3 mt-1">✓</div>
                <p className="text-gray-600">Respond quickly to buyer inquiries</p>
              </li>
            </ul>
            
            <div className="mt-6 text-center">
              <Link href="/sell?guide=true" className="text-[#3FA878] font-medium hover:underline">
                View our complete seller guide for more tips
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellComponent;