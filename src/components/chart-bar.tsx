import { formatCurrency, ratio } from "@/lib/format";
import type { InventoryPoint } from "@/lib/types";

export function ChartBar({ data }: { data: InventoryPoint[] }) {
  const maxMovement = Math.max(...data.map((point) => Math.max(point.stockIn, point.stockOut)));
  const maxValue = Math.max(...data.map((point) => point.value));

  return (
    <div className="inventory-chart" aria-label="مخطط حركة المخزون">
      {data.map((point) => (
        <div className="chart-column" key={point.label}>
          <div className="chart-bars">
            <span
              className="bar bar-in"
              style={{ height: `${Math.max(10, ratio(point.stockIn, maxMovement))}%` }}
              title={`وارد ${point.stockIn}`}
            />
            <span
              className="bar bar-out"
              style={{ height: `${Math.max(10, ratio(point.stockOut, maxMovement))}%` }}
              title={`صادر ${point.stockOut}`}
            />
            <span
              className="bar bar-value"
              style={{ height: `${Math.max(10, ratio(point.value, maxValue))}%` }}
              title={formatCurrency(point.value)}
            />
          </div>
          <small>{point.label}</small>
        </div>
      ))}
    </div>
  );
}
