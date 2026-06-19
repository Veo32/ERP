"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function MenuToggle() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar") as HTMLElement | null;
    const body = document.body;
    if (open) {
      sidebar?.classList.add("sidebar-open");
      body.style.overflow = "hidden";
    } else {
      sidebar?.classList.remove("sidebar-open");
      body.style.overflow = "";
    }
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </>
  );
}
