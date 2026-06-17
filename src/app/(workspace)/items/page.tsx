import { ItemWorkspace } from "@/components/item-workspace";

export default function ItemsPage() {
  return (
    <div className="page-content">
      <section className="page-header compact-header">
        <div>
          <span className="eyebrow">كتالوج الأصناف</span>
          <h1>منتجات مرنة مع وحدات وباركود وجودة ومرفقات</h1>
          <p>يدعم النموذج البيع والشراء، تعطيل الأصناف، الحدود الدنيا، وفحص الجودة.</p>
        </div>
      </section>
      <ItemWorkspace />
    </div>
  );
}
