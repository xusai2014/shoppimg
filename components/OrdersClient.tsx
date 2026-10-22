"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Stack, Paper, Divider } from "@mui/material";
import { getOrders, type Order } from "@/lib/orders";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function OrdersClient({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => setOrders(getOrders()), []);
  const currency = dict.common.currency;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>{dict.orders.title}</Typography>
      {orders.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 8, textAlign: "center" }}>{dict.orders.empty}</Typography>
      ) : (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {orders.map((o) => (
            <Paper key={o.id} variant="outlined" sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" flexWrap="wrap" useFlexGap>
                <Typography variant="body2" color="text.secondary">
                  {dict.orders.orderNo}: {o.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dict.orders.date}: {new Date(o.createdAt).toLocaleString()}
                </Typography>
              </Stack>
              <Divider sx={{ my: 1.5 }} />
              {o.items.map((it, i) => (
                <Typography key={i} variant="body2">
                  {(locale === "zh" ? it.nameZh : it.nameEn)} × {it.qty} — {currency}{(it.unitPrice * it.qty).toLocaleString()}
                </Typography>
              ))}
              <Divider sx={{ my: 1.5 }} />
              <Stack direction="row" justifyContent="space-between" flexWrap="wrap" useFlexGap>
                <Typography variant="body2" color="text.secondary">
                  {o.address.name} · {o.address.phone} · {o.address.detail}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontWeight={700} color="primary.main">{currency}{o.total.toLocaleString()}</Typography>
                  <Typography variant="caption" color="success.main">{dict.orders.status}</Typography>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Container>
  );
}
