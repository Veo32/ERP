import { ItemGroupsBrowser } from "@/components/item-groups-browser";

export default function ItemGroupsPage() {
  return (
    <div className="page-content">
      <section className="page-header compact-header">
        <div>
          <span className="eyebrow">الهيكلة الشجرية</span>
          <h1>مجموعات رئيسية وفرعية بعمق غير محدود</h1>
          <p>المخزن والقالب الضريبي ينتقلان كقيم افتراضية للأصناف الجديدة.</p>
        </div>
      </section>
      <ItemGroupsBrowser />
    </div>
  );
}
