// src/lib/db.js
import mysql from 'mysql2/promise';

// تعريف القيم الافتراضية للمتغيرات البيئية
const DB_HOST = process.env.DATABASE_HOST || 'localhost';
const DB_USER = process.env.DATABASE_USER || 'root';
const DB_PASSWORD = process.env.DATABASE_PASSWORD || '';
const DB_NAME = process.env.DATABASE_NAME || 'revibe';

// إنشاء مجمع اتصالات
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// إنشاء واختبار الاتصال مباشرة
export async function testConnection() {
  try {
    const [rows] = await pool.execute('SELECT 1');
    console.log('✅ قاعدة البيانات متصلة بنجاح');
    return true;
  } catch (error) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', error.message);
    console.error('تأكد من تشغيل خادم MySQL وصحة بيانات الاتصال');
    return false;
  }
}

// اختبار الاتصال عند بدء التشغيل
testConnection();

// استخدام هذه الدالة للاستعلامات
export const query = async (sql, params) => {
  try {
    const [rows] = await pool.execute(sql, params || []);
    return rows;
  } catch (error) {
    console.error(`خطأ في الاستعلام: ${sql}`, error);
    throw error;
  }
};

// نستخدم مجمع الاتصالات بدلاً من إنشاء اتصال جديد في كل مرة
export async function createConnection() {
  try {
    // للتوافق مع الكود القديم، نعيد الاتصال من المجمع
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('خطأ في إنشاء اتصال جديد:', error);
    throw error;
  }
}

// دالة connectToDatabase للتوافق مع الكود القديم
export async function connectToDatabase() {
  // استخدام مجمع الاتصالات الموجود
  // هذه الدالة تعيد مجمع الاتصالات للتوافق مع الكود القديم
  try {
    await testConnection(); // اختبار الاتصال أولاً
    return pool;
  } catch (error) {
    console.error('خطأ في الاتصال بقاعدة البيانات:', error);
    throw error;
  }
}