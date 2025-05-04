// In src/hooks/useShipping.ts
import { useState, useEffect } from 'react';

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  days: string;
  minOrder?: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface TrackingInfo {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  currentStatus: string;
  steps: TrackingStep[];
}

export interface TrackingStep {
  id: number;
  status: string;
  date: string | null;
  completed: boolean;
}

export function useShipping() {
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(null);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch available shipping options
  useEffect(() => {
    const fetchShippingOptions = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For demo, using hard-coded data
        const options: ShippingOption[] = [
          { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '3-5' },
          { id: 'express', name: 'Express Shipping', price: 14.99, days: '1-2' },
          { id: 'free', name: 'Free Shipping', price: 0, days: '5-7', minOrder: 100 },
          { id: 'international', name: 'International Shipping', price: 24.99, days: '7-14' }
        ];
        
        setShippingOptions(options);
        setError(null);
      } catch (err) {
        setError('Failed to load shipping options');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingOptions();
  }, []);

  // Calculate shipping cost based on cart total and selected option
  const calculateShippingCost = (cartTotal: number, option: ShippingOption | null): number => {
    if (!option) return 0;
    
    // If free shipping is selected and cart total meets minimum
    if (option.id === 'free' && option.minOrder && cartTotal >= option.minOrder) {
      return 0;
    }
    
    return option.price;
  };

  // Track shipment by order ID
  const trackShipment = async (orderId: string): Promise<TrackingInfo> => {
    setLoading(true);
    try {
      // In a real app, this would fetch from your API
      // Mock data for example purposes
      const trackingInfo: TrackingInfo = {
        orderId,
        trackingNumber: `TRK${orderId.padStart(10, '0')}`,
        carrier: 'Express Shipping Inc.',
        estimatedDelivery: 'April 29, 2025',
        currentStatus: 'In Transit',
        steps: [
          { id: 1, status: 'Order Placed', date: '2025-04-23 14:32', completed: true },
          { id: 2, status: 'Processing', date: '2025-04-24 09:15', completed: true },
          { id: 3, status: 'Shipped', date: '2025-04-25 16:40', completed: true },
          { id: 4, status: 'Out for Delivery', date: null, completed: false },
          { id: 5, status: 'Delivered', date: null, completed: false }
        ]
      };
      
      setError(null);
      return trackingInfo;
    } catch (err) {
      setError('Failed to track shipment');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Validate shipping address
  const validateAddress = (address: ShippingAddress): boolean => {
    // Basic validation
    return !!(
      address.firstName &&
      address.lastName &&
      address.streetAddress &&
      address.city &&
      address.state &&
      address.postalCode &&
      address.country
    );
  };

  return {
    shippingOptions,
    selectedOption,
    setSelectedOption,
    shippingAddress,
    setShippingAddress,
    loading,
    error,
    calculateShippingCost,
    trackShipment,
    validateAddress
  };
}