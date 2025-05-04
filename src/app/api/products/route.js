// app/api/products/route.js
import { NextResponse } from 'next/server';
import { ProductModel } from '@/lib/models/productModel';
import { testConnection } from '@/lib/db';

// GET - الحصول على جميع المنتجات أو تصفية حسب معلمات الاستعلام
export async function GET(request) {
  try {
    // اختبار الاتصال أولاً
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('لا يمكن الاتصال بقاعدة البيانات');
      return NextResponse.json({ 
        error: 'فشل في الاتصال بقاعدة البيانات',
        troubleshooting: 'تأكد من تشغيل خادم MySQL وإعداد متغيرات البيئة بشكل صحيح'
      }, { status: 500 });
    }
    
    const { searchParams } = new URL(request.url);
    const category_id = searchParams.get('category_id');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('min_price') ? parseFloat(searchParams.get('min_price')) : null;
    const maxPrice = searchParams.get('max_price') ? parseFloat(searchParams.get('max_price')) : null;
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const sortBy = searchParams.get('sort_by') || 'created_at';
    const sortOrder = searchParams.get('sort_order') || 'DESC';
    
    // محاولة الحصول على المنتجات
    const result = await ProductModel.getProducts({
      category_id,
      search,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      limit,
      page
    });
    
    // إرجاع البيانات
    return NextResponse.json(result);
  } catch (error) {
    console.error('خطأ في الحصول على المنتجات:', error);
    
    // إرجاع رسالة خطأ مفصلة للمساعدة في تحديد المشكلة
    return NextResponse.json({ 
      error: 'فشل في الحصول على المنتجات',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

// POST - إنشاء منتج جديد
export async function POST(request) {
  try {
    const body = await request.json();
    
    const product = await ProductModel.createProduct({
      name: body.name || '',
      description: body.description || '',
      price: body.price || 0,
      discount_price: body.discount_price || null,
      stock: body.stock || 0,
      category_id: body.category_id || 1,
      is_featured: !!body.is_featured,
      is_active: body.is_active !== false,
      images: body.images || []
    });
    
    return NextResponse.json({ 
      message: 'تم إنشاء المنتج بنجاح',
      product
    }, { status: 201 });
  } catch (error) {
    console.error('خطأ في إنشاء المنتج:', error);
    return NextResponse.json({ 
      error: 'فشل في إنشاء المنتج',
      details: error.message
    }, { status: 500 });
  }
}

// PUT - تحديث منتج
export async function PUT(request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json({ 
        error: 'معرف المنتج مطلوب' 
      }, { status: 400 });
    }
    
    const updatedProduct = await ProductModel.updateProduct(body.id, body);
    
    return NextResponse.json({ 
      message: 'تم تحديث المنتج بنجاح',
      product: updatedProduct
    });
  } catch (error) {
    console.error('خطأ في تحديث المنتج:', error);
    return NextResponse.json({ 
      error: 'فشل في تحديث المنتج',
      details: error.message
    }, { status: 500 });
  }
}

// DELETE - حذف منتج
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'معرف المنتج مطلوب' }, { status: 400 });
    }
    
    await ProductModel.deleteProduct(id);
    
    return NextResponse.json({ message: 'تم حذف المنتج بنجاح' });
  } catch (error) {
    console.error('خطأ في حذف المنتج:', error);
    return NextResponse.json({ error: 'فشل في حذف المنتج' }, { status: 500 });
  }
}