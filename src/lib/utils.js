// Funciones de utilidad combinadas de ambos proyectos
import { connectToMongo } from "./db";

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

// === Database Connection Utility (Admin Project) ===
// Mantiene compatibilidad con código existente
export const connectToDB = connectToMongo;