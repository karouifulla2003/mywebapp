// In src/app/api/shipping/track/[trackingNumber]/route.js
// API Route for tracking shipments

export async function GET(request, { params }) {
    try {
      const { trackingNumber } = params;
      
      // In a real app, you would call your shipping provider's API
      // This is mock data for demonstration
      
      // Mock different statuses based on tracking number
      const lastDigit = parseInt(trackingNumber.slice(-1));
      
      let steps = [
        { id: 1, status: 'Order Placed', date: '2025-04-23 14:32', completed: true }
      ];
      
      if (lastDigit >= 3) {
        steps.push({ id: 2, status: 'Processing', date: '2025-04-24 09:15', completed: true });
      }
      
      if (lastDigit >= 6) {
        steps.push({ id: 3, status: 'Shipped', date: '2025-04-25 16:40', completed: true });
      }
      
      if (lastDigit >= 8) {
        steps.push({ id: 4, status: 'Out for Delivery', date: '2025-04-27 08:12', completed: true });
      }
      
      if (lastDigit === 9) {
        steps.push({ id: 5, status: 'Delivered', date: '2025-04-27 14:22', completed: true });
      } else {
        steps.push({ id: 5, status: 'Delivered', date: null, completed: false });
      }
      
      const trackingInfo = {
        trackingNumber,
        carrier: 'Express Shipping Inc.',
        estimatedDelivery: '2025-04-29',
        currentStatus: steps[steps.length - 2].status,
        steps
      };
      
      return new Response(JSON.stringify(trackingInfo), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Tracking error:', error);
      return new Response(JSON.stringify({ error: 'Failed to track shipment' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }