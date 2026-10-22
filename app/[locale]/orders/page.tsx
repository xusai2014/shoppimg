import OrdersClient from "@/components/OrdersClient";
import type { Locale } from "@/i18n/config";

export default async function OrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  return <OrdersClient locale={raw as Locale} />;
}
