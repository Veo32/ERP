"use client";

import { Check, Globe2, Landmark, TimerReset, WalletCards } from "lucide-react";
import { useErpStore } from "@/store/use-erp-store";

export function OnboardingWizard() {
  const onboarding = useErpStore((state) => state.onboarding);
  const updateOnboarding = useErpStore((state) => state.updateOnboarding);

  return (
    <section className="onboarding-grid">
      <article className="setup-panel">
        <div className="setup-icon">
          <Globe2 size={22} />
        </div>
        <label>
          لغة النظام
          <select
            value={onboarding.language}
            onChange={(event) => updateOnboarding({ language: event.target.value as "AR" | "EN" | "HE" })}
          >
            <option value="AR">العربية</option>
            <option value="EN">English</option>
            <option value="HE">עברית</option>
          </select>
        </label>
      </article>

      <article className="setup-panel">
        <div className="setup-icon">
          <Landmark size={22} />
        </div>
        <label>
          الدولة
          <select value={onboarding.country} onChange={(event) => updateOnboarding({ country: event.target.value })}>
            <option value="IL">فلسطين / إسرائيل</option>
            <option value="AE">الإمارات</option>
            <option value="SA">السعودية</option>
            <option value="JO">الأردن</option>
          </select>
        </label>
      </article>

      <article className="setup-panel">
        <div className="setup-icon">
          <TimerReset size={22} />
        </div>
        <label>
          المنطقة الزمنية
          <select
            value={onboarding.timezone}
            onChange={(event) => updateOnboarding({ timezone: event.target.value })}
          >
            <option value="Asia/Jerusalem">Asia/Jerusalem</option>
            <option value="Asia/Dubai">Asia/Dubai</option>
            <option value="Asia/Riyadh">Asia/Riyadh</option>
            <option value="Asia/Amman">Asia/Amman</option>
          </select>
        </label>
      </article>

      <article className="setup-panel">
        <div className="setup-icon">
          <WalletCards size={22} />
        </div>
        <label>
          العملة الافتراضية
          <select value={onboarding.currency} onChange={(event) => updateOnboarding({ currency: event.target.value })}>
            <option value="ILS">ILS</option>
            <option value="AED">AED</option>
            <option value="SAR">SAR</option>
            <option value="JOD">JOD</option>
            <option value="USD">USD</option>
          </select>
        </label>
      </article>

      <article className="setup-summary">
        <Check size={22} />
        <div>
          <strong>الإعداد النشط</strong>
          <span>
            {onboarding.language} · {onboarding.country} · {onboarding.timezone} · {onboarding.currency}
          </span>
        </div>
      </article>
    </section>
  );
}
