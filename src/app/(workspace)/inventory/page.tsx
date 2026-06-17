import { ChartBar } from "@/components/chart-bar";
import { formatCurrency, formatNumber } from "@/lib/format";
import { demoItems, inventoryFlow } from "@/lib/mock-data";

const warehouses = [
  { name: "المخزن الرئيسي", code: "WH-MAIN", value: 188000, items: 143, defaultFor: "الإلكترونيات والمواد الخام" },
  { name: "صالة العرض", code: "SHOW", value: 116000, items: 48, defaultFor: "الشاشات والبيع المباشر" },
  { name: "مخزن الصيانة", code: "MAINT", value: 42000, items: 31, defaultFor: "قطع الضمان والاسترجاع" }
];

export default function InventoryPage() {
  return (
    <div className="page-content">
      <section className="page-header compact-header">
        <div>
          <span className="eyebrow">إدارة المخازن</span>
          <h1>مؤشرات مرئية وتعدد مخازن وتتبّع تلقائي</h1>
          <p>تحديث الكميات مرتبط بخاصية Maintains Stock وحركات البيع والشراء والتحويل.</p>
        </div>
      </section>

      <section className="analytics-panel full-band">
        <div className="section-heading split">
          <div>
            <h2>قيمة المخزون والحركة</h2>
            <p>قراءة شهرية تساعد على التخطيط للشراء والتوريد.</p>
          </div>
          <span className="metric-pill">{formatCurrency(346000)}</span>
        </div>
        <ChartBar data={inventoryFlow} />
      </section>

      <section className="warehouse-grid">
        {warehouses.map((warehouse) => (
          <article key={warehouse.code} className="warehouse-card">
            <span>{warehouse.code}</span>
            <strong>{warehouse.name}</strong>
            <b>{formatCurrency(warehouse.value)}</b>
            <small>
              {formatNumber(warehouse.items)} صنف · {warehouse.defaultFor}
            </small>
          </article>
        ))}
      </section>

      <section className="list-panel">
        <div className="section-heading split">
          <div>
            <h2>تتبع الرصيد</h2>
            <p>كل صنف مخزني يحدّث الكمية عند البيع أو الشراء.</p>
          </div>
          <span className="metric-pill">FIFO / المتوسط المتحرك</span>
        </div>
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>الصنف</th>
                <th>المخزن</th>
                <th>الرصيد</th>
                <th>حد الطلب</th>
                <th>طريقة التقييم</th>
              </tr>
            </thead>
            <tbody>
              {demoItems
                .filter((item) => item.maintainsStock)
                .map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                      <small>{item.sku}</small>
                    </td>
                    <td>{item.warehouse}</td>
                    <td>{formatNumber(item.stock)}</td>
                    <td>{formatNumber(item.reorderLevel)}</td>
                    <td>{item.valuationMethod}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
