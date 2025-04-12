"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        
        if (name) {
            router.push(`/search?q=${encodeURIComponent(name)}`);
        }
    }

    return (
        <div className="relative w-full">
            <form className="flex items-center bg-gray-100 p-2 rounded-md w-full" onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Search" 
                    name="name" 
                    className="flex-1 bg-transparent outline-none px-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <div className="flex items-center">
                    <button className="cursor-pointer mx-2" type="submit">
                        <Image src="/search.png" alt="Search" width={16} height={16} />
                    </button>
                    
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                        بحث
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;