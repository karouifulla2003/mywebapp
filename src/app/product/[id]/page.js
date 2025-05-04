"use client"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Add from "@/components/ui/Add";
import CustomizeProduct from "@/components/product/CustomizeProduct";
import ProductImages from "@/components/product/ProductImages";
import ProductList from "@/components/product/ProductList";
import ProductCard from "@/components/product/ProductCard";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProductReviews from "@/components/product/ProductReviews";

const SinglePage = () => {
    const params = useParams();
    const productId = params.id;
    
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // جلب تفاصيل المنتج
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                
                // جلب المنتج بواسطة المعرف
                const res = await fetch(`/api/products?id=${productId}`);
                
                if (!res.ok) {
                    throw new Error('فشل في جلب بيانات المنتج');
                }
                
                const productData = await res.json();
                setProduct(productData);
                
                // جلب منتجات مشابهة من نفس الفئة
                if (productData.category_id) {
                    const similarRes = await fetch(`/api/products?category=${productData.category_id}&limit=4&exclude=${productId}`);
                    if (similarRes.ok) {
                        const similarData = await similarRes.json();
                        setSimilarProducts(similarData);
                    }
                }
                
                setError(null);
            } catch (err) {
                console.error("خطأ في جلب تفاصيل المنتج:", err);
                setError("حدث خطأ أثناء جلب بيانات المنتج. يرجى المحاولة مرة أخرى.");
            } finally {
                setLoading(false);
            }
        };
        
        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);
    
    // تحويل البيانات من نموذج قاعدة البيانات إلى نموذج واجهة المستخدم
    const formatProductForUI = (dbProduct) => {
        if (!dbProduct) return null;
        
        return {
            id: dbProduct.id,
            name: dbProduct.name,
            price: `${dbProduct.price} DA`,
            description: dbProduct.description || '',
            mainImage: dbProduct.images?.[0] || "https://images.pexels.com/photos/14641423/pexels-photo-14641423.jpeg",
            hoverImage: dbProduct.images?.[1] || dbProduct.images?.[0] || "https://images.pexels.com/photos/6630846/pexels-photo-6630846.jpeg",
            discountPrice: dbProduct.discount_price ? `${dbProduct.discount_price} DA` : null,
            stock: dbProduct.stock || 0,
            category: dbProduct.category_name || '',
            images: dbProduct.images || []
        };
    };
    
    // عنصر المنتج المنسق لواجهة المستخدم
    const formattedProduct = formatProductForUI(product);
    
    // تحويل المنتجات المشابهة إلى تنسيق واجهة المستخدم
    const formattedSimilarProducts = similarProducts.map(formatProductForUI);
    
    // الانتقال لأعلى الصفحة
    const breadcrumbItems = product ? [
        { label: "الرئيسية", href: "/" },
        { label: product.category_name || "المنتجات", href: `/category/${product.category_id || "all"}` },
        { label: product.name, href: "" }
    ] : [
        { label: "الرئيسية", href: "/" },
        { label: "المنتجات", href: "/category/all" }
    ];

    if (loading) {
        return <div className="pt-28 px-4 text-center">جاري تحميل المنتج...</div>;
    }
    
    if (error) {
        return <div className="pt-28 px-4 text-center text-red-500">{error}</div>;
    }
    
    if (!product) {
        return <div className="pt-28 px-4 text-center">المنتج غير موجود</div>;
    }

    return (
        <div className='pt-28 px-4 relative md:px-8 lg:px-16 2xl:px-64'>
            <div className="mb-6">
                <Breadcrumbs items={breadcrumbItems} />
            </div>
     
            <div className='flex flex-col lg:flex-row gap-16'>
                {/* صور المنتج */}
                <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                    <ProductImages images={product.images} productName={product.name} />
                </div>

                {/* تفاصيل المنتج */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    <h1 className="text-4xl font-medium">{product.name}</h1>
                    <p className="text-gray-500 whitespace-pre-line">{product.description}</p>
                    <div className="h-[2px] bg-gray-100"/>

                    <div className="flex items-center gap-4">
                        {product.discount_price && (
                            <h3 className="text-xl text-gray-500 line-through">{product.price} DA</h3>
                        )}
                        <h2 className="font-medium text-2xl">
                            {product.discount_price ? `${product.discount_price} DA` : `${product.price} DA`}
                        </h2>
                    </div>
                    <div className="h-[2px] bg-gray-100"/>
              
                    {product.stock > 0 ? (
                        <>
                            <div className="text-green-500 font-medium">متوفر في المخزون ({product.stock})</div>
                            <CustomizeProduct productId={product.id} />
                            <Add productId={product.id} name={product.name} price={product.discount_price || product.price} image={product.images?.[0]} />
                        </>
                    ) : (
                        <div className="text-red-500 font-medium">غير متوفر في المخزون</div>
                    )}
                    
                    <ProductReviews productId={product.id} reviews={product.reviews} />
                </div>
            </div>

            {/* قسم "منتجات متشابهة" */}
            {formattedSimilarProducts.length > 0 && (
                <div className="mt-16 mb-8">
                    <h2 className="text-2xl font-semibold mb-6">منتجات مشابهة</h2>
                    <div className="flex gap-6 overflow-x-auto pb-4">
                        {formattedSimilarProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
            
            {/* منتجات أخرى قد تعجبك */}
            <div className="my-16">
                <h2 className="text-2xl font-semibold mb-6">منتجات أخرى قد تعجبك</h2>
                <ProductList limit={8} exclude={productId} />
            </div>
        </div>
    )
}
  
export default SinglePage