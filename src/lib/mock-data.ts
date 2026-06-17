import type {
  ActivityEntry,
  BundleSummary,
  CompanyOption,
  InventoryPoint,
  ItemGroupNode,
  ItemSummary,
  PriceRule,
  SearchRecord
} from "@/lib/types";

export const companies: CompanyOption[] = [
  {
    id: "main",
    name: "شركة المستقبل للإلكترونيات",
    country: "فلسطين / إسرائيل",
    currency: "ILS",
    timezone: "Asia/Jerusalem",
    fiscalYearStart: "01-01"
  },
  {
    id: "furniture",
    name: "شركة المستقبل للأثاث",
    country: "الإمارات",
    currency: "AED",
    timezone: "Asia/Dubai",
    fiscalYearStart: "04-01"
  }
];

export const demoItems: ItemSummary[] = [
  {
    id: "tv",
    sku: "TV-55-QLED",
    name: "شاشة QLED قياس 55 بوصة",
    group: "إلكترونيات > أصناف محلية > شاشات",
    warehouse: "صالة العرض",
    uom: "قطعة",
    stock: 21,
    reorderLevel: 8,
    valuationMethod: "FIFO",
    maintainsStock: true,
    canSell: true,
    canBuy: true,
    quality: "required",
    barcode: "7290000000551",
    leadTimeDays: 14
  },
  {
    id: "remote",
    sku: "ACC-REMOTE",
    name: "ريموت تحكم ذكي",
    group: "إلكترونيات > ملحقات",
    warehouse: "المخزن الرئيسي",
    uom: "قطعة",
    stock: 120,
    reorderLevel: 30,
    valuationMethod: "Moving Average",
    maintainsStock: true,
    canSell: true,
    canBuy: true,
    quality: "optional",
    barcode: "7290000000102",
    leadTimeDays: 7
  },
  {
    id: "install",
    sku: "SRV-INSTALL",
    name: "خدمة تركيب وتشغيل",
    group: "خدمات",
    warehouse: "غير مخزني",
    uom: "خدمة",
    stock: 0,
    reorderLevel: 0,
    valuationMethod: "Moving Average",
    maintainsStock: false,
    canSell: true,
    canBuy: false,
    quality: "none"
  },
  {
    id: "raw-panel",
    sku: "RAW-PANEL-01",
    name: "لوحة خام للتجميع",
    group: "تصنيع > مواد خام",
    warehouse: "المخزن الرئيسي",
    uom: "قطعة",
    stock: 63,
    reorderLevel: 40,
    valuationMethod: "FIFO",
    maintainsStock: true,
    canSell: false,
    canBuy: true,
    quality: "required",
    leadTimeDays: 21
  }
];

export const itemGroups: ItemGroupNode[] = [
  {
    id: "electronics",
    name: "إلكترونيات",
    itemCount: 4,
    defaultWarehouse: "المخزن الرئيسي",
    taxTemplate: "ضريبة القيمة المضافة 17%",
    children: [
      {
        id: "local-electronics",
        name: "أصناف محلية",
        itemCount: 2,
        defaultWarehouse: "صالة العرض",
        children: [
          {
            id: "screens",
            name: "شاشات",
            itemCount: 1,
            defaultWarehouse: "صالة العرض"
          }
        ]
      },
      {
        id: "accessories",
        name: "ملحقات",
        itemCount: 1,
        defaultWarehouse: "المخزن الرئيسي"
      }
    ]
  },
  {
    id: "manufacturing",
    name: "تصنيع",
    itemCount: 1,
    defaultWarehouse: "المخزن الرئيسي",
    children: [
      {
        id: "raw-materials",
        name: "مواد خام",
        itemCount: 1,
        defaultWarehouse: "المخزن الرئيسي",
        taxTemplate: "معفى داخلياً"
      }
    ]
  },
  {
    id: "services",
    name: "خدمات",
    itemCount: 1,
    taxTemplate: "ضريبة القيمة المضافة 17%"
  }
];

export const inventoryFlow: InventoryPoint[] = [
  { label: "يناير", stockIn: 180, stockOut: 120, value: 245000 },
  { label: "فبراير", stockIn: 220, stockOut: 170, value: 268000 },
  { label: "مارس", stockIn: 160, stockOut: 190, value: 251000 },
  { label: "أبريل", stockIn: 260, stockOut: 210, value: 292000 },
  { label: "مايو", stockIn: 310, stockOut: 260, value: 326000 },
  { label: "يونيو", stockIn: 250, stockOut: 280, value: 304000 }
];

