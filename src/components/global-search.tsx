"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { searchRecords } from "@/lib/mock-data";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return searchRecords.slice(0, 5);
    }

    return searchRecords.filter((record) =>
      `${record.title} ${record.subtitle} ${record.type}`.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <div className="global-search">
      <Search size={18} />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="بحث عن مستند أو صنف أو إعداد"
        aria-label="البحث الشامل"
      />
      {query ? (
        <button type="button" onClick={() => setQuery("")} title="مسح البحث">
          <X size={16} />
        </button>
      ) : null}
      <div className="search-results" role="listbox">
        {results.map((record) => (
          <Link key={record.id} href={record.href} className="search-result">
            <span>{record.title}</span>
            <small>
              {record.type} · {record.subtitle}
            </small>
          </Link>
        ))}
      </div>
    </div>
  );
}
