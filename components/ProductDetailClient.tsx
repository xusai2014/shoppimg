"use client";

import { formatPrice } from "@/lib/orders";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container, Stack, Box, Typography, Rating, Button, Chip, Divider, Snackbar, Alert, Paper, AppBar, Toolbar,
} from "@mui/material";
import { motion } from "framer-motion";
import { getProduct } from "@/data/products";
import { getDictionary } from "@/i18n/dictionaries";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/i18n/config";

export default function ProductDetailClient({ id, locale }: { id: string; locale: Locale }) {
  const dict = getDictionary(locale);
  const product = getProduct(id);
  const [skuId, setSkuId] = useState(product?.skus[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  if (!product) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h6">404</Typography>
      </Container>
    );
  }

  const sku = product.skus.find((s) => s.id === skuId) ?? product.skus[0];
  const price = product.basePrice + sku.priceDelta;
  const currency = dict.common.currency;

  const add = () => {
    addItem(product.id, sku.id, qty);
    setToast(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, pb: { xs: 10, md: 4 } }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          style={{ flex: 1 }}
        >
          <Box
            sx={{
              height: { xs: 260, md: 380 }, borderRadius: { xs: 3, md: 4 }, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: { xs: 96, md: 140 }, background: product.gradient,
            }}
          >
            {product.emoji}
          </Box>
        </motion.div>

        <Stack spacing={2} sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1}>
            {product.tags[locale].map((t) => (
              <Chip key={t} label={t} size="small" color="secondary" variant="outlined" />
            ))}
          </Stack>
          <Typography variant="h4">{product.name[locale]}</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">({product.reviews})</Typography>
            <Chip label={dict.product.inStock} size="small" color="success" variant="outlined" />
          </Stack>
          <Typography variant="h3" color="primary.main" fontWeight={900}>
            {formatPrice(price)}
          </Typography>

          <Divider />
          <Typography fontWeight={700}>{dict.product.selectSku}</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {product.skus.map((s) => (
              <Chip
                key={s.id}
                label={`${s.label[locale]} · ${formatPrice(product.basePrice + s.priceDelta)}`}
                color={s.id === sku.id ? "primary" : "default"}
                variant={s.id === sku.id ? "filled" : "outlined"}
                onClick={() => setSkuId(s.id)}
                clickable
              />
            ))}
          </Stack>

          <Typography fontWeight={700}>{dict.product.quantity}</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="outlined" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</Button>
            <Paper variant="outlined" sx={{ px: 3, py: 0.5 }}>{qty}</Paper>
            <Button variant="outlined" onClick={() => setQty((q) => Math.min(sku.stock, q + 1))}>+</Button>
            <Typography variant="body2" color="text.secondary">/ {sku.stock}</Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="outlined" size="large" onClick={add}>{dict.product.addToCart}</Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                addItem(product.id, sku.id, qty);
                router.push(`/${locale}/checkout`);
              }}
            >
              {dict.product.buyNow}
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" gutterBottom>{dict.product.description}</Typography>
        <Typography color="text.secondary">{product.description[locale]}</Typography>
        <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>{dict.product.specs}</Typography>
        <Typography color="text.secondary">
          {product.category[locale]} · {sku.label[locale]} · {dict.product.inStock}
        </Typography>
      </Box>

      {/* 移动端吸底购买栏：随时可达的加购动作 */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={2}
        sx={{ top: "auto", bottom: 0, display: { xs: "block", md: "none" }, bgcolor: "background.paper" }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" color="primary.main" fontWeight={900} sx={{ flex: 1 }}>
            {formatPrice(price)}
          </Typography>
          <Button variant="outlined" onClick={add}>{dict.product.addToCart}</Button>
          <Button
            variant="contained"
            onClick={() => {
              addItem(product.id, sku.id, qty);
              router.push(`/${locale}/checkout`);
            }}
          >
            {dict.product.buyNow}
          </Button>
        </Toolbar>
      </AppBar>

      <Snackbar open={toast} autoHideDuration={2000} onClose={() => setToast(false)}>
        <Alert severity="success" onClose={() => setToast(false)}>{dict.product.added}</Alert>
      </Snackbar>
    </Container>
  );
}
