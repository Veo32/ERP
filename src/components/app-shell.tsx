"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CompanySwitcher } from "@/components/company-switcher";
import { GlobalSearch } from "@/components/global-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { sidebarLinks } from "@/lib/navigation";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link href="/desk" className="brand-mark">
          <span className="brand-symbol">ERP</span>
          <span>
            <strong>نظام الشركات</strong>
            <small>Next.js + Prisma</small>
          </span>
        </Link>

        <nav className="side-nav" aria-label="وحدات النظام">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link key={`${link.href}-${link.label}`} href={link.href} className={clsx(isActive && "is-active")}>
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="main-shell">
        <header className="topbar">
          <GlobalSearch />
          <div className="topbar-actions">
            <CompanySwitcher />
            <ThemeToggle />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
