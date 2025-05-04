"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="flex-grow mx-4" style={{ width: '800px' }}>
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="w-5 h-5 text-[#3FA878]" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fillRule="evenodd" 
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search here..."
          name="name"
          className="pl-10 pr-4 py-2.5 w-full rounded-full border-2 border-gray-100 focus:border-[#FDA210] focus:outline-none transition-colors duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-6 bg-gradient-to-r from-[#FDA210] to-[#3FA878] text-white rounded-r-full font-medium hover:opacity-90 transition-opacity"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;