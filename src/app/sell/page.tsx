"use client"
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SellComponent from "@/components/sell/sell";
import Link from "next/link";
import SellerGuideComponent from "@/components/sell/seller_guide";

export default function CombinedSellPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState<"sell" | "guide">("sell");

  useEffect(() => {
    const guideParam = searchParams.get('guide');
    
    if (guideParam === "true") {
      setActivePage("guide");
      document.title = "Seller Guide - Revibe";
    } else {
      setActivePage("sell");
      document.title = "Sell Products - Revibe";
    }
  }, [pathname, searchParams]);

  const renderNavigation = () => (
    <div className="container mx-auto px-4 pt-16 pb-4">
      <div className="max-w-4xl mx-auto flex border-b border-gray-200">
        <Link 
          href="/sell" 
          className={`px-6 py-3 text-sm font-medium ${
            activePage === "sell" 
              ? "border-b-2 border-[#FDA210] text-[#FDA210]" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Sell Product
        </Link>
        <Link 
          href="/sell?guide=true"
          className={`px-6 py-3 text-sm font-medium ${
            activePage === "guide" 
              ? "border-b-2 border-[#FDA210] text-[#FDA210]" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Seller Guide
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {renderNavigation()}
      
      {activePage === "sell" ? (
        <SellComponent />
      ) : (
        <div className="pt-4 pb-16 min-h-screen bg-gray-50">
          <div className="container mx-auto px-4">
            <SellerGuideComponent />
          </div>
        </div>
      )}
    </>
  );
}