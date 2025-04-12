"use client"
// components/Banner.js
import React from 'react';
import Image from 'next/image'; 
import { motion } from 'framer-motion'; 

const Banner = () => {
  return (
    <div className="w-full  relative left-1/2 -translate-x-1/2 mt-24 bg-gradient-to-r from-pink-400 to-purple-500 py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-8">
        {/* النص */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }} 
          className="text-white max-w-md text-center md:text-left mb-8 md:mb-0"
        >
          <h2 className="text-4xl font-bold">Special Offer!</h2>
          <p className="mt-4 text-lg">Get 20% off on all new products. Limited time only!</p>
          <button
            className="mt-8 bg-white text-blue-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105"
            aria-label="Shop Now" 
          >
            Shop Now
          </button>
        </motion.div>

    
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          className="md:block"
        >
          <Image
            src="/Banner.png" 
            alt="Special Offer" 
            width={400} 
            height={300} 
            className="rounded-lg shadow-lg" 
            priority 
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;