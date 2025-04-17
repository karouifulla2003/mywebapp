// app/seller/dashboard/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    async function loadProducts() {
      if (user?.id) {
        setIsLoading(true);
        try {
          // Replace with actual API call
          const response = await fetch(`/api/seller/products?sellerId=${user.id}`);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Failed to load products:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    loadProducts();
  }, [user]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Replace with actual API call
        await fetch(`/api/seller/products/${productId}`, {
          method: 'DELETE',
        });
        
        // Update local state
        setProducts(products.filter(product => product.id !== productId));
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const toggleProductStatus = async (productId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      // Replace with actual API call
      await fetch(`/api/seller/products/${productId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      // Update local state
      setProducts(products.map(product => {
        if (product.id === productId) {
          return { ...product, status: newStatus };
        }
        return product;
      }));
    } catch (error) {
      console.error("Failed to update product status:", error);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading products...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link href="/sell" className="px-4 py-2 bg-blue-600 text-white rounded">
          Add New Product
        </Link>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found</p>
          {products.length > 0 && searchTerm && (
            <p className="text-gray-500 mt-2">Try adjusting your search</p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Inventory</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Sales</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <img 
                      src={product.images[0] || "/placeholder.png"} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    {product.inventory < 10 ? (
                      <span className="text-red-600">{product.inventory} left</span>
                    ) : (
                      product.inventory
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">{product.sales || 0}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Link 
                        href={`/product/${product.id}`}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm"
                      >
                        View
                      </Link>
                      <Link 
                        href={`/sell?edit=${product.id}`}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                      >
                        Edit
                      </Link>
                      <button 
                        className={`px-3 py-1 rounded text-sm ${
                          product.status === 'active' 
                            ? 'bg-yellow-600 text-white' 
                            : 'bg-green-600 text-white'
                        }`}
                        onClick={() => toggleProductStatus(product.id, product.status)}
                      >
                        {product.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}