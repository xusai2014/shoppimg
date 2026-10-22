import { Container, Stack, Button, Typography, Box } from "@mui/material";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import type { Locale } from "@/i18n/config";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack
        sx={{
          py: { xs: 5, md: 8 }, px: { xs: 3, md: 8 }, borderRadius: { xs: 3, md: 4 }, color: "#fff",
          background: "linear-gradient(120deg,#e8532f,#f9a825)",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={900}
          gutterBottom
          sx={{ fontSize: { xs: 30, sm: 40, md: 48 }, lineHeight: 1.2 }}
        >
          {dict.home.heroTitle}
        </Typography>
        <Typography variant="h6" fontWeight={400} sx={{ opacity: 0.9, mb: 3, fontSize: { xs: 15, md: 20 } }}>
          {dict.home.heroSubtitle}
        </Typography>
        <Button component={Link} href={`/${locale}/products`} variant="contained" color="inherit" sx={{ alignSelf: "flex-start", px: 4 }}>
          {dict.home.shopNow}
        </Button>
      </Stack>

      <Typography variant="h5" fontWeight={700} sx={{ mt: 6, mb: 3 }}>{dict.home.featured}</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", lg: "repeat(3,1fr)", xl: "repeat(4,1fr)" }, gap: { xs: 2.5, sm: 3 }, "& > *": { minWidth: 0 } }}>
        {products.slice(0, 8).map((p) => (
          <ProductCard key={p.id} product={p} locale={locale} sku={p.skus[0]} />
        ))}
      </Box>
    </Container>
  );
}
