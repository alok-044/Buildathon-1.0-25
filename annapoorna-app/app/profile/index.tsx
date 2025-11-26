import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useAuth } from "../../hooks/useAuth";
import { COLORS } from "../../utils/constants";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const isDonor = user?.role === "donor";
  const activeColor = isDonor ? COLORS.primary : COLORS.secondary;

  const menuItems = [
    {
      icon: "person-outline",
      label: "Edit Profile",
      action: () => router.push("/profile/edit"), // Navigate to edit screen
    },
    {
      icon: "notifications-outline",
      label: "Notifications",
      action: () => {},
    },
    {
      icon: "settings-outline",
      label: "Settings",
      action: () => router.push("/settings"),
    },
    {
      icon: "help-circle-outline",
      label: "Help & Support",
      action: () => router.push("/support"),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section with Gradient */}
      <LinearGradient
        colors={[isDonor ? COLORS.primaryLight : COLORS.secondaryLight, "#fff"]}
        style={styles.header}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: activeColor }]}>
                <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase()}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.name}>{user?.name || "User"}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          
          <View style={[styles.roleBadge, { backgroundColor: isDonor ? COLORS.primaryLight : COLORS.secondaryLight }]}>
            <Text style={[styles.roleText, { color: activeColor }]}>
              {user?.role?.toUpperCase()}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: activeColor }]}>12</Text>
          <Text style={styles.statLabel}>{isDonor ? "Donations" : "Claims"}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: activeColor }]}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: activeColor }]}>24</Text>
          <Text style={styles.statLabel}>Impact</Text>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.action}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBox, { backgroundColor: isDonor ? "#F0FDF4" : "#FFF7ED" }]}>
              <Ionicons name={item.icon as any} size={22} color={activeColor} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.menuItem, { marginTop: 20, borderBottomWidth: 0 }]}
          onPress={logout}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, { backgroundColor: "#FEF2F2" }]}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
          </View>
          <Text style={[styles.menuLabel, { color: COLORS.danger }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileInfo: {
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.dark,
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: COLORS.textGray,
    marginBottom: 12,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -30,
    paddingVertical: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textGray,
    fontWeight: "500",
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: "#F3F4F6",
  },
  menuContainer: {
    padding: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
});