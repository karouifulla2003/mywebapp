//app/admin/products/page.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/admin-dashboard/products/products.module.css";
import Search from "@/components/admin-dashboard/search/search";
import Pagination from "@/components/admin-dashboard/pagination/pagination";
import { deleteProduct } from "@/lib/adminActions";

const ProductsPage = ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = Number(searchParams?.page) || 1;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  
  const itemsPerPage = 10;
  
  // جلب المنتجات من API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products${q ? `?search=${q}` : ''}`);
        
        if (!res.ok) {
          throw new Error('فشل في جلب المنتجات');
        }
        
        const data = await res.json();
        setProducts(data);
        setCount(data.length);
        setError(null);
      } catch (err) {
        console.error("خطأ في جلب المنتجات:", err);
        setError("حدث خطأ أثناء جلب المنتجات. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [q]);
  
  // تطبيق الصفحات
  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  
  // حذف منتج
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟")) {
      try {
        const res = await fetch(`/api/products?id=${id}`, {
          method: 'DELETE',
        });
        
        if (!res.ok) {
          throw new Error('فشل في حذف المنتج');
        }
        
        // تحديث قائمة المنتجات بعد الحذف
        setProducts(products.filter(product => product.id !== id));
        setCount(prev => prev - 1);
        alert("تم حذف المنتج بنجاح");
      } catch (err) {
        console.error("خطأ في حذف المنتج:", err);
        alert("حدث خطأ أثناء حذف المنتج");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="البحث عن منتج..." />
        <Link href="/admin/dashboard/products/add">
          <button className={styles.addButton}>إضافة منتج جديد</button>
        </Link>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}
      
      {loading ? (
        <div className={styles.loading}>جاري التحميل...</div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>المنتج</td>
                <td>الوصف</td>
                <td>السعر</td>
                <td>المخزون</td>
                <td>الحالة</td>
                <td>الإجراءات</td>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.product}>
                      {product.images && product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={40}
                          height={40}
                          className={styles.productImage}
                        />
                      ) : (
                        <div className={styles.noImage}>لا توجد صورة</div>
                      )}
                      {product.name}
                    </div>
                  </td>
                  <td>
                    <span className={styles.description}>
                      {product.description?.substring(0, 50)}
                      {product.description?.length > 50 ? "..." : ""}
                    </span>
                  </td>
                  <td>{product.price} DA</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`${styles.status} ${product.is_active ? styles.active : styles.passive}`}>
                      {product.is_active ? "نشط" : "غير نشط"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/admin/dashboard/products/${product.id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          عرض
                        </button>
                      </Link>
                      <button
                        className={`${styles.button} ${styles.delete}`}
                        onClick={() => handleDelete(product.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination count={count} />
        </>
      )}
    </div>
  );
};

export default ProductsPage;