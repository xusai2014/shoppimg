export type OrderItem = { productId: string; skuId: string; qty: number; nameZh: string; nameEn: string; unitPrice: number };
export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
  address: { name: string; phone: string; detail: string };
};

const KEY = "cyg-mall-orders";

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
