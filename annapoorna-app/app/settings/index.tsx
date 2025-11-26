// mobile/app/settings/index.tsx
import React from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { COLORS } from "../../utils/constants";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "700",
          marginTop: 20,
          color: COLORS.primary,
        }}
      >
        Settings
      </Text>

      {/* Account Section */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
          Account
        </Text>

        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderColor: "#eee",
          }}
          onPress={() => router.push("/profile")}
        >
          <Text style={{ fontSize: 18 }}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderColor: "#eee",
          }}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={{ fontSize: 18 }}>Change Password</Text>
        </TouchableOpacity>
      </View>

      {/* Preferences */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
          Preferences
        </Text>

        <View
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderColor: "#eee",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18 }}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={(val) => setNotifications(val)}
          />
        </View>

        <View
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderColor: "#eee",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18 }}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={(val) => setDarkMode(val)} />
        </View>
      </View>

      {/* Others */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
          Others
        </Text>

        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderColor: "#eee",
          }}
          onPress={() => router.push("/support")}
        >
          <Text style={{ fontSize: 18 }}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderColor: "#eee",
          }}
        >
          <Text style={{ fontSize: 18 }}>Terms & Privacy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
