import { createTheme } from "@mui/material/styles";

export function createAppTheme(locale: string) {
  return createTheme({
    /**
     * 响应式断点（参考 MUI 默认体系，共 4 档设备方案）：
     *  - xs  0+    手机（1 列）
     *  - sm  600+  平板竖屏（2 列）
     *  - md  900+  平板横屏（过渡档）
     *  - lg  1200+ 小屏 PC（3 列）
     *  - xl  1536+ 大屏 PC（4 列）
     */
    breakpoints: {
      values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },
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
