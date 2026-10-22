import CheckoutSuccessClient from "@/components/CheckoutSuccessClient";
import type { Locale } from "@/i18n/config";

export default async function CheckoutSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  return <CheckoutSuccessClient locale={raw as Locale} />;
}
