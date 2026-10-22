"use client";

import Link from "next/link";
import { Container, Stack, Typography, Button, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function CheckoutSuccessClient({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 96 }} />
      </motion.div>
      <Typography variant="h4" fontWeight={900} sx={{ mt: 2 }}>{dict.checkout.success}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>{dict.checkout.successDesc}</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button component={Link} href={`/${locale}/orders`} variant="contained">{dict.checkout.viewOrders}</Button>
          <Button component={Link} href={`/${locale}/products`} variant="outlined">{dict.cart.goShopping}</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
