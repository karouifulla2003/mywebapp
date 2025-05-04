// app/seller/dashboard/analytics/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function SellerAnalytics() {
  const [salesData, setSalesData] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    conversionRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month"); // week, month, year
  const { user } = useAuth();

  useEffect(() => {
    async function loadAnalytics() {
      if (user?.id) {
        setIsLoading(true);
        try {
          // Example API calls - replace with actual endpoints
          const [salesResponse, productResponse, statsResponse] = await Promise.all([
            fetch(`/api/seller/analytics/sales?sellerId=${user.id}&timeRange=${timeRange}`),
            fetch(`/api/seller/analytics/products?sellerId=${user.id}`),
            fetch(`/api/seller/analytics/summary?sellerId=${user.id}`),
          ]);
          
          const [salesData, productData, statsData] = await Promise.all([
            salesResponse.json(),
            productResponse.json(),
            statsResponse.json(),
          ]);
          
          setSalesData(salesData);
          setProductPerformance(productData);
          setSummaryStats(statsData);
        } catch (error) {
          console.error("Failed to load analytics data:", error);
          
          // Mock data for development purposes
          const mockSalesData = generateMockSalesData(timeRange);
          const mockProductData = generateMockProductData();
          const mockSummaryStats = {
            totalSales: 12580.45,
            totalOrders: 142,
            averageOrderValue: 88.59,
            conversionRate: 3.2,
          };
          
          setSalesData(mockSalesData);
          setProductPerformance(mockProductData);
          setSummaryStats(mockSummaryStats);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    loadAnalytics();
  }, [user, timeRange]);

  // Helper function to generate mock sales data for development
  function generateMockSalesData(timeRange) {
    const data = [];
    let days;
    
    switch (timeRange) {
      case "week":
        days = 7;
        break;
      case "month":
        days = 30;
        break;
      case "year":
        days = 12; // Months in this case
        break;
      default:
        days = 30;
    }
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      if (timeRange === "year") {
        date.setMonth(date.getMonth() - (11 - i));
        data.push({
          name: date.toLocaleString('default', { month: 'short' }),
          sales: Math.floor(Math.random() * 5000) + 1000,
          orders: Math.floor(Math.random() * 50) + 10,
        });
      } else {
        date.setDate(date.getDate() - (days - 1 - i));
        data.push({
          name: timeRange === "week" 
            ? date.toLocaleString('default', { weekday: 'short' }) 
            : date.getDate().toString(),
          sales: Math.floor(Math.random() * 500) + 100,
          orders: Math.floor(Math.random() * 10) + 1,
        });
      }
    }
    
    return data;
  }

  // Helper function to generate mock product performance data
  function generateMockProductData() {
    const productNames = [
      "Premium T-Shirt",
      "Classic Jeans",
      "Leather Wallet",
      "Wireless Earbuds",
      "Smartphone Case",
      "Desk Lamp",
      "Running Shoes",
      "Backpack",
    ];
    
    return productNames.map((name, index) => ({
      name,
      sales: Math.floor(Math.random() * 3000) + 500,
      units: Math.floor(Math.random() * 100) + 10,
    })).sort((a, b) => b.sales - a.sales);
  }

  if (isLoading) {
    return <div className="p-6">Loading analytics...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sales Analytics</h1>
      
      <div className="mb-6">
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setTimeRange('week')}
          >
            Last Week
          </button>
          <button 
            className={`px-4 py-2 rounded ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setTimeRange('month')}
          >
            Last Month
          </button>
          <button 
            className={`px-4 py-2 rounded ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setTimeRange('year')}
          >
            Last Year
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Total Sales</h3>
          <p className="text-2xl font-bold">${summaryStats.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <p className="text-2xl font-bold">{summaryStats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Average Order Value</h3>
          <p className="text-2xl font-bold">${summaryStats.averageOrderValue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Conversion Rate</h3>
          <p className="text-2xl font-bold">{summaryStats.conversionRate}%</p>
        </div>
      </div>

      {/* Sales Over Time Chart */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Sales Over Time</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="sales" 
                name="Sales ($)" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="orders" 
                name="Orders" 
                stroke="#82ca9d" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Performance */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Top Performing Products</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productPerformance.slice(0, 5)} // Show only top 5
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" name="Sales ()" fill="#8884d8" />
              <Bar dataKey="units" name="Units Sold" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}