import ProductDetailClient from "@/components/ProductDetailClient";
import type { Locale } from "@/i18n/config";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: raw, id } = await params;
  return <ProductDetailClient id={id} locale={raw as Locale} />;
}
