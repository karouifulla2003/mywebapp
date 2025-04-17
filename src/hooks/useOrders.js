//myproject
import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

export const useOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrders = useCallback(async (page = 1, limit = 10) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/orders', { 
        params: { page, limit } 
      });
      
      return {
        orders: response.data.orders,
        total: response.data.total
      };
    } catch (err) {
      setError('حدث خطأ أثناء جلب الطلبات');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getOrderById = useCallback(async (orderId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (err) {
      setError('حدث خطأ أثناء جلب تفاصيل الطلب');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    getOrders,
    getOrderById
  };
};