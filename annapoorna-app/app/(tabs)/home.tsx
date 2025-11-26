import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Image,
  ActivityIndicator, RefreshControl, SafeAreaView, StatusBar
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useAuth } from "../../hooks/useAuth";
import { useListings } from "../../hooks/useListings";
import { COLORS } from "../../utils/constants";
import ListingCard from "../../components/listing/ListingCard";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const { listings, myListings, loading, fetchAllListings, fetchMyListings } = useListings();
  const [refreshing, setRefreshing] = useState(false);

  const isDonor = user?.role === "donor";

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (isDonor) {
      await fetchMyListings();
    } else {
      await fetchAllListings();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Hello, {user?.name?.split(" ")[0]} 👋</Text>
        <Text style={styles.subGreeting}>
          {isDonor ? "Share food, save lives." : "Find fresh food nearby."}
        </Text>
      </View>
      {/* Avatar Placeholder */}
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{user?.name?.charAt(0)}</Text>
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionContainer}>
        {isDonor ? (
             <TouchableOpacity onPress={() => router.push("/donor/create-listing")} activeOpacity={0.9}>
                <LinearGradient
                    colors={[COLORS.secondary, "#C2410C"]} // Orange for Donors
                    start={{x:0, y:0}} end={{x:1, y:0}}
                    style={styles.actionButton}
                >
                    <Ionicons name="add-circle-outline" size={24} color="white" />
                    <Text style={styles.actionText}>Donate Food</Text>
                </LinearGradient>
             </TouchableOpacity>
        ) : (
             <TouchableOpacity onPress={() => router.push("/receiver/explore")} activeOpacity={0.9}>
                <LinearGradient
                    colors={[COLORS.primary, "#15803d"]} // Green for Receivers
                    start={{x:0, y:0}} end={{x:1, y:0}}
                    style={styles.actionButton}
                >
                    <Ionicons name="map-outline" size={24} color="white" />
                    <Text style={styles.actionText}>Explore Map</Text>
                </LinearGradient>
             </TouchableOpacity>
        )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <FlatList
        data={isDonor ? myListings : listings}
        renderItem={({ item }) => (
            <ListingCard 
                listing={item} 
                onPress={() => router.push(isDonor ? `/donor/listing-details?id=${item.id}` : `/receiver/listing-details?id=${item.id}`)}
            />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
            <>
                {renderHeader()}
                {renderActionButtons()}
                <Text style={styles.sectionTitle}>
                    {isDonor ? "Your Active Donations" : "Recently Listed"}
                </Text>
            </>
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="basket-outline" size={64} color="#E5E7EB" />
              <Text style={styles.emptyText}>
                {isDonor 
                  ? "You haven't listed any food yet." 
                  : "No food listings found nearby."}
              </Text>
            </View>
          ) : <ActivityIndicator style={{marginTop: 50}} color={COLORS.primary} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", 
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.dark,
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 15,
    color: COLORS.textGray,
    marginTop: 4,
    fontWeight: "500",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  actionContainer: {
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 16,
  },
  listContent: {
    padding: 20,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#9CA3AF",
    marginTop: 12,
  },
});