import React from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  products: Product[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount?: number;
  couponCode?: string;
  onRemoveCoupon?: () => void;
  currency?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  products,
  subtotal,
  shipping,
  tax,
  discount = 0,
  couponCode,
  onRemoveCoupon,
  currency = "$"
}) => {
  const total = subtotal + shipping + tax - discount;

  const formatPrice = (price: number): string => {
    return `${currency}${price.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      {/* قائمة المنتجات */}
      <div className="border-b pb-4 mb-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center mb-4">
            <div className="relative h-16 w-16 flex-shrink-0 rounded border">
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                sizes="64px"
                className="object-cover rounded"
              />
            </div>
            <div className="mr-4 flex-grow">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
            </div>
            <div className="text-sm font-medium">
              {formatPrice(product.price * product.quantity)}
            </div>
          </div>
        ))}
      </div>
      
      {/* تفاصيل التكلفة */}
      <div className="space-y-2 border-b pb-4 mb-4">
        <div className="flex justify-between text-sm">
          <span>SubTotale:</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping:</span>
          <span>{shipping === 0 ? "شحن مجاني" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Taxes:</span>
          <span>{formatPrice(tax)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span className="flex items-center">
              coupon{couponCode && `(${couponCode})`}:
              {couponCode && onRemoveCoupon && (
                <button 
                  onClick={onRemoveCoupon}
                  className="mr-2 text-xs underline text-red-500"
                >
                  Remove
                </button>
              )}
            </span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
      </div>
      
      {/* إجمالي الطلب */}
      <div className="flex justify-between font-semibold text-lg">
        <span>Totale</span>
        <span>{formatPrice(total)}</span>
      </div>
      
      {/* معلومات إضافية */}
      <div className="mt-4 text-xs text-gray-500">
        <p>By clicking "Confirm Order," you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default OrderSummary;