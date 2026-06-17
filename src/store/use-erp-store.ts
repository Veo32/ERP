"use client";

import { create } from "zustand";
import { companies, demoItems } from "@/lib/mock-data";
import type { CompanyOption, ItemSummary, NewItemInput } from "@/lib/types";

type OnboardingState = {
  language: "AR" | "EN" | "HE";
  country: string;
  timezone: string;
  currency: string;
};

type ErpState = {
  selectedCompanyId: string;
  companies: CompanyOption[];
  items: ItemSummary[];
  onboarding: OnboardingState;
  setSelectedCompany: (companyId: string) => void;
  updateOnboarding: (settings: Partial<OnboardingState>) => void;
  addItem: (item: NewItemInput) => void;
  toggleItemDisabled: (itemId: string) => void;
};

export const useErpStore = create<ErpState>((set) => ({
  selectedCompanyId: companies[0]?.id ?? "main",
  companies,
  items: demoItems,
  onboarding: {
    language: "AR",
    country: "IL",
    timezone: "Asia/Jerusalem",
    currency: "ILS"
  },
  setSelectedCompany: (companyId) => set({ selectedCompanyId: companyId }),
  updateOnboarding: (settings) =>
    set((state) => ({
      onboarding: {
        ...state.onboarding,
        ...settings
      }
    })),
  addItem: (item) =>
    set((state) => ({
      items: [
        {
          ...item,
          id: `item-${Date.now()}`,
          disabled: false
        },
        ...state.items
      ]
    })),
  toggleItemDisabled: (itemId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              disabled: !item.disabled
            }
          : item
      )
    }))
}));
