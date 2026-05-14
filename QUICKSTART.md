# 🚀 Smart Pharmacy System - Quick Start

## التشغيل السريع (Windows)
```bash
# شغل هذا الملف لتثبيت وتشغيل كل شيء
start.bat
```

## التشغيل السريع (Linux/Mac)
```bash
chmod +x start.sh
./start.sh
```

## التشغيل اليدوي

### 1. إعداد قاعدة البيانات
```sql
CREATE DATABASE smart_pharmacy;
-- ثم شغل ملف server/config/schema.sql
```

### 2. تشغيل الباك اند
```bash
cd project/server
npm install
npm run dev
```

### 3. تشغيل الفرونت اند (في نافذة أخرى)
```bash
cd project/client/Smart-pharmacy-frontend
npm install
npm run dev
```

## 🔗 الروابط
- **الفرونت اند**: http://localhost:5173
- **الباك اند API**: http://localhost:5000/api
- **اختبار الاتصال**: http://localhost:5173/test-connection

## 📋 المميزات المضافة
- ✅ ربط كامل بين الفرونت اند والباك اند
- ✅ API service مع interceptors للمصادقة
- ✅ hooks لجلب البيانات من الباك اند
- ✅ fallback للبيانات المحلية عند فشل الاتصال
- ✅ صفحة اختبار الاتصال
- ✅ إعدادات البيئة (.env files)
- ✅ سكريبتات التشغيل التلقائي

## 🔧 استكشاف الأخطاء
- تأكد من تشغيل MySQL
- تأكد من إعداد قاعدة البيانات
- تحقق من ملفات .env
- جرب صفحة test-connection للتحقق من الاتصال