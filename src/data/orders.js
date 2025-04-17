// src/data/orders.js
export const orders = [
    {
      id: 1,
      customer: 3, // ID المشتري
      products: [
        { id: 1, title: "هاتف ذكي", price: 1100, quantity: 1 }
      ],
      totalAmount: 1100,
      status: "delivered", // pending, processing, shipped, delivered, cancelled
      paymentMethod: "credit_card",
      paymentStatus: "paid", // pending, paid, failed
      shippingAddress: {
        name: "أحمد المشتري",
        street: "شارع الملك فهد",
        city: "الرياض",
        state: "الرياض",
        country: "السعودية",
        zipCode: "12345"
      },
      createdAt: "2023-08-01T00:00:00.000Z",
      updatedAt: "2023-08-05T00:00:00.000Z"
    },
    {
      id: 2,
      customer: 3, // ID المشتري
      products: [
        { id: 2, title: "لابتوب", price: 3200, quantity: 1 }
      ],
      totalAmount: 3200,
      status: "processing",
      paymentMethod: "paypal",
      paymentStatus: "paid",
      shippingAddress: {
        name: "أحمد المشتري",
        street: "شارع الملك فهد",
        city: "الرياض",
        state: "الرياض",
        country: "السعودية",
        zipCode: "12345"
      },
      createdAt: "2023-09-01T00:00:00.000Z",
      updatedAt: "2023-09-01T00:00:00.000Z"
    }
  ];