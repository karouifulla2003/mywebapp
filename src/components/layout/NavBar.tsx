"use client"
import Link from "next/link";
import Menu from "./Menu";
import NavIcons from "./NavIcons";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed w-full z-50 transition-all duration-300 bg-white ${
      scrolled ? "py-2 shadow-lg" : "py-4"
    }`}>
      <div className="container mx-auto px-4 relative">
        {/* MOBILE VIEW */}
        <div className="flex items-center justify-between md:hidden relative">
          <Link href="/">
            <div className="flex items-center">
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#FDA210] via-[#3FA878] to-[#FF4E88] bg-clip-text text-transparent">
                Revibe
              </span>
            </div>
          </Link>
          <div className="p-2 rounded-full bg-gradient-to-r from-[#FDA210] to-[#3FA878]">
            <Menu />
          </div>
        </div>
        
        {/* DESKTOP VIEW */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FDA210] via-[#3FA878] to-[#FF4E88] bg-clip-text text-transparent">
              Revibe
            </span>
          </Link>

          {/* شريط البحث */}
          <div className="flex-grow mx-4" style={{ width: '550px' }}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-[#3FA878]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search here..." 
                className="pl-10 pr-4 py-2.5 w-full rounded-full border-2 border-gray-100 focus:border-[#FDA210] focus:outline-none transition-colors duration-300"
              />
            </div>
          </div>
          
          {/* الروابط - تم التعديل هنا */}
          <div className="hidden xl:flex mx-8">
            {[
              { name: "Homepage", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: "Deals", path: "/deals" },
              { name: "About", path: "/about" },
              { name: "Sell", path: "/sell" }
            ].map((item, index) => (
              <Link 
                href={item.path} 
                key={item.name}
                className="relative px-4 py-2 group overflow-hidden"
              >
                <span className={`text-gray-700 font-medium group-hover:text-[#FDA210] transition-colors duration-300`}>
                  {item.name}
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300`} 
                  style={{ 
                    backgroundColor: index % 3 === 0 ? "#FDA210" : index % 3 === 1 ? "#3FA878" : "#FF4E88" 
                  }}>
                </span>
              </Link>
            ))}
          </div>

          {/* الأيقونات */}
          <div className="flex items-center">
            <NavIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;