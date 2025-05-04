import SearchBar from '@/components/filters/SearchBar';
import Image from "next/image";

// بيانات وهمية للاختبار
const MOCK_PRODUCTS = [
  { id: 1, name: "هاتف iPhone 13", price: 999, category: "electronics", image: "/placeholder.png" },
  { id: 2, name: "حاسوب MacBook Pro", price: 1999, category: "electronics", image: "/placeholder.png" },
  { id: 3, name: "سماعات AirPods", price: 199, category: "electronics", image: "/placeholder.png" },
  { id: 4, name: "تلفزيون Samsung", price: 799, category: "electronics", image: "/placeholder.png" },
  { id: 5, name: "سروال جينز", price: 59, category: "clothing", image: "/placeholder.png" },
  { id: 6, name: "قميص", price: 29, category: "clothing", image: "/placeholder.png" },
  { id: 7, name: "حذاء رياضي Nike", price: 89, category: "shoes", image: "/placeholder.png" },
  { id: 8, name: "ساعة ذكية Apple Watch", price: 399, category: "electronics", image: "/placeholder.png" },
  { id: 9, name: "حقيبة يد", price: 45, category: "accessories", image: "/placeholder.png" },
  { id: 10, name: "كاميرا Canon", price: 549, category: "electronics", image: "/placeholder.png" },
];

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string; };
}) {
  const { q } = searchParams;
  
  // بحث بسيط في البيانات الوهمية
  const searchResults = q 
    ? MOCK_PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">نتائج البحث: {q || ""}</h1>
      
      <div className="mb-6 max-w-xl">
        <SearchBar />
      </div>
      
      {/* عرض نتائج البحث */}
      <div className="mt-6">
        {q ? (
          <>
            <p className="mb-4 text-gray-600">تم العثور على {searchResults.length} نتيجة</p>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      {product.image ? (
                        <Image 
                          src={product.image || "/culture.jpg"}
                          alt={product.name} 
                          width={150} 
                          height={150} 
                          className="object-contain h-full w-full"
                        />
                      ) : (
                        <div className="text-gray-400">صورة غير متوفرة</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h2 className="font-bold text-lg mb-2">{product.name}</h2>
                      <p className="text-gray-700 font-semibold mb-1">{product.price} $</p>
                      <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl text-gray-600">لا توجد نتائج للبحث عن "{q}"</p>
                <p className="mt-2 text-gray-500">حاول استخدام كلمات بحث مختلفة أو تصفح الفئات</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">أدخل كلمة بحث للعثور على المنتجات</p>
          </div>
        )}
      </div>
    </main>
  );
}