import { Boxes, Cpu, PackageMinus } from "lucide-react";
import { bundles } from "@/lib/mock-data";

export default function BundlesPage() {
  return (
    <div className="page-content">
      <section className="page-header compact-header">
        <div>
          <span className="eyebrow">حزم المنتجات</span>
          <h1>منتجات وهمية تبيع عرضاً واحداً وتخصم المكونات</h1>
          <p>عند البيع يتم إنشاء مهمة خلفية لتفكيك الحزمة وخصم العناصر الفردية من المخزن.</p>
        </div>
      </section>

      <section className="bundle-grid">
        {bundles.map((bundle) => (
          <article key={bundle.id} className="bundle-card">
            <div className="bundle-head">
              <span className="heading-icon">
                <Boxes size={18} />
              </span>
              <div>
                <strong>{bundle.name}</strong>
                <small>{bundle.virtualSku}</small>
              </div>
            </div>
            <p>{bundle.stockMode}</p>
            <div className="component-list">
              {bundle.components.map((component) => (
                <span key={`${bundle.id}-${component.name}`}>
                  {component.name}
                  <b>
                    {component.qty} {component.uom}
                  </b>
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="job-flow">
        <div className="job-step">
          <Cpu size={20} />
          <strong>بيع الحزمة</strong>
          <span>الفاتورة تحمل الصنف الوهمي.</span>
        </div>
        <div className="job-step">
          <PackageMinus size={20} />
          <strong>مهمة خلفية</strong>
          <span>تقرأ مكونات الحزمة داخل Transaction.</span>
        </div>
        <div className="job-step">
          <Boxes size={20} />
          <strong>خصم المخزون</strong>
          <span>ينقص الرصيد من الأصناف الفردية فقط.</span>
        </div>
      </section>
    </div>
  );
}
