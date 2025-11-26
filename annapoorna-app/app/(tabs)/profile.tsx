// mobile/app/(tabs)/profile.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { router } from "expo-router";

export default function ProfileTabScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      {/* Header */}
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 30 }}>
        Profile 👤
      </Text>

      {/* Avatar */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          source={{
            uri:
              user?.avatar ||
              "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=User",
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginBottom: 10,
          }}
        />
        <Text style={{ fontSize: 22, fontWeight: "600" }}>
          {user?.name || "User"}
        </Text>
        <Text style={{ fontSize: 16, color: "#777" }}>
          {user?.role?.toUpperCase()}
        </Text>
      </View>

      {/* User Info */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 16, color: "#555" }}>
          Email: {user?.email || "example@mail.com"}
        </Text>
        <Text style={{ fontSize: 16, color: "#555", marginTop: 6 }}>
          Joined: Jan 2025
        </Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        onPress={() => router.push("/profile")}
        style={{
          backgroundColor: "#2e86de",
          padding: 14,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          View / Edit Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/settings")}
        style={{
          backgroundColor: "#20bf6b",
          padding: 14,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          Settings
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: "#eb3b5a",
          padding: 14,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
