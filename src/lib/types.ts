export type CompanyOption = {
  id: string;
  name: string;
  country: string;
  currency: string;
  timezone: string;
  fiscalYearStart: string;
};

export type InventoryPoint = {
  label: string;
  stockIn: number;
  stockOut: number;
  value: number;
};

export type ItemSummary = {
  id: string;
  sku: string;
  name: string;
  group: string;
  warehouse: string;
  uom: string;
  stock: number;
  reorderLevel: number;
  valuationMethod: "FIFO" | "Moving Average";
  maintainsStock: boolean;
  canSell: boolean;
  canBuy: boolean;
  quality: "none" | "optional" | "required";
  barcode?: string;
  leadTimeDays?: number;
  disabled?: boolean;
};

export type NewItemInput = {
  sku: string;
  name: string;
  group: string;
  warehouse: string;
  uom: string;
  stock: number;
  reorderLevel: number;
  valuationMethod: "FIFO" | "Moving Average";
  maintainsStock: boolean;
  canSell: boolean;
  canBuy: boolean;
  quality: "none" | "optional" | "required";
  barcode?: string;
  leadTimeDays?: number;
};

export type ItemGroupNode = {
  id: string;
  name: string;
  itemCount: number;
  defaultWarehouse?: string;
  taxTemplate?: string;
  children?: ItemGroupNode[];
};

export type BundleSummary = {
  id: string;
  name: string;
  virtualSku: string;
  stockMode: string;
  components: {
    name: string;
    qty: number;
    uom: string;
  }[];
};

export type PriceRule = {
  id: string;
  item: string;
  list: string;
  type: "بيع" | "شراء";
  uom: string;
  customer?: string;
  price: number;
  currency: string;
  validFrom?: string;
  validTo?: string;
};

export type ActivityEntry = {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  comment?: string;
};

export type SearchRecord = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  type: "مستند" | "صنف" | "إعداد" | "وحدة";
};
