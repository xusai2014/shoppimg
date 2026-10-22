"use client";

import Link from "next/link";
import {
  Container, Typography, Stack, Box, Button, IconButton, Paper, Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getProduct } from "@/data/products";
import { getDictionary } from "@/i18n/dictionaries";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/i18n/config";

export default function CartPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { items, updateQty, removeItem, ready } = useCart();
  const currency = dict.common.currency;

  const rows = items
    .map((it) => {
      const p = getProduct(it.productId);
      const sku = p?.skus.find((s) => s.id === it.skuId);
      if (!p || !sku) return null;
      return { ...it, product: p, sku, price: p.basePrice + sku.priceDelta };
    })
    .filter(Boolean) as { productId: string; skuId: string; qty: number; product: NonNullable<ReturnType<typeof getProduct>>; sku: { label: { zh: string; en: string } }; price: number }[];

  const total = rows.reduce((s, r) => s + r.price * r.qty, 0);

  if (!ready) return <Container sx={{ py: 8 }} />;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>{dict.cart.title}</Typography>
      {rows.length === 0 ? (
        <Stack spacing={2} alignItems="center" sx={{ py: 10 }}>
          <Typography color="text.secondary">{dict.cart.empty}</Typography>
          <Button component={Link} href={`/${locale}/products`} variant="contained">{dict.cart.goShopping}</Button>
        </Stack>
      ) : (
        <>
          <Paper variant="outlined" sx={{ mt: 2 }}>
            {rows.map((r, i) => (
              <Box key={`${r.productId}-${r.skuId}`}>
                {i > 0 && <Divider />}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2 }}>
                  <Box sx={{ width: 72, height: 72, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, background: r.product.gradient }}>
                    {r.product.emoji}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography fontWeight={700}>{r.product.name[locale]}</Typography>
                    <Typography variant="body2" color="text.secondary">{r.sku.label[locale]}</Typography>
                    <Typography color="primary.main" fontWeight={700}>{currency}{r.price.toLocaleString()}</Typography>
                  </Box>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Button size="small" variant="outlined" onClick={() => updateQty(r.productId, r.skuId, r.qty - 1)}>−</Button>
                    <Paper variant="outlined" sx={{ px: 1.5, py: 0.25 }}>{r.qty}</Paper>
                    <Button size="small" variant="outlined" onClick={() => updateQty(r.productId, r.skuId, r.qty + 1)}>+</Button>
                  </Stack>
                  <IconButton onClick={() => removeItem(r.productId, r.skuId)} aria-label={dict.cart.remove}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Box>
            ))}
          </Paper>

          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 3 }}>
            <Typography variant="h6">
              {dict.cart.total}: <span style={{ color: "#e8532f" }}>{currency}{total.toLocaleString()}</span>
            </Typography>
            <Button component={Link} href={`/${locale}/checkout`} variant="contained" size="large">
              {dict.cart.checkout}
            </Button>
          </Stack>
        </>
      )}
    </Container>
  );
}
