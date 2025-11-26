// components/map/MapView.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

export interface ListingLocation {
  id: string;
  title: string;
  latitude: number; // Note: In context we use lat, but MapView usually uses latitude. 
  longitude: number;
}

interface AppMapProps {
  listings?: ListingLocation[];
  onMarkerPress?: (id: string) => void;
  height?: number;
  zoom?: number;
  lat?: number;
  lng?: number;
  children?: React.ReactNode;
}

export default function AppMap({
  listings = [],
  onMarkerPress,
  height = 350,
  zoom = 0.05, // Default zoom level
  lat,
  lng,
  children,
}: AppMapProps) {
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    // FIX: If specific lat/lng is provided, use it. Otherwise use default.
    if (lat && lng) {
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: zoom,
        longitudeDelta: zoom,
      });
    } else {
      setRegion({
        latitude: 20.5937,
        longitude: 78.9629,
        latitudeDelta: 5,
        longitudeDelta: 5,
      });
    }
  }, [lat, lng]);

  if (!region) {
    return (
      <View className="w-full flex items-center justify-center" style={{ height }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="w-full overflow-hidden rounded-2xl" style={{ height }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        region={region} // Use region prop directly to allow updates
      >
        {children}

        {/* Fallback: Render markers if listings array is passed directly */}
        {!children && listings.map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude || (item as any).lat, // Handle both naming conventions
              longitude: item.longitude || (item as any).lng,
            }}
            title={item.title}
            onPress={() => onMarkerPress && onMarkerPress(item.id)}
          />
        ))}

        {/* FIX: If single lat/lng provided without children, show a single marker */}
        {!children && lat && lng && listings.length === 0 && (
             <Marker coordinate={{ latitude: lat, longitude: lng }} />
        )}
      </MapView>
    </View>
  );
}