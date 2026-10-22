import CartPageClient from "@/components/CartPageClient";
import type { Locale } from "@/i18n/config";

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  return <CartPageClient locale={raw as Locale} />;
}