export const bundles: BundleSummary[] = [
  {
    id: "bundle-tv",
    name: "باقة شاشة ذكية مع تركيب",
    virtualSku: "BND-TV-STARTER",
    stockMode: "منتج وهمي، الخصم من المكونات يتم في مهمة خلفية",
    components: [
      { name: "شاشة QLED قياس 55 بوصة", qty: 1, uom: "قطعة" },
      { name: "خدمة تركيب وتشغيل", qty: 1, uom: "خدمة" },
      { name: "ريموت تحكم ذكي", qty: 1, uom: "قطعة" }
    ]
  },
  {
    id: "bundle-furniture",
    name: "طقم أثاث غرفة جلوس",
    virtualSku: "BND-LIVING-ROOM",
    stockMode: "الباقة لا تملك رصيداً مباشراً",
    components: [
      { name: "كنبة ثلاثية", qty: 1, uom: "قطعة" },
      { name: "طاولة وسط", qty: 1, uom: "قطعة" },
      { name: "كرسي جانبي", qty: 2, uom: "قطعة" }
    ]
  }
];

export const priceRules: PriceRule[] = [
  {
    id: "retail-tv",
    item: "شاشة QLED قياس 55 بوصة",
    list: "سعر البيع العام",
    type: "بيع",
    uom: "قطعة",
    price: 2190,
    currency: "ILS"
  },
  {
    id: "purchase-tv",
    item: "شاشة QLED قياس 55 بوصة",
    list: "سعر الشراء",
    type: "شراء",
    uom: "صندوق 12",
    price: 18000,
    currency: "ILS"
  },
  {
    id: "vip-tv",
    item: "شاشة QLED قياس 55 بوصة",
    list: "سعر البيع العام",
    type: "بيع",
    uom: "قطعة",
    customer: "عميل عقود الصيانة",
    price: 2050,
    currency: "ILS",
    validFrom: "2026-06-01"
  },
  {
    id: "campaign-bundle",
    item: "باقة شاشة ذكية مع تركيب",
    list: "حملة الصيف",
    type: "بيع",
    uom: "طقم",
    price: 2290,
    currency: "ILS",
    validFrom: "2026-07-01",
    validTo: "2026-08-01"
  }
];

export const activityEntries: ActivityEntry[] = [
  {
    id: "act-1",
    actor: "مدير النظام",
    action: "عدّل حد إعادة الطلب",
    target: "شاشة QLED قياس 55 بوصة",
    time: "قبل 12 دقيقة",
    comment: "تم رفع الحد إلى 8 بسبب عروض نهاية الشهر."
  },
  {
    id: "act-2",
    actor: "مسؤول المخزون",
    action: "أضاف تعليقاً",
    target: "ريموت تحكم ذكي",
    time: "قبل 34 دقيقة",
    comment: "@مدير النظام الكمية كافية حالياً لكن مهلة التوريد قصيرة."
  },
  {
    id: "act-3",
    actor: "مدير النظام",
    action: "أنشأ قائمة أسعار",
    target: "حملة الصيف",
    time: "اليوم 09:15"
  }
];

export const searchRecords: SearchRecord[] = [
  { id: "s1", title: "شاشة QLED قياس 55 بوصة", subtitle: "TV-55-QLED", href: "/items", type: "صنف" },
  { id: "s2", title: "باقة شاشة ذكية مع تركيب", subtitle: "BND-TV-STARTER", href: "/bundles", type: "صنف" },
  { id: "s3", title: "المخزن الرئيسي", subtitle: "WH-MAIN", href: "/inventory", type: "إعداد" },
  { id: "s4", title: "سعر البيع العام", subtitle: "قائمة أسعار", href: "/pricing", type: "مستند" },
  { id: "s5", title: "مجموعات الأصناف", subtitle: "عرض شجري", href: "/item-groups", type: "وحدة" },
  { id: "s6", title: "الشركات والمستخدمون", subtitle: "صلاحيات وملف شخصي", href: "/settings", type: "وحدة" }
];
