// components/ui/Card.tsx
import React from "react";
import { View } from "react-native";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <View
      className={`bg-white p-4 rounded-2xl shadow-sm border border-gray-100 ${className}`}
    >
      {children}
    </View>
  );
}