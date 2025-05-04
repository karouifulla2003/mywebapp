// src/lib/utils/validation.js

/**
 * التحقق من صحة رابط الصورة
 */
export const validateImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
  
    try {
      // تحقق من أن الرابط يبدأ بـ http أو https
      if (!/^https?:\/\//i.test(url)) {
        return false;
      }
  
      // تحقق من أن الرابط ينتهي بامتداد صورة معروف
      if (!/\.(jpeg|jpg|png|webp|gif|svg)$/i.test(url)) {
        return false;
      }
  
      // تحقق من أن الرابط لا يحتوي على مسافات
      if (/\s/.test(url)) {
        return false;
      }
  
      return true;
    } catch (error) {
      return false;
    }
  };