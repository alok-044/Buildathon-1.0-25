// utils/theme.ts
export const theme = {
  colors: {
    primary: "#3B82F6",
    secondary: "#22C55E",
    danger: "#EF4444",
    muted: "#9CA3AF",
    text: "#1F2937",
    background: "#FFFFFF",
  },
  spacing: (value: number) => value * 8,
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
  },
  typography: {
    title: { fontSize: 22, fontWeight: "700" },
    subtitle: { fontSize: 18, fontWeight: "600" },
    body: { fontSize: 16, fontWeight: "400" },
  },
};