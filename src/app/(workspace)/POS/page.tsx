"use client";

import { useState, useCallback } from "react";
import { ShoppingCart, Trash2, Plus, Minus, Search, CreditCard, Banknote, Printer, X, CheckCircle } from "lucide-react";
import { demoItems } from "@/lib/mock-data";
import { priceRules } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

type CartItem = {
  id: string;
  name: string;
  sku: string;
  price: number;
  qty: number;
};

type PaymentMethod = "cash" | "card";

function getPrice(itemId: string): number {
  const item = demoItems.find((i) => i.id === itemId);
  if (!item) return 0;
  const rule = priceRules.find(
    (r) => r.item === item.name && r.type === "بيع" && !r.customer && !r.validFrom
  );
  return rule?.price ?? 0;
}

const sellableItems = demoItems.filter((i) => i.canSell && i.id !== "install");

export default function PosPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [cashIn, setCashIn] = useState("");
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [discount, setDiscount] = useState(0);

  const filtered = sellableItems.filter(
    (item) =>
      item.name.includes(search) ||
      item.sku.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = useCallback((item: (typeof demoItems)[0]) => {
    const price = getPrice(item.id);
    if (price === 0) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [
        ...prev,
        { id: item.id, name: item.name, sku: item.sku, price, qty: 1 },
      ];
    });
  }, []);

  const changeQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const removeItem = (id: string) => setCart((prev) => prev.filter((c) => c.id !== id));

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;
  const tax = total * 0.17;
  const grandTotal = total + tax;
  const cashChange = parseFloat(cashIn || "0") - grandTotal;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setReceiptVisible(true);
  };

  const handleNewSale = () => {
    setCart([]);
    setCashIn("");
    setDiscount(0);
    setReceiptVisible(false);
  };

  return (
    <div className="pos-shell">
      {/* ===== Receipt Modal ===== */}
      {receiptVisible && (
        <div className="pos-modal-overlay">
          <div className="pos-modal">
            <div className="pos-modal-head">
              <CheckCircle size={32} color="var(--primary)" />
              <h2>تمت عملية البيع</h2>
              <button className="pos-modal-close" onClick={handleNewSale}>
                <X size={18} />
              </button>
            </div>

            <div className="receipt">
              <div className="receipt-brand">
                <strong>شركة المستقبل للإلكترونيات</strong>
                <small>رقم الفاتورة: POS-{Date.now().toString().slice(-6)}</small>
                <small>{new Date().toLocaleString("ar-SA")}</small>
              </div>

              <table className="receipt-table">
                <thead>
                  <tr>
                    <th>الصنف</th>
                    <th>الكمية</th>
                    <th>السعر</th>
                    <th>المجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{formatCurrency(item.price * item.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="receipt-totals">
                <div><span>المجموع قبل الضريبة</span><strong>{formatCurrency(total)}</strong></div>
                {discount > 0 && <div><span>خصم {discount}%</span><strong>-{formatCurrency(discountAmount)}</strong></div>}
                <div><span>ضريبة 17%</span><strong>{formatCurrency(tax)}</strong></div>
                <div className="receipt-grand"><span>الإجمالي</span><strong>{formatCurrency(grandTotal)}</strong></div>
                {paymentMethod === "cash" && cashIn && (
                  <>
                    <div><span>المبلغ المستلم</span><strong>{formatCurrency(parseFloat(cashIn))}</strong></div>
                    <div><span>الباقي</span><strong>{formatCurrency(cashChange)}</strong></div>
                  </>
                )}
                <div><span>طريقة الدفع</span><strong>{paymentMethod === "cash" ? "نقدي" : "بطاقة"}</strong></div>
              </div>
            </div>

            <div className="pos-modal-actions">
              <button className="pos-btn-outline" onClick={() => window.print()}>
                <Printer size={16} />
                طباعة
              </button>
              <button className="pos-btn-primary" onClick={handleNewSale}>
                بيعة جديدة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Items Panel ===== */}
      <section className="pos-items-panel">
        <div className="pos-search-bar">
          <Search size={18} className="pos-search-icon" />
          <input
            type="text"
            placeholder="ابحث بالاسم أو الباركود..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pos-search-input"
            aria-label="بحث عن صنف"
          />
        </div>

        <div className="pos-items-grid">
          {filtered.length === 0 && (
            <p className="pos-empty">لا توجد أصناف مطابقة</p>
          )}
          {filtered.map((item) => {
            const price = getPrice(item.id);
            const inCart = cart.find((c) => c.id === item.id);
            return (
              <button
                key={item.id}
                className={`pos-item-card ${inCart ? "pos-item-in-cart" : ""}`}
                onClick={() => addToCart(item)}
                disabled={price === 0}
                aria-label={`إضافة ${item.name}`}
              >
                <div className="pos-item-icon">
                  {item.name.slice(0, 2)}
                </div>
                <div className="pos-item-info">
                  <strong>{item.name}</strong>
                  <small>{item.sku}</small>
                </div>
                <div className="pos-item-price">
                  {price > 0 ? (
                    <span>{formatCurrency(price)}</span>
                  ) : (
                    <span className="pos-no-price">بدون سعر</span>
                  )}
                  {inCart && (
                    <span className="pos-qty-badge">{inCart.qty}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===== Cart Panel ===== */}
      <section className="pos-cart-panel">
        <div className="pos-cart-header">
          <ShoppingCart size={20} />
          <h2>السلة</h2>
          {cart.length > 0 && (
            <button className="pos-clear-btn" onClick={() => setCart([])} aria-label="إفراغ السلة">
              <Trash2 size={15} />
              إفراغ
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="pos-cart-empty">
            <ShoppingCart size={40} strokeWidth={1.2} />
            <p>أضف أصنافاً من اليسار</p>
          </div>
        ) : (
          <div className="pos-cart-items">
            {cart.map((item) => (
              <div key={item.id} className="pos-cart-item">
                <div className="pos-cart-item-info">
                  <strong>{item.name}</strong>
                  <small>{formatCurrency(item.price)} / قطعة</small>
                </div>
                <div className="pos-cart-item-controls">
                  <button onClick={() => changeQty(item.id, -1)} aria-label="تقليل الكمية">
                    <Minus size={14} />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, 1)} aria-label="زيادة الكمية">
                    <Plus size={14} />
                  </button>
                  <button className="pos-remove-btn" onClick={() => removeItem(item.id)} aria-label="حذف الصنف">
                    <X size={14} />
                  </button>
                </div>
                <strong className="pos-cart-item-total">
                  {formatCurrency(item.price * item.qty)}
                </strong>
              </div>
            ))}
          </div>
        )}

        {/* Discount */}
        <div className="pos-discount-row">
          <label htmlFor="discount">خصم %</label>
          <input
            id="discount"
            type="number"
            min={0}
            max={100}
            value={discount || ""}
            onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))}
            placeholder="0"
          />
        </div>

        {/* Totals */}
        <div className="pos-totals">
          <div className="pos-total-row"><span>المجموع</span><span>{formatCurrency(subtotal)}</span></div>
          {discount > 0 && (
            <div className="pos-total-row pos-discount-line">
              <span>خصم {discount}%</span>
              <span>-{formatCurrency(discountAmount)}</span>
            </div>
          )}
          <div className="pos-total-row"><span>قبل الضريبة</span><span>{formatCurrency(total)}</span></div>
          <div className="pos-total-row"><span>ضريبة 17%</span><span>{formatCurrency(tax)}</span></div>
          <div className="pos-total-row pos-grand-total">
            <span>الإجمالي</span>
            <strong>{formatCurrency(grandTotal)}</strong>
          </div>
        </div>

        {/* Payment Method */}
        <div className="pos-payment-methods">
          <button
            className={`pos-pay-btn ${paymentMethod === "cash" ? "active" : ""}`}
            onClick={() => setPaymentMethod("cash")}
          >
            <Banknote size={18} />
            نقدي
          </button>
          <button
            className={`pos-pay-btn ${paymentMethod === "card" ? "active" : ""}`}
            onClick={() => setPaymentMethod("card")}
          >
            <CreditCard size={18} />
            بطاقة
          </button>
        </div>

        {/* Cash In */}
        {paymentMethod === "cash" && (
          <div className="pos-cash-row">
            <label htmlFor="cashIn">المبلغ المستلم</label>
            <input
              id="cashIn"
              type="number"
              min={0}
              value={cashIn}
              onChange={(e) => setCashIn(e.target.value)}
              placeholder={`${grandTotal.toFixed(2)}`}
            />
            {cashIn && parseFloat(cashIn) >= grandTotal && (
              <div className="pos-change">
                الباقي: <strong>{formatCurrency(cashChange)}</strong>
              </div>
            )}
            {cashIn && parseFloat(cashIn) < grandTotal && (
              <div className="pos-change pos-change-warn">
                ناقص: <strong>{formatCurrency(grandTotal - parseFloat(cashIn))}</strong>
              </div>
            )}
          </div>
        )}

        <button
          className="pos-checkout-btn"
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          <CheckCircle size={18} />
          إتمام البيع · {formatCurrency(grandTotal)}
        </button>
      </section>
    </div>
  );
}
