"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar, Toolbar, Container, Typography, Button, Badge, Box, IconButton, Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { useCart } from "@/context/CartContext";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const { count } = useCart();
  const path = (p: string) => `/${locale}${p}`;
  const other: Locale = locale === "zh" ? "en" : "zh";
  const switchedPath = pathname ? pathname.replace(new RegExp(`^/${locale}`), `/${other}`) : `/${other}`;

  const navItems = [
    { href: path(""), label: dict.nav.home, icon: <HomeIcon /> },
    { href: path("/products"), label: dict.nav.products, icon: <GridViewIcon /> },
    { href: path("/orders"), label: dict.nav.orders, icon: <ReceiptLongIcon /> },
  ];

  return (
    <AppBar position="sticky" color="inherit" elevation={1} sx={{ bgcolor: "background.paper" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: { xs: 1, md: 2 }, minHeight: { xs: 56, md: 64 } }}>
          <Link href={path("")} style={{ textDecoration: "none" }}>
            <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 900, fontSize: { xs: 18, md: 24 } }}>
              CYG&nbsp;Mall
            </Typography>
          </Link>

          {/* 桌面端：文字导航 */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}>
            {navItems.map((n) => (
              <Button key={n.href} component={Link} href={n.href} color="inherit">{n.label}</Button>
            ))}
          </Box>

          {/* 移动端：图标导航 */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, gap: 0.5, justifyContent: "flex-end" }}>
            {navItems.map((n) => (
              <Tooltip key={n.href} title={n.label}>
                <IconButton component={Link} href={n.href} color="inherit" size="small">{n.icon}</IconButton>
              </Tooltip>
            ))}
          </Box>

          <Button component={Link} href={switchedPath} variant="outlined" size="small" sx={{ minWidth: 56, px: { xs: 1, md: 2 } }}>
            {other.toUpperCase()}
          </Button>

          <Badge badgeContent={count} color="primary">
            {/* 桌面端：文字+图标 */}
            <Button
              component={Link}
              href={path("/cart")}
              color="inherit"
              startIcon={<ShoppingCartIcon />}
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              {dict.nav.cart}
            </Button>
            {/* 移动端：仅图标 */}
            <IconButton component={Link} href={path("/cart")} color="inherit" sx={{ display: { xs: "inline-flex", md: "none" } }}>
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
