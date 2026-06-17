"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "system";

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => {
    const stored = window.localStorage.getItem("erp-theme") as ThemeMode | null;
    const nextMode = stored ?? "system";
    setMode(nextMode);
    applyTheme(nextMode);
  }, []);

  const updateMode = (nextMode: ThemeMode) => {
    setMode(nextMode);
    window.localStorage.setItem("erp-theme", nextMode);
    applyTheme(nextMode);
  };

  return (
    <div className="segmented compact" aria-label="اختيار المظهر">
      <button
        type="button"
        className={mode === "light" ? "is-active" : ""}
        onClick={() => updateMode("light")}
        title="المظهر الفاتح"
      >
        <Sun size={16} />
      </button>
      <button
        type="button"
        className={mode === "dark" ? "is-active" : ""}
        onClick={() => updateMode("dark")}
        title="المظهر الداكن"
      >
        <Moon size={16} />
      </button>
      <button
        type="button"
        className={mode === "system" ? "is-active" : ""}
        onClick={() => updateMode("system")}
        title="حسب النظام"
      >
        <Monitor size={16} />
      </button>
    </div>
  );
}

function applyTheme(mode: ThemeMode) {
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "system" ? (systemPrefersDark ? "dark" : "light") : mode;
  document.documentElement.dataset.theme = resolved;
}
