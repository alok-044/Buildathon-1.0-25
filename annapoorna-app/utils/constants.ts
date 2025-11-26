export const API_BASE_URL = "http://192.168.1.237:5001/api"; 
export const SOCKET_URL = "http://192.168.1.237:5001";

export const GOOGLE_API_KEY = "AIzaSyBxITw16Qqc5s10QJYvzlv0Cq0TRf8316Y"; 

export const COLORS = {
  // Web Brand Colors
  primary: "#16A34A",      // Brand Green (Tailwind green-600)
  primaryDark: "#15803d",  // Darker Green
  primaryLight: "#DCFCE7", // green-100
  
  secondary: "#EA580C",    // Brand Orange (Tailwind orange-600)
  secondaryDark: "#C2410C",
  secondaryLight: "#FFEDD5", // orange-100

  // Functional Colors
  danger: "#EF4444",
  warning: "#F59E0B",
  success: "#10B981",
  
  // Neutrals
  dark: "#111827",       // gray-900
  text: "#1F2937",       // gray-800
  textGray: "#6B7280",   // gray-500
  border: "#E5E7EB",     // gray-200
  background: "#F9FAFB", // gray-50
  white: "#FFFFFF",
  
  // Specific UI backgrounds
  cardBg: "#FFFFFF",
  inputBg: "#F9FAFB",
};

export const ROLES = {
  DONOR: "donor",
  RECEIVER: "receiver",
};

export const MAP_DEFAULT = {
  latitude: 20.5937,
  longitude: 78.9629,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export const SOCKET_EVENTS = {
  NEW_LISTING: "NEW_LISTING",
  CLAIM_LISTING: "CLAIM_LISTING",
  MESSAGE: "MESSAGE",
};

export const STORAGE_KEYS = {
  TOKEN: "APP_TOKEN",
  USER: "APP_USER",
};