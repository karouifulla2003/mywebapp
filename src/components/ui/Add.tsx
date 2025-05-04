"use client"
import { CreditCard, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";

  const handleBuyNow = () => {
    alert("جاري الانتقال إلى صفحة الشراء");
    // يمكن هنا إضافة المنطق الخاص بالانتقال إلى صفحة الشراء
  };

const Add = () => {

    const [quantity, setQuantity] = useState(1);
    const stock = 4;
    const handleQuantity = (type: "i" | "d") => {
        if (type === "d" && quantity > 1) {
          setQuantity((prev) => prev - 1);
        }
        if (type === "i" && quantity < stock) {
          setQuantity((prev) => prev + 1);
        }
      };

    return (
      <div className='flex flex-col gap-4'>
          <h4 className="font-medium">Choose a Quantity</h4>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
            <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button className="cursor-pointer text-xl " onClick={() => handleQuantity("d")}>-</button>
            {quantity}
            <button className="cursor-pointer text-xl" onClick={() => handleQuantity("i")}>+</button>
            </div>
            <div className="text-xs">Only <span className="text-orange-500"> 4 items </span>are left !! <br /> {"Don't"} miss it</div>
          </div>
          
<button className="w-36 text-sm rounded-3xl ring-1 ring-Revibe text-Revibe py-2 px-4 hover:bg-Revibe hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none"> Add to Cart</button>
            
</div>
      {/* العنوان ومعلومات المنتج */}
      <div className="pt-12 mb-6 text-left">
        
        {/* زر الشراء */}
        <button
          onClick={handleBuyNow}
className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mb-4 transition-colors duration-300 flex items-center justify-center gap-2 ltr:flex-row-reverse"
        >
          <ShoppingBag size={20} />
          <span>Buy it now</span>
        </button>
        
        {/* معلومات الشحن والتوصيل والدفع */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-6 mb-3 ltr:flex-row-reverse">
            <Truck size={18} className="text-gray-600" />
            <div className="text-sm">
              <p className="font-semibold">Fast Shipping</p>
              <p className="text-gray-600">Delivered within 2-4 business days</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 ltr:flex-row-reverse">
            <CreditCard size={18} className="text-gray-600" />
            <div className="text-sm">
              <p className="font-semibold">Multiple Payment Options</p>
              <p className="text-gray-600">Cash on delivery, credit card, e-wallet</p>
            </div>
          </div>
        </div>
</div>
</div>


    );
  };

  export default Add;