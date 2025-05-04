// Modelos para el sistema de administración (بدون اتصال بقاعدة البيانات)

const userSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  timestamps: true
};

const productSchema = {
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  img: {
    type: String,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  timestamps: true
};

// تصدير تعريفات النماذج فقط
export const UserSchema = userSchema;
export const ProductSchema = productSchema;