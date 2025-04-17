//myproject
import { useState, useEffect, useCallback } from 'react';

// تعريف أنواع البيانات
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  products: Product[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  couponCode: string | null;
}

// الخطاف المخصص لإدارة سلة التسوق
export const useCart = () => {
  // حالة السلة الأولية
  const [cart, setCart] = useState<CartState>({
    products: [],
    subtotal: 0,
    shippingCost: 0,
    discount: 0,
    couponCode: null
  });

  // حساب المجموع الفرعي عند تغيير المنتجات
  useEffect(() => {
    const newSubtotal = cart.products.reduce(
      (sum, product) => sum + product.price * product.quantity, 
      0
    );
    
    setCart(prevCart => ({
      ...prevCart,
      subtotal: newSubtotal
    }));
  }, [cart.products]);

  // وظيفة إضافة منتج للسلة
  const addProduct = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.products.findIndex(
        p => p.id === product.id
      );

      let updatedProducts;

      if (existingProductIndex >= 0) {
        // إذا كان المنتج موجود بالفعل، نزيد الكمية فقط
        updatedProducts = [...prevCart.products];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity: updatedProducts[existingProductIndex].quantity + product.quantity
        };
      } else {
        // إذا كان المنتج جديد، نضيفه للقائمة
        updatedProducts = [...prevCart.products, product];
      }

      return {
        ...prevCart,
        products: updatedProducts
      };
    });
  }, []);

  // وظيفة حذف منتج من السلة
  const removeProduct = useCallback((productId: string) => {
    setCart(prevCart => ({
      ...prevCart,
      products: prevCart.products.filter(p => p.id !== productId)
    }));
  }, []);

  // وظيفة تحديث كمية منتج
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;

    setCart(prevCart => ({
      ...prevCart,
      products: prevCart.products.map(p => 
        p.id === productId ? { ...p, quantity } : p
      )
    }));
  }, []);

  // وظيفة حساب الضريبة (عادةً نسبة مئوية من المجموع الفرعي)
  const calculateTax = useCallback(() => {
    // مثال: ضريبة 15%
    const taxRate = 0.15;
    return cart.subtotal * taxRate;
  }, [cart.subtotal]);

  // وظيفة تطبيق كوبون خصم
  const applyCoupon = useCallback((code: string) => {
    // هنا يجب التحقق من صحة الكوبون عبر API
    // هذا مجرد مثال بسيط
    if (code === 'DISCOUNT20') {
      setCart(prevCart => ({
        ...prevCart,
        discount: prevCart.subtotal * 0.2, // خصم 20%
        couponCode: code
      }));
      return true;
    }
    return false;
  }, []);

  // وظيفة إزالة كوبون الخصم
  const removeCoupon = useCallback(() => {
    setCart(prevCart => ({
      ...prevCart,
      discount: 0,
      couponCode: null
    }));
  }, []);

  // وظيفة حساب تكلفة الشحن (يمكن أن تعتمد على الوزن، المنطقة، إلخ)
  const calculateShipping = useCallback(() => {
    // هنا منطق بسيط: الشحن مجاني إذا كان المجموع أكبر من 500
    const newShippingCost = cart.subtotal > 500 ? 0 : 50;
    
    setCart(prevCart => ({
      ...prevCart,
      shippingCost: newShippingCost
    }));
  }, [cart.subtotal]);

  // تحديث تكلفة الشحن عند تغير المجموع الفرعي
  useEffect(() => {
    calculateShipping();
  }, [cart.subtotal, calculateShipping]);

  // وظيفة تفريغ السلة بعد إتمام الطلب
  const clearCart = useCallback(() => {
    setCart({
      products: [],
      subtotal: 0,
      shippingCost: 0,
      discount: 0,
      couponCode: null
    });
  }, []);

  // حساب الإجمالي النهائي
  const total = cart.subtotal + cart.shippingCost + calculateTax() - cart.discount;

  return {
    products: cart.products,
    subtotal: cart.subtotal,
    shippingCost: cart.shippingCost,
    discount: cart.discount,
    couponCode: cart.couponCode,
    total,
    addProduct,
    removeProduct,
    updateQuantity,
    calculateTax,
    applyCoupon,
    removeCoupon,
    clearCart
  };
};

export default useCart;