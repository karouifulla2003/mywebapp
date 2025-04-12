/**
 * تنسيق الرقم كسعر بالريال السعودي
 * @param {number} price - السعر المراد تنسيقه
 * @returns {string} السعر بعد التنسيق
 */
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