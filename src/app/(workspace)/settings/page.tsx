import { SettingsPanels } from "@/components/settings-panels";

export default function SettingsPage() {
  return (
    <div className="page-content">
      <section className="page-header compact-header">
        <div>
          <span className="eyebrow">إدارة النظام</span>
          <h1>مستخدمون وشركات وصلاحيات وملفات شخصية</h1>
          <p>كل مستخدم يمكنه اختيار اللغة والمظهر، وكل شركة لها سنة مالية وإعدادات مستقلة.</p>
        </div>
      </section>
      <SettingsPanels />
    </div>
  );
}
