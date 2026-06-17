"use client";

import { Camera, FileText, Plus, Save, Upload } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { formatNumber } from "@/lib/format";
import type { NewItemInput } from "@/lib/types";
import { useErpStore } from "@/store/use-erp-store";

const emptyItem: NewItemInput = {
  sku: "",
  name: "",
  group: "إلكترونيات",
  warehouse: "المخزن الرئيسي",
  uom: "قطعة",
  stock: 0,
  reorderLevel: 0,
  valuationMethod: "FIFO",
  maintainsStock: true,
  canSell: true,
  canBuy: true,
  quality: "none",
  barcode: "",
  leadTimeDays: 0
};

export function ItemWorkspace() {
  const [mode, setMode] = useState<"quick" | "detailed">("quick");
  const [form, setForm] = useState<NewItemInput>(emptyItem);
  const items = useErpStore((state) => state.items);
  const addItem = useErpStore((state) => state.addItem);
  const toggleItemDisabled = useErpStore((state) => state.toggleItemDisabled);

  const lowStock = useMemo(
    () => items.filter((item) => item.maintainsStock && item.stock <= item.reorderLevel),
    [items]
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.sku.trim() || !form.name.trim()) {
      return;
    }

    addItem(form);
    setForm(emptyItem);
  };

  return (
    <div className="item-workspace">
      <section className="form-panel">
        <div className="section-heading">
          <span className="heading-icon">
            <Plus size={18} />
          </span>
          <div>
            <h2>إضافة صنف</h2>
            <p>نموذج سريع ومفصل للبيانات الأساسية والمتقدمة.</p>
          </div>
        </div>

        <div className="segmented wide">
          <button type="button" className={mode === "quick" ? "is-active" : ""} onClick={() => setMode("quick")}>
            سريع
          </button>
          <button
            type="button"
            className={mode === "detailed" ? "is-active" : ""}
            onClick={() => setMode("detailed")}
          >
            مفصل
          </button>
        </div>

        <form className="erp-form" onSubmit={onSubmit}>
          <label>
            رمز الصنف
            <input
              value={form.sku}
              onChange={(event) => setForm({ ...form, sku: event.target.value })}
              placeholder="SKU"
              required
            />
          </label>
          <label>
            اسم الصنف
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="اسم الصنف"
              required
            />
          </label>
          <label>
            المجموعة
            <select value={form.group} onChange={(event) => setForm({ ...form, group: event.target.value })}>
              <option>إلكترونيات</option>
              <option>إلكترونيات &gt; أصناف محلية &gt; شاشات</option>
              <option>تصنيع &gt; مواد خام</option>
              <option>خدمات</option>
            </select>
          </label>
          <label>
            المخزن الافتراضي
            <select value={form.warehouse} onChange={(event) => setForm({ ...form, warehouse: event.target.value })}>
              <option>المخزن الرئيسي</option>
              <option>صالة العرض</option>
              <option>غير مخزني</option>
            </select>
          </label>
          <label>
            وحدة القياس
            <select value={form.uom} onChange={(event) => setForm({ ...form, uom: event.target.value })}>
              <option>قطعة</option>
              <option>صندوق 12</option>
              <option>طقم</option>
              <option>خدمة</option>
            </select>
          </label>
          <label>
            الكمية الحالية
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })}
            />
          </label>

          {mode === "detailed" ? (
            <>
              <label>
                طريقة التقييم
                <select
                  value={form.valuationMethod}
                  onChange={(event) =>
                    setForm({ ...form, valuationMethod: event.target.value as NewItemInput["valuationMethod"] })
                  }
                >
                  <option>FIFO</option>
                  <option>Moving Average</option>
                </select>
              </label>
              <label>
                الحد الأدنى للطلب
                <input
                  type="number"
                  min="0"
                  value={form.reorderLevel}
                  onChange={(event) => setForm({ ...form, reorderLevel: Number(event.target.value) })}
                />
              </label>
              <label>
                مهلة التوريد بالأيام
                <input
                  type="number"
                  min="0"
                  value={form.leadTimeDays ?? 0}
                  onChange={(event) => setForm({ ...form, leadTimeDays: Number(event.target.value) })}
                />
              </label>
              <label>
                الباركود
                <input
                  value={form.barcode ?? ""}
                  onChange={(event) => setForm({ ...form, barcode: event.target.value })}
                  placeholder="Barcode"
                />
              </label>
              <label>
                فحص الجودة
                <select
                  value={form.quality}
                  onChange={(event) => setForm({ ...form, quality: event.target.value as NewItemInput["quality"] })}
                >
                  <option value="none">بدون</option>
                  <option value="optional">اختياري</option>
                  <option value="required">إلزامي</option>
                </select>
              </label>
              <div className="check-grid">
                <label>
                  <input
                    type="checkbox"
                    checked={form.maintainsStock}
                    onChange={(event) => setForm({ ...form, maintainsStock: event.target.checked })}
                  />
                  يحتفظ برصيد
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={form.canSell}
                    onChange={(event) => setForm({ ...form, canSell: event.target.checked })}
                  />
                  مسموح للبيع
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={form.canBuy}
                    onChange={(event) => setForm({ ...form, canBuy: event.target.checked })}
                  />
                  مسموح للشراء
                </label>
              </div>
              <div className="attachment-row">
                <label className="file-action">
                  <Upload size={16} />
                  صورة
                  <input type="file" accept="image/*" />
                </label>
                <label className="file-action">
                  <Camera size={16} />
                  كاميرا
                  <input type="file" accept="image/*" capture="environment" />
                </label>
                <label className="file-action">
                  <FileText size={16} />
                  PDF
                  <input type="file" accept="application/pdf" />
                </label>
              </div>
            </>
          ) : null}

          <button className="primary-button" type="submit">
            <Save size={17} />
            حفظ الصنف
          </button>
        </form>
      </section>

      <section className="list-panel">
        <div className="section-heading split">
          <div>
            <h2>كتالوج الأصناف</h2>
            <p>{lowStock.length ? `${lowStock.length} أصناف تحت حد إعادة الطلب` : "كل الأصناف فوق حد إعادة الطلب"}</p>
          </div>
          <span className="metric-pill">{items.length} صنف</span>
        </div>

        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>الصنف</th>
                <th>المخزن</th>
                <th>الرصيد</th>
                <th>التقييم</th>
                <th>الضوابط</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={item.disabled ? "is-muted" : ""}>
                  <td>
                    <strong>{item.name}</strong>
                    <small>{item.sku}</small>
                  </td>
                  <td>{item.warehouse}</td>
                  <td>
                    <span className={item.maintainsStock && item.stock <= item.reorderLevel ? "danger-text" : ""}>
                      {formatNumber(item.stock)} {item.uom}
                    </span>
                  </td>
                  <td>{item.valuationMethod}</td>
                  <td>
                    <span className="tag-row">
                      {item.canSell ? <b>بيع</b> : null}
                      {item.canBuy ? <b>شراء</b> : null}
                      {item.quality === "required" ? <b>جودة</b> : null}
                    </span>
                  </td>
                  <td>
                    <button className="link-button" type="button" onClick={() => toggleItemDisabled(item.id)}>
                      {item.disabled ? "تفعيل" : "تعطيل"}
                    </button>
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
