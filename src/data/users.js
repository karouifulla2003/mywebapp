// src/data/users.js
export const users = [
    {
      id: 1,
      name: "مدير النظام",
      email: "admin@example.com",
      password: "Admin@1234", // في الإنتاج استخدم تشفير كلمات المرور
      role: "admin",
      createdAt: "2023-01-01T00:00:00.000Z"
    },
    {
      id: 2,
      name: "بائع محمد",
      email: "seller@example.com",
      password: "seller123",
      role: "seller",
      shopName: "متجر محمد",
      shopDescription: "متجر لبيع الإلكترونيات",
      rating: 4.5,
      joinDate: "2023-02-01T00:00:00.000Z"
    },
    {
      id: 3,
      name: "أحمد المشتري",
      email: "customer@example.com",
      password: "customer123",
      role: "customer",
      addresses: [
        {
          id: 1,
          title: "المنزل",
          street: "شارع الملك فهد",
          city: "الرياض",
          state: "الرياض",
          country: "السعودية",
          zipCode: "12345",
          isDefault: true
        }
      ],
      joinDate: "2023-03-01T00:00:00.000Z"
    }
  ];