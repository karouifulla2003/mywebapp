// app/seller/dashboard/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, completed, canceled
  const { getSellerOrders } = useOrders();
  const { user } = useAuth();

  useEffect(() => {
    async function loadOrders() {
      if (user?.id) {
        setIsLoading(true);
        try {
          const sellerOrders = await getSellerOrders(user.id);
          setOrders(sellerOrders);
        } catch (error) {
          console.error("Failed to load seller orders:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    loadOrders();
  }, [user, getSellerOrders]);

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const updateOrderStatus = async (orderId, newStatus) => {
    // Update order status implementation
    try {
      // API call to update order status
      // await updateOrderStatus(orderId, newStatus);
      
      // Update local state
      setOrders(orders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      }));
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      
      <div className="mb-4">
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={`px-4 py-2 rounded ${filter === 'canceled' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('canceled')}
          >
            Canceled
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Products</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4">{order.id}</td>
                  <td className="py-4 px-4">{order.customer.name}</td>
                  <td className="py-4 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-4">{order.items.length} items</td>
                  <td className="py-4 px-4">${order.total.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button 
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                        onClick={() => {/* Show order details */}}
                      >
                        Details
                      </button>
                      {order.status === 'pending' && (
                        <>
                          <button 
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                          >
                            Complete
                          </button>
                          <button 
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                            onClick={() => updateOrderStatus(order.id, 'canceled')}
                          >
                            Cancel
                          </button>
                        </>
                      )}
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