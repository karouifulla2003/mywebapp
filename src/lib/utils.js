// utils.js أو db.js

import mysql from 'mysql2/promise';

// تكوين اتصال MySQL
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'revibe'
};

// إنشاء تجمع اتصالات MySQL
let pool;

/**
 * الاتصال بقاعدة بيانات MySQL
 * @returns {Promise<mysql.Pool>} تجمع اتصالات MySQL
 */
export const connectToMySQL = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool(dbConfig);
    }
    
    // اختبار الاتصال
    const connection = await pool.getConnection();
    connection.release();
    
    console.log('تم الاتصال بقاعدة بيانات MySQL بنجاح');
    return pool;
  } catch (error) {
    console.error('فشل الاتصال بقاعدة بيانات MySQL:', error.message);
    throw error;
  }
};

// === Formatters (Original Project) ===
export const formatPrice = (price) => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

/**
 * تنسيق التاريخ
 * @param {string | Date} date - التاريخ المراد تنسيقه
 * @returns {string} التاريخ بعد التنسيق
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

/**
 * تنسيق الرقم مع إضافة فواصل الآلاف
 * @param {number} num - الرقم المراد تنسيقه
 * @returns {string} الرقم بعد التنسيق
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('ar-SA').format(num);
};

// توحيد واجهة الاتصال لضمان التوافق مع الكود الموجود
export const connectToDB = connectToMySQL;