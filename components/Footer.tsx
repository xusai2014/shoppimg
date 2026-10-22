import { Container, Typography } from "@mui/material";

export default function Footer({ locale }: { locale: string }) {
  return (
    <Container maxWidth="xl" sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} CYG Mall · Next.js + MUI · {locale.toUpperCase()} demo
      </Typography>
    </Container>
  );
}
