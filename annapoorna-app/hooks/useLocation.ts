// hooks/useLocation.ts
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export function useLocation() {
  // Renamed 'coords' to 'location' to match component usage
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    (async () => {
      try {
        // Request permissions
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setError("Permission to access location denied");
          setLoading(false);
          return;
        }

        // Get location
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
        });
      } catch (err: any) {
        setError(err.message || "Failed to get location");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { location, error, loading };
}