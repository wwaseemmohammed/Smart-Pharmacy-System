# Smart Pharmacy System

نظام صيدلية ذكي متكامل يربط بين الفرونت اند والباك اند.

## 🚀 التشغيل السريع

### Windows
```bash
# إعداد قاعدة البيانات
setup-db.bat

# تشغيل التطبيق
start.bat
```

### Linux/Mac
```bash
# إعداد قاعدة البيانات
chmod +x setup-db.sh
./setup-db.sh

# تشغيل التطبيق
chmod +x start.sh
./start.sh
```

## 📋 المتطلبات

- Node.js (v16 أو أحدث)
- MySQL 8.0+
- npm أو yarn

## 🔧 الإعداد اليدوي

### 1. إعداد قاعدة البيانات
```sql
CREATE DATABASE smart_pharmacy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```bash
# استيراد البنية والمعطيات
mysql -u root -p smart_pharmacy < project/server/config/schema.sql
cd project/server && node seed-admin.js
```

### 2. تشغيل الباك اند
```bash
cd project/server
npm install
npm run dev
```

### 3. تشغيل الفرونت اند
```bash
cd project/client/Smart-pharmacy-frontend
npm install
npm run dev
```

## 🔗 الروابط

- **الفرونت اند**: http://localhost:5173
- **الباك اند API**: http://localhost:5000/api
- **اختبار الاتصال**: http://localhost:5173/test-connection
- **لوحة التحكم**: http://localhost:5173/admin

## 📊 المميزات

### الفرونت اند
- ✅ واجهة مستخدم حديثة ومتجاوبة
- ✅ إدارة الأدوية والمخزون
- ✅ عرض الموظفين والصيادلة
- ✅ نظام الحجوزات والطلبات
- ✅ سلة المشتريات
- ✅ لوحة تحكم إدارية

### الباك اند
- ✅ RESTful API
- ✅ مصادقة JWT
- ✅ إدارة قاعدة البيانات MySQL
- ✅ رفع الملفات
- ✅ حماية من الهجمات
- ✅ rate limiting

### الربط بين الفرونت والباك
- ✅ axios مع interceptors
- ✅ hooks للبيانات
- ✅ fallback للبيانات المحلية
- ✅ إدارة الأخطاء
- ✅ تحميل تلقائي

## 🗂️ هيكل المشروع

```
smart-pharmacy-system/
├── project/
│   ├── client/
│   │   └── Smart-pharmacy-frontend/
│   │       ├── src/
│   │       │   ├── components/     # مكونات React
│   │       │   ├── pages/         # صفحات التطبيق
│   │       │   ├── hooks/         # hooks مخصصة
│   │       │   ├── services/      # خدمات API
│   │       │   └── data/          # البيانات المحلية
│   │       ├── .env              # متغيرات البيئة
│   │       └── package.json
│   └── server/
│       ├── config/               # إعدادات قاعدة البيانات
│       ├── routes/               # routes API
│       ├── middleware/           # middleware
│       ├── .env                 # متغيرات البيئة
│       └── package.json
├── start.bat                     # تشغيل سريع (Windows)
├── start.sh                      # تشغيل سريع (Linux/Mac)
├── setup-db.bat                  # إعداد قاعدة البيانات (Windows)
├── setup-db.sh                   # إعداد قاعدة البيانات (Linux/Mac)
└── README.md
```

## 🔐 بيانات الدخول

### Admin
- Email: admin@medicare.ps
- Password: admin123

## 🐛 استكشاف الأخطاء

### مشاكل شائعة:

1. **خطأ في الاتصال بقاعدة البيانات**
   - تأكد من تشغيل MySQL
   - تحقق من بيانات الاتصال في `.env`

2. **خطأ في الباك اند**
   - تحقق من البورت 5000
   - جرب `npm run dev` في مجلد السيرفر

3. **خطأ في الفرونت اند**
   - تحقق من البورت 5173
   - جرب `npm run dev` في مجلد الفرونت

4. **صفحة اختبار الاتصال**
   - اذهب إلى `/test-connection` للتحقق من الاتصال

## 📞 الدعم

للمساعدة أو الإبلاغ عن مشاكل:
- تحقق من console المتصفح
- تحقق من logs السيرفر
- جرب إعادة تشغيل التطبيق