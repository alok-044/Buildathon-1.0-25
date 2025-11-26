// components/map/MapView.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

export interface ListingLocation {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
}

interface AppMapProps {
  listings?: ListingLocation[];
  onMarkerPress?: (id: string) => void;
  height?: number;
  defaultRegion?: Region;
  zoom?: number; // Added missing prop definition
  lat?: number;  // Added missing prop definition
  lng?: number;  // Added missing prop definition
  children?: React.ReactNode; // For custom markers like ListingMapMarker
  radius?: number;
}

export default function AppMap({
  listings = [],
  onMarkerPress,
  height = 350,
  defaultRegion = {
    latitude: 20.5937, // India center
    longitude: 78.9629,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  },
  children, // Allow children to be rendered (for custom markers)
}: AppMapProps) {
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setRegion(defaultRegion);
    }, 500);
  }, []);

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
        initialRegion={region}
      >
        {/* Render children if provided (like custom ListingMapMarkers) */}
        {children}

        {/* Fallback: Render standard markers if no children but listings exist */}
        {!children && listings.map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            title={item.title}
            onPress={() => onMarkerPress && onMarkerPress(item.id)}
          />
        ))}
      </MapView>
    </View>
  );
}