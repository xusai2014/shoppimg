import { createTheme } from "@mui/material/styles";

export function createAppTheme(locale: string) {
  return createTheme({
    palette: {
      mode: "light",
      primary: { main: "#e8532f" },
      secondary: { main: "#1a1a2e" },
      background: { default: "#f6f6f8", paper: "#ffffff" },
    },
    typography: {
      fontFamily: locale === "zh" ? '"PingFang SC","Microsoft YaHei",Roboto,"Helvetica Neue",sans-serif' : "Roboto,system-ui,sans-serif",
      h4: { fontWeight: 700 },
      h6: { fontWeight: 700 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: { styleOverrides: { root: { textTransform: "none", borderRadius: 10 } } },
      MuiCard: { styleOverrides: { root: { boxShadow: "0 2px 12px rgba(0,0,0,0.06)" } } },
    },
  });
}
