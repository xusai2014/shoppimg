"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createAppTheme } from "@/theme";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function AppShell({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const theme = createAppTheme(locale);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Header locale={locale} dict={dict} />
        <main style={{ minHeight: "70vh" }}>{children}</main>
      </CartProvider>
    </ThemeProvider>
  );
}
