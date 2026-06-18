"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import { X, Menu } from "lucide-react";
import { CompanySwitcher } from "@/components/company-switcher";
import { GlobalSearch } from "@/components/global-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { sidebarLinks } from "@/lib/navigation";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={clsx("sidebar", menuOpen && "sidebar-open")}>
        <div className="sidebar-header">
          <Link href="/desk" className="brand-mark" onClick={() => setMenuOpen(false)}>
            <span className="brand-symbol">ERP</span>
            <span>
              <strong>نظام الشركات</strong>
              <small>Next.js + Prisma</small>
            </span>
          </Link>
          <button
            className="sidebar-close"
            onClick={() => setMenuOpen(false)}
            aria-label="إغلاق القائمة"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="side-nav" aria-label="وحدات النظام">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={clsx(isActive && "is-active")}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="main-shell">
        <header className="topbar">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="فتح القائمة"
          >
            <Menu size={22} />
          </button>
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
