"use client";

import { Camera, Languages, ShieldCheck, Upload, UserRoundCog } from "lucide-react";
import { companies } from "@/lib/mock-data";
import { ThemeToggle } from "@/components/theme-toggle";

export function SettingsPanels() {
  return (
    <div className="settings-layout">
      <section className="profile-panel">
        <div className="avatar-upload">
          <div className="avatar-preview">م</div>
          <label className="file-action">
            <Upload size={16} />
            رفع صورة
            <input type="file" accept="image/*" />
          </label>
          <label className="file-action">
            <Camera size={16} />
            كاميرا
            <input type="file" accept="image/*" capture="user" />
          </label>
        </div>
        <div className="profile-fields">
          <div className="section-heading">
            <span className="heading-icon">
              <UserRoundCog size={18} />
            </span>
            <div>
              <h2>الملف الشخصي</h2>
              <p>لغة واجهة فردية ومظهر مستقل لكل مستخدم.</p>
            </div>
          </div>
          <label>
            الاسم
            <input defaultValue="مدير النظام" />
          </label>
          <label>
            البريد
            <input defaultValue="admin@example.com" type="email" />
          </label>
          <label>
            لغة الواجهة
            <select defaultValue="AR">
              <option value="AR">العربية</option>
              <option value="EN">English</option>
              <option value="HE">עברית</option>
            </select>
          </label>
          <ThemeToggle />
        </div>
      </section>

      <section className="users-panel">
        <div className="section-heading">
          <span className="heading-icon">
            <ShieldCheck size={18} />
          </span>
          <div>
            <h2>الصلاحيات</h2>
            <p>أدوار مختلفة لكل شركة ومخزن افتراضي للمستخدم.</p>
          </div>
        </div>
        <div className="user-role-list">
          {[
            ["مدير النظام", "Administrator", "كل الشركات"],
            ["مسؤول المخزون", "Manager", "المخزن الرئيسي"],
            ["مستخدم مبيعات", "User", "صالة العرض"]
          ].map(([name, role, scope]) => (
            <article key={name} className="role-row">
              <span>{name.slice(0, 1)}</span>
              <div>
                <strong>{name}</strong>
                <small>{scope}</small>
              </div>
              <b>{role}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="companies-panel">
        <div className="section-heading">
          <span className="heading-icon">
            <Languages size={18} />
          </span>
          <div>
            <h2>الشركات</h2>
            <p>كل شركة تملك سنة مالية وشجرة محاسبية مستقلة.</p>
          </div>
        </div>
        <div className="company-list">
          {companies.map((company) => (
            <article key={company.id} className="company-row">
              <strong>{company.name}</strong>
              <span>
                {company.country} · {company.currency} · {company.timezone}
              </span>
              <small>بداية السنة المالية {company.fiscalYearStart}</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
