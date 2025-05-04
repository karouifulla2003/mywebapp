// In src/components/checkout/ShippingTracking.tsx
import React from 'react';

const mockTrackingSteps = [
  { id: 1, status: 'Order Placed', date: '2025-04-23 14:32', completed: true },
  { id: 2, status: 'Processing', date: '2025-04-24 09:15', completed: true },
  { id: 3, status: 'Shipped', date: '2025-04-25 16:40', completed: true },
  { id: 4, status: 'Out for Delivery', date: '2025-04-27 08:12', completed: false },
  { id: 5, status: 'Delivered', date: null, completed: false }
];

const ShippingTracking = ({ trackingNumber, carrier, estimatedDelivery, steps = mockTrackingSteps }) => {
  return (
    <div className="shipping-tracking p-6 border rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Shipment Tracking</h2>
        <div className="text-sm text-gray-500">
          <p>Tracking #: <span className="font-medium">{trackingNumber}</span></p>
          <p>Carrier: <span className="font-medium">{carrier}</span></p>
        </div>
      </div>
      
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
        
        {/* Steps */}
        <div className="space-y-8 relative z-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex">
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full mr-4 ${
                step.completed ? 'bg-green-500' : 'bg-gray-200'
              }`}>
                {step.completed ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  <span className="text-xs text-gray-600">{index + 1}</span>
                )}
              </div>
              
              <div>
                <h3 className={`font-medium ${step.completed ? 'text-black' : 'text-gray-500'}`}>
                  {step.status}
                </h3>
                <p className="text-sm text-gray-500">
                  {step.date || 'Pending'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-center">
        <p className="font-medium">Estimated Delivery: {estimatedDelivery}</p>
        <p className="text-gray-500 mt-1">The package is on its way!</p>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Delivery Details
        </button>
      </div>
    </div>
  );
};

export default ShippingTracking;