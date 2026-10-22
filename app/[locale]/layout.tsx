import { notFound } from "next/navigation";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { isLocale, locales, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <AppRouterCacheProvider options={{ key: locale }}>
          <AppShell locale={locale} dict={dict}>
            {children}
          </AppShell>
          <Footer locale={locale} />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
