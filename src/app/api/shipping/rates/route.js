// In src/app/api/shipping/rates/route.js
// API Route for shipping rates calculation

export async function POST(request) {
    try {
      const body = await request.json();
      const { items, destination, weight } = body;
      
      // Calculate cart total
      const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Basic shipping rates (in a real app, these would come from shipping providers' APIs)
      const rates = [
        { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '3-5' },
        { id: 'express', name: 'Express Shipping', price: 14.99, days: '1-2' }
      ];
      
      // Add free shipping option if cart total exceeds threshold
      if (cartTotal >= 100) {
        rates.push({ id: 'free', name: 'Free Shipping', price: 0, days: '5-7', minOrder: 100 });
      }
      
      // Add international shipping if destination is international
      if (destination.country !== 'US') {
        rates.push({ id: 'international', name: 'International Shipping', price: 24.99, days: '7-14' });
      }
      
      // Calculate shipping price based on weight for more accurate pricing
      if (weight > 5) {
        rates.forEach(rate => {
          if (rate.id !== 'free') {
            rate.price += (weight - 5) * 0.5; // Add $0.50 per pound over 5 pounds
          }
        });
      }
      
      return new Response(JSON.stringify({ rates }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Shipping rates error:', error);
      return new Response(JSON.stringify({ error: 'Failed to calculate shipping rates' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  