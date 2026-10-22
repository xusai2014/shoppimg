import CheckoutClient from "@/components/CheckoutClient";
import type { Locale } from "@/i18n/config";

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  return <CheckoutClient locale={raw as Locale} />;
}
