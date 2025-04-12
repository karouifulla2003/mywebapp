// CartSummary.tsx
"use client";
import Link from "next/link";
import { CartItemType } from "./CartItem";

interface CartSummaryProps {
  items: CartItemType[];
}

const CartSummary = ({ items }: CartSummaryProps) => {
  // حساب المجموع
  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between font-semibold">
        <span className="">SubTotal</span>
        <span className="">{subtotal.toFixed(2)} DA</span>
      </div>
      <p className="text-gray-500 text-sm mt-2 mb-4">
      Prices do not include shipping costs and taxes.
      </p>
      <div className="flex justify-between text-sm">
        <button className="rounded-md py-3 px-4 ring-1 ring-gray-300 hover:bg-gray-50 transition-colors">
          View Cart
        </button>
        <Link
          href="/checkout"
          className="rounded-md py-3 px-4 bg-black text-white hover:bg-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-75"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;