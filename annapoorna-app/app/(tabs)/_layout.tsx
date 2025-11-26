// mobile/app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Home, MessageSquare, Bell, User } from "lucide-react-native";
import { COLORS } from "../../utils/constants";
import { useAuth } from "../../hooks/useAuth";
import { ActivityIndicator, View } from "react-native";

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const isDonor = user?.role === "donor";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDonor ? COLORS.primary : COLORS.secondary,
        tabBarInactiveTintColor: "#999",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#eee",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: isDonor ? "Dashboard" : "Explore",
          // FIX: Destructure color and size here
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />

      {/* Activity Tab (Receiver Only) */}
      <Tabs.Screen
        name="activity"
        options={{
          href: isDonor ? null : "/(tabs)/activity",
          tabBarLabel: "Activity",
          // FIX: Destructure here
          tabBarIcon: ({ color, size }) => (
            <Bell color={color} size={size} />
          ),
        }}
      />

      {/* Messages Tab (Donor Only) */}
      <Tabs.Screen
        name="messages"
        options={{
          tabBarLabel: "Messages",
          // FIX: Destructure here
          tabBarIcon: ({ color, size }) => (
            <MessageSquare color={color} size={size} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          // FIX: Destructure here
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}