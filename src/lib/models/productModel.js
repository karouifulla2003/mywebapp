// lib/models/productModel.js
import { query } from '../db';

export class ProductModel {
  // الحصول على منتج واحد حسب المعرف
  static async getProductById(id) {
    try {
      const [product] = await query('SELECT * FROM products WHERE id = ?', [id]);
      
      if (!product) {
        return null;
      }
      
      // معالجة الصور من JSON إلى مصفوفة
      if (product.images && typeof product.images === 'string') {
        product.images = JSON.parse(product.images);
      } else {
        product.images = [];
      }
      
      // تحويل الخصائص الثنائية إلى قيم منطقية
      product.is_featured = !!product.is_featured;
      product.is_active = !!product.is_active;
      
      return product;
    } catch (error) {
      console.error('خطأ في الحصول على المنتج حسب المعرّف:', error);
      throw error;
    }
  }
  
  // الحصول على المنتجات مع تصفية متنوعة
  static async getProducts({
    category_id = null,
    search = null,
    minPrice = null,
    maxPrice = null,
    sortBy = 'created_at',
    sortOrder = 'DESC',
    limit = 10,
    page = 1
  } = {}) {
    try {
      const offset = (page - 1) * limit;
      let sql = 'SELECT * FROM products WHERE 1=1';
      const params = [];
      
      if (category_id) {
        sql += ' AND category_id = ?';
        params.push(category_id);
      }
      
      if (search) {
        sql += ' AND (name LIKE ? OR description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }
      
      if (minPrice !== null) {
        sql += ' AND price >= ?';
        params.push(minPrice);
      }
      
      if (maxPrice !== null) {
        sql += ' AND price <= ?';
        params.push(maxPrice);
      }
      
      // التأكد من أن عمود الترتيب صالح لمنع حقن SQL
      const validColumns = ['created_at', 'price', 'name', 'stock'];
      const validSortBy = validColumns.includes(sortBy) ? sortBy : 'created_at';
      
      // التأكد من أن اتجاه الترتيب إما تصاعدي أو تنازلي
      const validSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      
      sql += ` ORDER BY ${validSortBy} ${validSortOrder} LIMIT ? OFFSET ?`;
      params.push(limit, offset);
      
      const products = await query(sql, params);
      
      // معالجة الصور لكل منتج
      products.forEach(product => {
        if (product.images && typeof product.images === 'string') {
          try {
            product.images = JSON.parse(product.images);
          } catch (e) {
            product.images = [];
          }
        } else {
          product.images = [];
        }
        
        // تحويل الخصائص الثنائية إلى قيم منطقية
        product.is_featured = !!product.is_featured;
        product.is_active = !!product.is_active;
      });
      
      // الحصول على العدد الإجمالي للصفحات
      let countSql = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
      const countParams = params.slice(0, -2); // إزالة معاملات الحد والإزاحة
      
      if (category_id) {
        countSql += ' AND category_id = ?';
      }
      
      if (search) {
        countSql += ' AND (name LIKE ? OR description LIKE ?)';
      }
      
      if (minPrice !== null) {
        countSql += ' AND price >= ?';
      }
      
      if (maxPrice !== null) {
        countSql += ' AND price <= ?';
      }
      
      const [countResult] = await query(countSql, countParams);
      
      return {
        products,
        pagination: {
          total: countResult.total,
          pages: Math.ceil(countResult.total / limit),
          page,
          limit
        }
      };
    } catch (error) {
      console.error('خطأ في الحصول على المنتجات:', error);
      throw error;
    }
  }
  
  // إنشاء منتج جديد
  static async createProduct(productData) {
    try {
      const { 
        name, 
        description, 
        price, 
        discount_price = null, 
        stock = 0, 
        category_id = 1, 
        is_featured = false, 
        is_active = true, 
        images = []
      } = productData;
      
      const sql = `
        INSERT INTO products (
          name, description, price, discount_price, stock, 
          category_id, is_featured, is_active, images, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;
      
      const params = [
        name,
        description || '',
        price,
        discount_price,
        stock,
        category_id,
        is_featured ? 1 : 0,
        is_active ? 1 : 0,
        JSON.stringify(images || [])
      ];
      
      const result = await query(sql, params);
      
      return {
        id: result.insertId,
        ...productData,
        images: images || []
      };
    } catch (error) {
      console.error('خطأ في إنشاء منتج:', error);
      throw error;
    }
  }
  
  // تحديث منتج موجود
  static async updateProduct(id, productData) {
    try {
      const updates = [];
      const params = [];
      
      // بناء جزء SET من استعلام SQL ديناميكيًا
      if ('name' in productData) {
        updates.push('name = ?');
        params.push(productData.name);
      }
      
      if ('description' in productData) {
        updates.push('description = ?');
        params.push(productData.description);
      }
      
      if ('price' in productData) {
        updates.push('price = ?');
        params.push(productData.price);
      }
      
      if ('discount_price' in productData) {
        updates.push('discount_price = ?');
        params.push(productData.discount_price);
      }
      
      if ('stock' in productData) {
        updates.push('stock = ?');
        params.push(productData.stock);
      }
      
      if ('category_id' in productData) {
        updates.push('category_id = ?');
        params.push(productData.category_id);
      }
      
      if ('is_featured' in productData) {
        updates.push('is_featured = ?');
        params.push(productData.is_featured ? 1 : 0);
      }
      
      if ('is_active' in productData) {
        updates.push('is_active = ?');
        params.push(productData.is_active ? 1 : 0);
      }
      
      if ('images' in productData && Array.isArray(productData.images)) {
        updates.push('images = ?');
        params.push(JSON.stringify(productData.images));
      }
      
      if (updates.length === 0) {
        throw new Error('لا توجد حقول للتحديث');
      }
      
      updates.push('updated_at = NOW()');
      
      // إضافة المعرف إلى المعاملات
      params.push(id);
      
      const sql = `UPDATE products SET ${updates.join(', ')} WHERE id = ?`;
      const result = await query(sql, params);
      
      if (result.affectedRows === 0) {
        throw new Error('المنتج غير موجود أو لم يتم إجراء أي تغييرات');
      }
      
      return await this.getProductById(id);
    } catch (error) {
      console.error('خطأ في تحديث المنتج:', error);
      throw error;
    }
  }
  
  // حذف منتج
  static async deleteProduct(id) {
    try {
      const result = await query('DELETE FROM products WHERE id = ?', [id]);
      
      if (result.affectedRows === 0) {
        throw new Error('المنتج غير موجود');
      }
      
      return { success: true };
    } catch (error) {
      console.error('خطأ في حذف المنتج:', error);
      throw error;
    }
  }
  
  // الحصول على المنتجات المميزة
  static async getFeaturedProducts(limit = 4) {
    try {
      const sql = 'SELECT * FROM products WHERE is_featured = 1 LIMIT ?';
      const products = await query(sql, [limit]);
      
      // معالجة الصور لكل منتج
      products.forEach(product => {
        if (product.images && typeof product.images === 'string') {
          try {
            product.images = JSON.parse(product.images);
          } catch (e) {
            product.images = [];
          }
        } else {
          product.images = [];
        }
        
        // تحويل الخصائص الثنائية إلى قيم منطقية
        product.is_featured = !!product.is_featured;
        product.is_active = !!product.is_active;
      });
      
      return products;
    } catch (error) {
      console.error('خطأ في الحصول على المنتجات المميزة:', error);
      throw error;
    }
  }
  
  // الحصول على منتجات مرتبطة
  static async getRelatedProducts(productId, category_id, limit = 4) {
    try {
      const sql = 'SELECT * FROM products WHERE category_id = ? AND id != ? LIMIT ?';
      const products = await query(sql, [category_id, productId, limit]);
      
      // معالجة الصور لكل منتج
      products.forEach(product => {
        if (product.images && typeof product.images === 'string') {
          try {
            product.images = JSON.parse(product.images);
          } catch (e) {
            product.images = [];
          }
        } else {
          product.images = [];
        }
        
        // تحويل الخصائص الثنائية إلى قيم منطقية
        product.is_featured = !!product.is_featured;
        product.is_active = !!product.is_active;
      });
      
      return products;
    } catch (error) {
      console.error('خطأ في الحصول على المنتجات المرتبطة:', error);
      throw error;
    }
  }
}