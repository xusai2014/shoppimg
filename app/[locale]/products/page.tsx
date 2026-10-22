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
  searchParams: Promise<{ q?: string; cat?: string; sort?: string }>;
}) {
  const { locale: raw } = await params;
  const { q = "", cat = "all", sort = "featured" } = await searchParams;
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const kw = q.trim().toLowerCase();
  const list = products
    .filter((p) => {
      const inCat = cat === "all" || p.category[locale].toLowerCase() === cat;
      const inKw =
        !kw ||
        p.name[locale].toLowerCase().includes(kw) ||
        p.description[locale].toLowerCase().includes(kw) ||
        p.category[locale].toLowerCase().includes(kw);
      return inCat && inKw;
    })
    .sort((a, b) =>
      sort === "price-asc" ? a.basePrice - b.basePrice
      : sort === "price-desc" ? b.basePrice - a.basePrice
      : sort === "rating" ? b.rating - a.rating
      : 0
    );

  const sorts: { key: string; label: string }[] = [
    { key: "featured", label: dict.search.sortFeatured },
    { key: "rating", label: dict.search.sortRating },
    { key: "price-asc", label: dict.search.sortPriceAsc },
    { key: "price-desc", label: dict.search.sortPriceDesc },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {kw ? `${dict.search.title}: "${q}"` : dict.search.all}
      </Typography>
      <Box component="form" method="get" action={`/${locale}/products`} sx={{ my: 2 }}>
        <input type="hidden" name="cat" value={cat} />
        <input type="hidden" name="sort" value={sort} />
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
      <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: "wrap", gap: 1, alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">{dict.search.sort}:</Typography>
        {sorts.map((s) => {
          const href = `/${locale}/products?cat=${cat}&sort=${s.key}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
          return (
            <Chip
              key={s.key}
              component={Link}
              href={href}
              label={s.label}
              size="small"
              color={s.key === sort ? "secondary" : "default"}
              variant={s.key === sort ? "filled" : "outlined"}
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
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", lg: "repeat(3,1fr)", xl: "repeat(4,1fr)" }, gap: { xs: 2.5, sm: 3 }, "& > *": { minWidth: 0 } }}>
          {list.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} sku={p.skus[0]} />
          ))}
        </Box>
      )}
    </Container>
  );
}
