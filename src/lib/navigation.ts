import {
  BarChart3,
  Boxes,
  Building2,
  Factory,
  Layers3,
  Package,
  PackageCheck,
  ReceiptText,
  Settings,
  ShoppingCart,
  ShoppingBag,
  Tags,
  Users
} from "lucide-react";

export const primaryModules = [
  {
    title: "المحاسبة",
    description: "شجرة حسابات، سنوات مالية، وقيود مرتبطة بالمخزون.",
    href: "/desk",
    icon: ReceiptText,
    tone: "teal"
  },
  {
    title: "المبيعات",
    description: "قوائم أسعار، أسعار عملاء، وفواتير قابلة للتمديد.",
    href: "/pricing",
    icon: ShoppingCart,
    tone: "blue"
  },
  {
    title: "المشتريات",
    description: "توريد، مهلة وصول، وحدود إعادة طلب.",
    href: "/items",
    icon: PackageCheck,
    tone: "amber"
  },
  {
    title: "التصنيع",
    description: "مواد خام، حزم منتجات، وقوائم BOM مستقبلية.",
    href: "/bundles",
    icon: Factory,
    tone: "rose"
  },
  {
    title: "المخازن",
    description: "حركة كمية وقيمة مالية لكل مخزن.",
    href: "/inventory",
    icon: Boxes,
    tone: "indigo"
  }
] as const;

export const sidebarLinks = [
  { label: "لوحة القيادة", href: "/desk", icon: BarChart3 },
  { label: "نقطة البيع", href: "/pos", icon: ShoppingBag },
  { label: "المخازن", href: "/inventory", icon: Boxes },
  { label: "الأصناف", href: "/items", icon: Package },
  { label: "مجموعات الأصناف", href: "/item-groups", icon: Layers3 },
  { label: "حزم المنتجات", href: "/bundles", icon: PackageCheck },
  { label: "التسعير", href: "/pricing", icon: Tags },
  { label: "الشركات والمستخدمون", href: "/settings", icon: Users },
  { label: "الإعداد الأولي", href: "/onboarding", icon: Building2 },
  { label: "الإعدادات", href: "/settings", icon: Settings }
] as const;
