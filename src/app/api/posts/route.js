import { createConnection } from '@/lib/db.js';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const db = await createConnection(); // اتصال بقاعدة البيانات
        const sql = "SELECT * FROM posts"; // جلب جميع البيانات من جدول posts
        const [posts] = await db.query(sql); // تنفيذ الاستعلام
        return NextResponse.json({posts: posts}); // إرجاع البيانات بصيغة JSON
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }
}