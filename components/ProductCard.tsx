"use client";

import { formatPrice } from "@/lib/orders";
import Link from "next/link";
import { Card, CardContent, Box, Typography, Rating, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import type { Product, Sku } from "@/data/products";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function ProductCard({ product, locale, sku }: { product: Product; locale: Locale; sku?: Sku }) {
  const dict = getDictionary(locale);
  const price = product.basePrice + (sku?.priceDelta ?? 0);
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} style={{ height: "100%" }}>
      <Card
        component={Link}
        href={`/${locale}/products/${product.id}`}
        sx={{ height: "100%", display: "flex", flexDirection: "column", textDecoration: "none", overflow: "hidden" }}
      >
        <Box
          sx={{
            height: { xs: 200, sm: 180 },
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: { xs: 88, sm: 72 }, background: product.gradient,
            position: "relative",
          }}
        >
          {product.emoji}
          {product.tags[locale][0] && (
            <Chip
              label={product.tags[locale][0]}
              size="small"
              color="primary"
              sx={{ position: "absolute", top: 10, left: 10, fontWeight: 700 }}
            />
          )}
        </Box>
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 0.5, p: { xs: 2, sm: 2.5 } }}>
          <Typography
            fontWeight={700}
            sx={{
              fontSize: { xs: 16, sm: 16 },
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: { xs: 44, sm: 44 },
            }}
          >
            {product.name[locale]}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description[locale]}
          </Typography>
          <Rating value={product.rating} precision={0.1} size="small" readOnly />
          <Box sx={{ mt: "auto", pt: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
            <Typography variant="h6" color="primary.main" fontWeight={900}>{formatPrice(price)}</Typography>
            <Button size="small" variant="contained" sx={{ px: { xs: 2, sm: 2 }, minWidth: 0, whiteSpace: "nowrap" }}>
              {dict.product.addToCart}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
