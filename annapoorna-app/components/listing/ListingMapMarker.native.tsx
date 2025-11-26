// components/listing/ListingMapMarker.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { Marker } from "react-native-maps";

export interface ListingMapMarkerProps {
  listing: {
    id: string;
    lat: number;
    lng: number;
    title: string;
    quantity: string | number;
  };
  onPress?: (id: string) => void;
}

export default function ListingMapMarker({
  listing,
  onPress,
}: ListingMapMarkerProps) {
  return (
    <Marker
      coordinate={{ latitude: listing.lat, longitude: listing.lng }}
      onPress={() => onPress?.(listing.id)}
    >
      <Pressable className="items-center">
        {/* Marker Bubble */}
        <View className="bg-green-600 px-3 py-1 rounded-xl shadow-md">
          <Text className="text-white font-semibold">{listing.title}</Text>
          <Text className="text-white text-xs mt-1">
            {listing.quantity}
          </Text>
        </View>

        {/* Pointer */}
        <View className="w-3 h-3 bg-green-600 rotate-45 mt-1" />
      </Pressable>
    </Marker>
  );
}