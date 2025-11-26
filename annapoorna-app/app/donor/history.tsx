import React, { useEffect, useMemo } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useListings } from "../../hooks/useListings";
import ListingCard from "../../components/listing/ListingCard";
import { COLORS } from "../../utils/constants";

export default function DonorHistory() {
  const { myListings, fetchMyListings, loading } = useListings();

  useEffect(() => {
    fetchMyListings();
  }, []);

  // Filter for listings that are NOT "available" (e.g. claimed, completed, expired)
  // Adjust this filter logic based on your actual status values
  const historyListings = useMemo(() => {
    return myListings.filter((item: any) => item.status !== 'available'); 
  }, [myListings]);

  if (loading && myListings.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 20, color: COLORS.primary }}>
        Donation History
      </Text>

      {historyListings.length === 0 ? (
        <View style={{ marginTop: 50, alignItems: "center" }}>
          <Text style={{ fontSize: 16, color: COLORS.textGray }}>
            No past donations found.
          </Text>
        </View>
      ) : (
        <FlatList
          data={historyListings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/donor/listing-details", params: { id: item.id } })}
            >
              <ListingCard listing={item} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}