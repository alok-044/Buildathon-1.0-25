// mobile/app/donor/dashboard.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function DonorDashboard() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Welcome, {user?.name || "Donor"}</Text>
      <Text style={styles.subtext}>Manage your food donations easily</Text>

      {/* Create Listing */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/donor/create-listing")}
      >
        <Text style={styles.cardTitle}>Create New Listing</Text>
        <Text style={styles.cardSubtitle}>
          Add surplus food available for pickup
        </Text>
      </TouchableOpacity>

      {/* Active Listings */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/donor/active-listings")}
      >
        <Text style={styles.cardTitle}>Active Listings</Text>
        <Text style={styles.cardSubtitle}>
          View listings currently open for receivers
        </Text>
      </TouchableOpacity>

      {/* Listing History */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/donor/history")}
      >
        <Text style={styles.cardTitle}>Donation History</Text>
        <Text style={styles.cardSubtitle}>
          Track previous food donations and impact
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// -------------------------------
// Styles
// -------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2e7d32",
    marginTop: 10,
  },
  subtext: {
    marginTop: 6,
    fontSize: 15,
    color: "#555",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#f1f8f3",
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#d6e9d8",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2e7d32",
  },
  cardSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
  },
});
