"use client";

import { formatPrice } from "@/lib/orders";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Container, Typography, Stack, Paper, TextField, Button, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Divider, Box,
} from "@mui/material";
import { getProduct } from "@/data/products";
import { getDictionary } from "@/i18n/dictionaries";
import { useCart } from "@/context/CartContext";
import { saveOrder } from "@/lib/orders";
import type { Locale } from "@/i18n/config";

export default function CheckoutClient({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { items, clear, ready } = useCart();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [detail, setDetail] = useState("");
  const [submitting, setSubmitting] = useState(false);
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
  const valid = name.trim() && phone.trim() && detail.trim() && rows.length > 0;

  const submit = () => {
    if (!valid || submitting) return;
    setSubmitting(true);
    saveOrder({
      id: `MOCK${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      items: rows.map((r) => ({
        productId: r.productId, skuId: r.skuId, qty: r.qty,
        nameZh: r.product.name.zh, nameEn: r.product.name.en, unitPrice: r.price,
      })),
      total,
      address: { name: name.trim(), phone: phone.trim(), detail: detail.trim() },
    });
    clear();
    router.push(`/${locale}/checkout/success`);
  };

  if (!ready) return <Container sx={{ py: 8 }} />;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>{dict.checkout.title}</Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mt: 2 }}>
        <Paper variant="outlined" sx={{ p: 3, flex: 1.4 }}>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, fontWeight: 700 }}>{dict.checkout.address}</FormLabel>
            <Stack spacing={2}>
              <TextField label={dict.checkout.name} value={name} onChange={(e) => setName(e.target.value)} required />
              <TextField label={dict.checkout.phone} value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <TextField label={dict.checkout.addressDetail} value={detail} onChange={(e) => setDetail(e.target.value)} required multiline minRows={2} />
            </Stack>
            <FormLabel sx={{ mt: 3, mb: 1, fontWeight: 700 }}>{dict.checkout.payment}</FormLabel>
            <RadioGroup defaultValue="online">
              <FormControlLabel value="online" control={<Radio />} label={dict.checkout.payOnline} />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} disabled={!valid || submitting} onClick={submit}>
            {dict.checkout.submit}
          </Button>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, flex: 1, alignSelf: "flex-start" }}>
          <Typography fontWeight={700} gutterBottom>{dict.checkout.orderSummary}</Typography>
          <Divider sx={{ mb: 2 }} />
          {rows.length === 0 ? (
            <Typography color="text.secondary">{dict.cart.empty}</Typography>
          ) : (
            <Stack spacing={1}>
              {rows.map((r) => (
                <Stack key={`${r.productId}-${r.skuId}`} direction="row" justifyContent="space-between">
                  <Typography variant="body2" noWrap sx={{ maxWidth: "60%" }}>
                    {r.product.name[locale]} × {r.qty}
                  </Typography>
                  <Typography variant="body2">{formatPrice(r.price * r.qty)}</Typography>
                </Stack>
              ))}
              <Divider sx={{ my: 1 }} />
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight={700}>{dict.cart.total}</Typography>
                <Typography fontWeight={700} color="primary.main">{formatPrice(total)}</Typography>
              </Stack>
              <Box component={Link} href={`/${locale}/cart`} sx={{ fontSize: 13 }}>{dict.nav.cart} ←</Box>
            </Stack>
          )}
        </Paper>
      </Stack>
    </Container>
  );
}
