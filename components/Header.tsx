"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar, Toolbar, Container, Typography, Button, Badge, Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { useCart } from "@/context/CartContext";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const { count } = useCart();
  const path = (p: string) => `/${locale}${p}`;
  const other: Locale = locale === "zh" ? "en" : "zh";
  const switchedPath = pathname ? pathname.replace(new RegExp(`^/${locale}`), `/${other}`) : `/${other}`;

  return (
    <AppBar position="sticky" color="inherit" elevation={1} sx={{ bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2, minHeight: 64 }}>
          <Link href={path("")} style={{ textDecoration: "none" }}>
            <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 900 }}>CYG Mall</Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
            <Button component={Link} href={path("")} color="inherit">{dict.nav.home}</Button>
            <Button component={Link} href={path("/products")} color="inherit">{dict.nav.products}</Button>
            <Button component={Link} href={path("/orders")} color="inherit">{dict.nav.orders}</Button>
          </Box>
          <Button component={Link} href={switchedPath} variant="outlined" size="small">
            {other.toUpperCase()}
          </Button>
          <Badge badgeContent={count} color="primary">
            <Button component={Link} href={path("/cart")} color="inherit" startIcon={<ShoppingCartIcon />}>
              {dict.nav.cart}
            </Button>
          </Badge>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
