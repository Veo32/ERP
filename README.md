# نظام إدارة شركات ومخزون باستخدام Next.js 15

مشروع ERP عربي جاهز كبداية عملية للرفع على GitHub والنشر على Render. الواجهة مبنية بـ Next.js App Router وReact، وإدارة الحالة بـ Zustand، وقاعدة البيانات مصممة لـ PostgreSQL عبر Prisma.

## الميزات الموجودة

- إعداد أولي للغة، الدولة، المنطقة الزمنية، والعملة.
- تعدد الشركات تحت نفس الحساب، مع سنة مالية وإعدادات مستقلة.
- إدارة مستخدمين وأدوار وصلاحيات وملف شخصي.
- لوحة قيادة موحدة للوحدات: المحاسبة، المبيعات، المشتريات، التصنيع، والمخازن.
- بحث شامل سريع داخل الواجهة.
- سجل نشاط وتعليقات وإشارات لفريق العمل.
- إدارة مخازن متعددة مع مؤشرات حركة وقيمة مالية.
- كتالوج أصناف بنموذج سريع ومفصل، وحدات قياس، باركود، أرقام تسلسلية، ومرفقات.
- مجموعات أصناف شجرية Recursive مع خصائص موروثة.
- حزم منتجات وهمية تخصم المكونات عبر مهمة خلفية.
- قوائم أسعار بيع وشراء، أسعار حسب وحدة القياس، أسعار عملاء، وصلاحية زمنية.
- مخطط Prisma يغطي العلاقات الأساسية والـ Transactions المتوقعة.
- ملف `render.yaml` لإنشاء Web Service وPostgreSQL على Render.

## التشغيل المحلي

1. انسخ ملف البيئة:

```bash
cp .env.example .env
```

2. ضع رابط PostgreSQL في `DATABASE_URL`.

3. ثبّت الحزم:

```bash
npm install
```

4. أنشئ الجداول وبيانات البداية:

```bash
npm run db:push
npm run db:seed
```

5. شغّل التطبيق:

```bash
npm run dev
```

ثم افتح:

```text
http://localhost:3000
```

## النشر على Render

المستودع يحتوي على `render.yaml`. بعد رفع المشروع إلى GitHub:

1. افتح Render واختر New Blueprint.
2. اربط مستودع GitHub.
3. سيقرأ Render ملف `render.yaml` وينشئ خدمة Node.js وقاعدة PostgreSQL.
4. أمر البناء يستخدم `npm install` ثم `prisma generate` ثم `next build`.
5. أمر ما قبل النشر يستخدم `prisma db push` لإنشاء الجداول في قاعدة Render.
6. أمر التشغيل هو `npm run start`.

لإنتاج حقيقي طويل المدى، استخدم Prisma migrations بدلاً من `db push`:

```bash
npm run db:generate
npx prisma migrate dev --name init
```

ثم غيّر `preDeployCommand` في `render.yaml` إلى:

```yaml
preDeployCommand: npx prisma migrate deploy
```

## أهم الملفات

- `src/app/(workspace)` صفحات النظام.
- `src/components` مكونات الواجهة التفاعلية.
- `src/store/use-erp-store.ts` حالة الواجهة على العميل.
- `src/lib/mock-data.ts` بيانات عرض وتجربة.
- `prisma/schema.prisma` نموذج البيانات الكامل.
- `prisma/seed.ts` بيانات بداية قابلة للتجربة.
- `render.yaml` إعداد النشر على Render.

## ملاحظات تطوير

- الواجهة حالياً تستخدم بيانات تجريبية حتى تعمل فوراً، ومخطط Prisma جاهز لربط الصفحات ببيانات فعلية.
- يمكن إضافة Auth.js أو مزود تسجيل دخول لاحقاً وربط الأدوار بجدول `CompanyMember`.
- خصم حزم المنتجات يجب أن يتم داخل Transaction في طبقة خدمات الخادم عند بناء فواتير البيع.
