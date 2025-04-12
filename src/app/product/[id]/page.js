"use client"
import Add from "@/components/ui/Add"
import CustomizeProduct from "@/components/product/CustomizeProduct"
import ProductImages from "@/components/product/ProductImages"
import ProductList from "@/components/product/ProductList"
import ProductCard from "@/components/product/ProductCard"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import ProductReviews from "@/components/product/ProductReviews";
import { useState } from "react";

const SinglePage = () => {
    // Definir los elementos del Breadcrumbs
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Fashion", href: "/category/fashion" },
    ];

    // إضافة منتج فردي للعرض باستخدام ProductCard
    const currentProduct = {
        id: 3,
        name: "Winter Wool Sweater",
        price: "1800 Da",
        description: "A warm and cozy sweater made of wool, perfect for cold weather.",
        mainImage: "https://images.pexels.com/photos/14641423/pexels-photo-14641423.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        hoverImage: "https://images.pexels.com/photos/6630846/pexels-photo-6630846.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    };

    return (
        <div className='pt-28 px-4 relative md:px-8 lg:px-16 2xl:px-64'>
            <div className="mb-6">
                <Breadcrumbs items={breadcrumbItems} />
            </div>
     
            <div className='flex flex-col lg:flex-row gap-16'>
                {/*IMG*/}
                <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                    <ProductImages/>
                </div>

                {/*TEXT*/}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    <h1 className="text-4xl font-medium">Winter Wool Sweater</h1>
                    <p className="text-gray-500 ">A warm and cozy sweater made of wool, perfect for cold weather.<br /> breathable knit made from high-quality wool, perfect for cold weather.<br /> combining comfort and classic winter fashion.!</p>
                    <div className="h-[2px] bg-gray-100"/>

                    <div className="flex items-center gap-4">
                        <h3 className="text-xl text-gray-500 line-through">2000 DA</h3>
                        <h2 className="font-medium text-2xl">1800 DA</h2>
                    </div>
                    <div className="h-[2px] bg-gray-100"/>
              
                    <CustomizeProduct/>
                    <Add/>
                    <ProductReviews productId="123" />
                </div>
            </div>

            {/* قسم "منتجات متشابهة" باستخدام ProductCard */}
            <div className="mt-16 mb-8">
                <h2 className="text-2xl font-semibold mb-6">منتجات مشابهة</h2>
                <div className="flex gap-6 overflow-x-auto pb-4">
                    <ProductCard product={currentProduct} />
                    {/* يمكن إضافة المزيد من المنتجات المشابهة هنا */}
                </div>
            </div>
            
            {/* قائمة المنتجات الكاملة */}
            <div className="my-16">
                <h2 className="text-2xl font-semibold mb-6">منتجات أخرى قد تعجبك</h2>
                <ProductList/>
            </div>
        </div>
    )
}
  
export default SinglePage