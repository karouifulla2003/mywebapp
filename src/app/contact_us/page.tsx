"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div style={{ backgroundColor: "#FCFCFC" }} className="min-h-screen">
      {/* Header Banner */}
      <div style={{ background: `linear-gradient(135deg, #FDA619 0%, #E48C00 100%)` }} className="w-full py-12">
        <h1 className="text-4xl font-bold text-center text-white">Contact Us</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FDA619">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-2">We're here to help with any questions</p>
            <a href="mailto:hello@gmail.com" style={{ color: "#FDA619" }} className="font-medium">hello@gmail.com</a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FDA619">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-2">Mon-Fri from 8am to 5pm</p>
            <a href="tel:+12345678900" style={{ color: "#FDA619" }} className="font-medium">07-93-23-18-15</a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FDA619">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-2">Wilaya Sidi Bel abbas</p>
            <p style={{ color: "#FDA619" }} className="font-medium">Algeria</p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#E48C00" }}>Send Us a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-medium">Thank you! Your message has been sent successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-white font-medium transition-colors"
                  style={{ backgroundColor: "#FDA619" }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
          
          {/* Map */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#E48C00" }}>Find Us</h2>
            
            <div className="relative w-full h-64 md:h-80 bg-gray-200 rounded-lg mb-4 overflow-hidden flex-grow">
              {/* Here you would normally use Google Maps or another map provider */}
              {/* For this example, we'll use a placeholder */}
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="mt-2 text-gray-600">Map will be displayed here</p>
                </div>
              </div>
              {/* Alternatively, you can use an iframe for Google Maps */}
              {/* 
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215280320236!2d-73.98655!3d40.748817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620160879037!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy"
                className="absolute inset-0"
              ></iframe>
              */}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Office Hours</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Monday - Friday:</p>
                  <p className="font-medium">8:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <p className="text-gray-600">Saturday:</p>
                  <p className="font-medium">10:00 AM - 2:00 PM</p>
                </div>
                <div>
                  <p className="text-gray-600">Sunday:</p>
                  <p className="font-medium">Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#E48C00" }}>Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">How quickly can I expect a response?</h3>
              <p className="text-gray-600">We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our customer service line.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Do you offer technical support?</h3>
              <p className="text-gray-600">Yes, our technical support team is available Monday through Friday from 9 AM to 6 PM. You can reach them via email or phone.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Can I schedule an in-person consultation?</h3>
              <p className="text-gray-600">Absolutely! You can request an appointment through this contact form or call our office directly to schedule a meeting.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">What's your refund policy?</h3>
              <p className="text-gray-600">We offer a 30-day money-back guarantee on all our products. Please visit our Terms & Conditions page for more details.</p>
            </div>
          </div>
        </div>
        
        {/* Social Media Section */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4" style={{ color: "#E48C00" }}>Connect With Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-colors hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FDA619" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-colors hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FDA619" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-colors hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FDA619" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-colors hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FDA619" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}