"use client";

import { ChevronsUpDown } from "lucide-react";
import { useErpStore } from "@/store/use-erp-store";

export function CompanySwitcher() {
  const companies = useErpStore((state) => state.companies);
  const selectedCompanyId = useErpStore((state) => state.selectedCompanyId);
  const setSelectedCompany = useErpStore((state) => state.setSelectedCompany);
  const selectedCompany = companies.find((company) => company.id === selectedCompanyId) ?? companies[0];

  return (
    <label className="company-switcher">
      <span>{selectedCompany?.currency ?? "ILS"}</span>
      <select value={selectedCompanyId} onChange={(event) => setSelectedCompany(event.target.value)}>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
      <ChevronsUpDown size={16} />
    </label>
  );
}
