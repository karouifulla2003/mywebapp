// PaymentMethods.tsx
"use client";
import { ChangeEvent } from "react";

interface PaymentMethodsProps {
  paymentMethod: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PaymentMethods = ({ paymentMethod, handleChange }: PaymentMethodsProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Payment Method</h3>
      
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
            paymentMethod === "creditCard" ? "border-orange-500 bg-orange-50" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={paymentMethod === "creditCard"}
            onChange={handleChange}
            className="form-radio h-4 w-4 text-orange-600"
          />
          <div className="ml-3 flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
              alt="Credit Card"
              className="h-8 mr-2"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
              alt="Mastercard"
              className="h-8"
            />
          </div>
          <span className="ml-2 text-gray-700">Credit Card</span>
        </label>

        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
            paymentMethod === "paypal" ? "border-orange-500 bg-orange-50" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={handleChange}
            className="form-radio h-4 w-4 text-orange-600"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png"
            alt="PayPal"
            className="ml-3 h-8"
          />
          <span className="ml-2 text-gray-700">PayPal</span>
        </label>
        
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
            paymentMethod === "cashOnDelivery" ? "border-orange-500 bg-orange-50" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="cashOnDelivery"
            checked={paymentMethod === "cashOnDelivery"}
            onChange={handleChange}
            className="form-radio h-4 w-4 text-orange-600"
          />
          <div className="ml-3 bg-gray-200 p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="ml-2 text-gray-700">Cash On Delivery</span>
        </label>
      </div>
      
      {paymentMethod === "creditCard" && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;