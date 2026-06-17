import { ActivityPanel } from "@/components/activity-panel";
import { ChartBar } from "@/components/chart-bar";
import { ModuleCard } from "@/components/module-card";
import { formatCurrency, formatNumber } from "@/lib/format";
import { inventoryFlow } from "@/lib/mock-data";
import { primaryModules } from "@/lib/navigation";

const metrics = [
  { label: "قيمة المخزون", value: formatCurrency(304000), detail: "+8.4% عن الشهر السابق" },
  { label: "حركات هذا الشهر", value: formatNumber(530), detail: "250 وارد، 280 صادر" },
  { label: "أصناف تحت الحد", value: "3", detail: "بحاجة لإعادة طلب" },
  { label: "مهام خلفية", value: "7", detail: "خصم حزم ومنتجات مركبة" }
];

export default function DeskPage() {
  return (
    <div className="page-content">
      <section className="page-header">
        <div>
          <span className="eyebrow">لوحة القيادة</span>
          <h1>مركز تشغيل موحد للشركات والمخازن</h1>
          <p>وصول سريع للوحدات، مؤشرات المخزون، وسجل العمل المشترك بين الفريق.</p>
        </div>
      </section>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.detail}</small>
          </article>
        ))}
      </section>

      <section className="modules-grid" aria-label="وحدات النظام">
        {primaryModules.map((module) => (
          <ModuleCard key={module.title} {...module} />
        ))}
      </section>

      <div className="dashboard-grid">
        <section className="analytics-panel">
          <div className="section-heading split">
            <div>
              <h2>حركة المخزون وقيمته</h2>
              <p>وارد وصادر وقيمة مالية عبر آخر ستة أشهر.</p>
            </div>
            <span className="metric-pill">FIFO + Moving Average</span>
          </div>
          <ChartBar data={inventoryFlow} />
          <div className="legend-row">
            <span className="legend in">وارد</span>
            <span className="legend out">صادر</span>
            <span className="legend value">قيمة</span>
          </div>
        </section>
        <ActivityPanel />
      </div>
    </div>
  );
}
