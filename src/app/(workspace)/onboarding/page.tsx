import { OnboardingWizard } from "@/components/onboarding-wizard";

export default function OnboardingPage() {
  return (
    <div className="page-content">
      <section className="page-header compact-header">
        <div>
          <span className="eyebrow">الإعداد الأولي</span>
          <h1>لغة النظام والدولة والمنطقة الزمنية والعملة</h1>
          <p>هذه القيم تصبح أساس الشركة الأولى ويمكن تعديلها لاحقاً لكل شركة.</p>
        </div>
      </section>
      <OnboardingWizard />
    </div>
  );
}
