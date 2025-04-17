// Funciones de acceso a datos para el panel de administración
import { AdminUser, AdminProduct } from "./adminModels";
import { connectToMongo } from "./db";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 2;

  try {
    await connectToMongo();
    const count = await AdminUser.find({ username: { $regex: regex } }).count();
    const users = await AdminUser.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  try {
    await connectToMongo();
    const user = await AdminUser.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 2;

  try {
    await connectToMongo();
    const count = await AdminProduct.find({ title: { $regex: regex } }).count();
    const products = await AdminProduct.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

export const fetchProduct = async (id) => {
  try {
    await connectToMongo();
    const product = await AdminProduct.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

// DUMMY DATA - Se mantiene para compatibilidad
export const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: "Stock",
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6.642,
    change: 18,
  },
];