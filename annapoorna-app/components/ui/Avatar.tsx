// components/ui/Avatar.tsx
import React from "react";
import { Image, View, Text } from "react-native";

interface AvatarProps {
  uri?: string;
  size?: number;
  name?: string; // fallback to initials
}

export default function Avatar({ uri, size = 48, name = "U" }: AvatarProps) {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size }}
        className="rounded-full"
      />
    );
  }

  const initials = name.charAt(0).toUpperCase();

  return (
    <View
      style={{ width: size, height: size }}
      className="rounded-full bg-green-600 flex items-center justify-center"
    >
      <Text className="text-white font-bold text-lg">
        {initials}
      </Text>
    </View>
  );
}