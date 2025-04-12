// CartModel.tsx
"use client";
import { useState, useEffect } from "react";
import CartItem, { CartItemType } from "./CartItem";
import CartSummary from "./CartSummary";

const CartModel = () => {
  // بيانات عناصر السلة
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: 1,
      name: "Winter Wool Sweater",
      price: "1800 DA",
      quantity: 2,
      image: "https://images.pexels.com/photos/14641423/pexels-photo-14641423.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      available: true
    },
    {
      id: 2,
      name: "Anti-Acne Skincare Serum",
      price: "3200 DA",
      quantity: 1,
      image: "https://images.pexels.com/photos/7353843/pexels-photo-7353843.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      available: true
    }
  ]);

  // تحديث كمية منتج
  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // إزالة منتج من السلة
  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20 min-w-80">
      {cartItems.length === 0 ? (
        <div className="p-4 text-center text-gray-500">Cart Shopping is Empty</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          
          {/* List of Cart Items */}
          <div className="flex flex-col gap-8 max-h-96 overflow-auto pr-2">
            {cartItems.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
          
          {/* Cart Summary */}
          <CartSummary items={cartItems} />
        </>
      )}
    </div>
  );
};

export default CartModel;