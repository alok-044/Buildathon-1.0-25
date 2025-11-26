// utils/helpers.ts
import * as FileSystem from 'expo-file-system/legacy'; // Use legacy for Expo 54+

// Calculate distance (km)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// Format timestamp
export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return isToday ? `${time} • Today` : `${time} • ${date.toDateString()}`;
}

// Validate email
export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

// Convert file to base64 (THE MISSING FUNCTION)
export async function fileToBase64(fileUri: string): Promise<string> {
  try {
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: 'base64',
    });
    return base64;
  } catch (error) {
    console.error("Error converting file to base64:", error);
    throw error;
  }
}