// components/wishlist/EmptyWishlist.tsx
import Link from 'next/link';

export default function EmptyWishlist() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg /* أيقونة قلب كبيرة */ className="mx-auto h-24 w-24" />
      </div>
      <h2 className="text-xl font-semibold mb-2">قائمة المفضلات فارغة</h2>
      <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات إلى المفضلات بعد</p>
      <Link href="/list" className="bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700 transition">
        تصفح المنتجات
      </Link>
    </div>
  );
}