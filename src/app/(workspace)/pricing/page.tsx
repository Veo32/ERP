import { CalendarClock, UserRoundCheck } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { priceRules } from "@/lib/mock-data";

export default function PricingPage() {
  return (
    <div className="page-content">
      <section className="page-header compact-header">
        <div>
          <span className="eyebrow">التسعير وقوائم الأسعار</span>
          <h1>أسعار بيع وشراء حسب الوحدة والعميل والفترة الزمنية</h1>
          <p>تسعير المنتج الواحد يتغير حسب قائمة السعر ووحدة القياس والعميل.</p>
        </div>
      </section>

      <section className="pricing-toolbar">
        <article>
          <CalendarClock size={20} />
          <strong>صلاحية زمنية</strong>
          <span>Valid From / Valid To للعروض المؤقتة وجدولة الأسعار.</span>
        </article>
        <article>
          <UserRoundCheck size={20} />
          <strong>تسعير مخصص</strong>
          <span>تسعيرة العميل تطبق تلقائياً عند الفوترة.</span>
        </article>
      </section>

      <section className="list-panel">
        <div className="section-heading split">
          <div>
            <h2>قواعد الأسعار</h2>
            <p>نماذج بيع وشراء وعروض وجدولة مستقبلية.</p>
          </div>
          <span className="metric-pill">{priceRules.length} قواعد</span>
        </div>
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>الصنف</th>
                <th>القائمة</th>
                <th>النوع</th>
                <th>الوحدة</th>
                <th>العميل</th>
                <th>السعر</th>
                <th>الصلاحية</th>
              </tr>
            </thead>
            <tbody>
              {priceRules.map((rule) => (
                <tr key={rule.id}>
                  <td>{rule.item}</td>
                  <td>{rule.list}</td>
                  <td>{rule.type}</td>
                  <td>{rule.uom}</td>
                  <td>{rule.customer ?? "عام"}</td>
                  <td>{formatCurrency(rule.price, rule.currency)}</td>
                  <td>
                    {rule.validFrom ?? "دائم"} {rule.validTo ? `إلى ${rule.validTo}` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
