export const formatCurrency = (value: number, currency = "ILS") =>
  new Intl.NumberFormat("ar", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("ar", {
    maximumFractionDigits: 2
  }).format(value);

export const ratio = (value: number, max: number) => {
  if (max <= 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, (value / max) * 100));
};
