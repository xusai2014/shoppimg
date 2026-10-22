export type OrderItem = { productId: string; skuId: string; qty: number; nameZh: string; nameEn: string; unitPrice: number };
export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
  address: { name: string; phone: string; detail: string };
};

const KEY = "cyg-mall-orders";

export const FREE_SHIPPING_THRESHOLD = 99;

/** 面向海外消费者：统一 en-US 美元价格格式（$1,299.00） */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(KEY, JSON.stringify(orders));
}
