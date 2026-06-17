"use client";

import { Grid2X2, List, Network } from "lucide-react";
import { useMemo, useState } from "react";
import { itemGroups } from "@/lib/mock-data";
import type { ItemGroupNode } from "@/lib/types";

export function ItemGroupsBrowser() {
  const [mode, setMode] = useState<"tree" | "list" | "cards">("tree");
  const flatGroups = useMemo(() => flattenGroups(itemGroups), []);

  return (
    <section className="groups-browser">
      <div className="section-heading split">
        <div>
          <h2>مجموعات الأصناف</h2>
          <p>خصائص المجموعة تورث للمجموعات الفرعية والأصناف الجديدة.</p>
        </div>
        <div className="segmented compact">
          <button type="button" className={mode === "tree" ? "is-active" : ""} onClick={() => setMode("tree")} title="شجرة">
            <Network size={16} />
          </button>
          <button type="button" className={mode === "list" ? "is-active" : ""} onClick={() => setMode("list")} title="قائمة">
            <List size={16} />
          </button>
          <button type="button" className={mode === "cards" ? "is-active" : ""} onClick={() => setMode("cards")} title="بطاقات">
            <Grid2X2 size={16} />
          </button>
        </div>
      </div>

      {mode === "tree" ? (
        <div className="tree-view">
          {itemGroups.map((group) => (
            <GroupNode key={group.id} group={group} />
          ))}
        </div>
      ) : null}

      {mode === "list" ? (
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>المجموعة</th>
                <th>عدد الأصناف</th>
                <th>المخزن الافتراضي</th>
                <th>القالب الضريبي</th>
              </tr>
            </thead>
            <tbody>
              {flatGroups.map((group) => (
                <tr key={group.id}>
                  <td>{group.name}</td>
                  <td>{group.itemCount}</td>
                  <td>{group.defaultWarehouse ?? "حسب الصنف"}</td>
                  <td>{group.taxTemplate ?? "غير محدد"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {mode === "cards" ? (
        <div className="group-cards">
          {flatGroups.map((group) => (
            <article key={group.id} className="group-card">
              <strong>{group.name}</strong>
              <span>{group.itemCount} صنف</span>
              <small>{group.defaultWarehouse ?? "مخزن حسب الصنف"}</small>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function GroupNode({ group }: { group: ItemGroupNode }) {
  return (
    <div className="tree-node">
      <div className="tree-node-label">
        <strong>{group.name}</strong>
        <span>{group.itemCount} صنف</span>
        {group.defaultWarehouse ? <small>{group.defaultWarehouse}</small> : null}
        {group.taxTemplate ? <small>{group.taxTemplate}</small> : null}
      </div>
      {group.children?.length ? (
        <div className="tree-children">
          {group.children.map((child) => (
            <GroupNode key={child.id} group={child} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function flattenGroups(groups: ItemGroupNode[]): ItemGroupNode[] {
  return groups.flatMap((group) => [group, ...flattenGroups(group.children ?? [])]);
}
