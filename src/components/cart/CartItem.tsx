// CartItem.tsx
"use client";
import Image from "next/image";
import { useState } from "react";

// تعريف نوع المنتج في السلة
export interface CartItemType {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  available: boolean;
}

interface CartItemProps {
  item: CartItemType;
  
  onRemoveItem: (id: number) => void;
}

const CartItem = ({ item, onRemoveItem }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

 
  return (
    <div className="flex gap-4">
      <Image
        src={item.image}
        alt={item.name}
        width={72}
        height={96}
        className="object-cover rounded-md"
      />
      <div className="flex flex-col justify-between w-full">
        {/* TOP */}
        <div className="">
          {/* TITLE */}
          <div className="flex items-center justify-between gap-8">
            <h3 className="font-semibold">{item.name}</h3>
            <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
              {item.price}
            </div>
          </div>
          {/* DESC */}
          <div className="text-sm text-gray-500">
            {item.available ? "available" : "out of stock"}
          </div>
        </div>
        {/* BOTTOM */}
        <div className="flex justify-between items-center text-sm">

          <button 
            onClick={() => onRemoveItem(item.id)}
            className="text-blue-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;