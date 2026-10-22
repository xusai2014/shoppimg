"use client";

import { formatPrice } from "@/lib/orders";
import Link from "next/link";
import { Card, CardContent, Box, Typography, Rating, Button } from "@mui/material";
import { motion } from "framer-motion";
import type { Product, Sku } from "@/data/products";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function ProductCard({ product, locale, sku }: { product: Product; locale: Locale; sku?: Sku }) {
  const dict = getDictionary(locale);
  const price = product.basePrice + (sku?.priceDelta ?? 0);
  const currency = dict.common.currency;
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
      <Card
        component={Link}
        href={`/${locale}/products/${product.id}`}
        sx={{ height: "100%", display: "flex", flexDirection: "column", textDecoration: "none", width: { xs: "100%", sm: "calc(50% - 12px)", lg: "calc(33.33% - 16px)", xl: "calc(25% - 18px)" } }}
      >
        <Box
          sx={{
            height: 180,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 72, background: product.gradient,
          }}
        >
          {product.emoji}
        </Box>
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography variant="subtitle1" fontWeight={700} noWrap>{product.name[locale]}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} noWrap>{product.description[locale]}</Typography>
          <Rating value={product.rating} precision={0.1} size="small" readOnly />
          <Box sx={{ mt: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6" color="primary.main">{formatPrice(price)}</Typography>
            <Button size="small" variant="text">{dict.product.addToCart} →</Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
