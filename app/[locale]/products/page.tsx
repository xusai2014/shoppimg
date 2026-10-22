import { Container, TextField, Typography, Stack, Chip, Box } from "@mui/material";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import type { Locale } from "@/i18n/config";

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { locale: raw } = await params;
  const { q = "", cat = "all" } = await searchParams;
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const kw = q.trim().toLowerCase();
  const list = products.filter((p) => {
    const inCat = cat === "all" || p.category[locale].toLowerCase() === cat;
    const inKw =
      !kw ||
      p.name[locale].toLowerCase().includes(kw) ||
      p.description[locale].toLowerCase().includes(kw) ||
      p.category[locale].toLowerCase().includes(kw);
    return inCat && inKw;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {kw ? `${dict.search.title}: "${q}"` : dict.search.all}
      </Typography>
      <Box component="form" method="get" action={`/${locale}/products`} sx={{ my: 2 }}>
        <input type="hidden" name="cat" value={cat} />
        <TextField fullWidth size="small" name="q" defaultValue={q} placeholder={dict.search.placeholder} />
      </Box>
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}>
        {categories.map((c) => {
          const href = `/${locale}/products?cat=${c.value}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
          const active = c.value === cat;
          return (
            <Chip
              key={c.value}
              component={Link}
              href={href}
              label={c[locale]}
              color={active ? "primary" : "default"}
              clickable
            />
          );
        })}
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {list.length} {dict.search.resultCount}
      </Typography>
      {list.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 8, textAlign: "center" }}>{dict.search.empty}</Typography>
      ) : (
        <Stack direction="row" flexWrap="wrap" useFlexGap gap={3}>
          {list.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} sku={p.skus[0]} />
          ))}
        </Stack>
      )}
    </Container>
  );
}
