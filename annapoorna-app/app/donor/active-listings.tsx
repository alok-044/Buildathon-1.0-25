// mobile/app/donor/active-listings.tsx
import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useListings } from "../../hooks/useListings";
import ListingCard from "../../components/listing/ListingCard";
import { COLORS } from "../../utils/constants";

export default function ActiveListings() {
  const { myListings, fetchMyListings, loading } = useListings();

  const loadData = useCallback(() => {
    fetchMyListings();
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ padding: 24, paddingBottom: 10 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: COLORS.primary }}>
          My Active Listings
        </Text>
      </View>

      {loading && myListings.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: 24 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadData} />
          }
        >
          {myListings.length === 0 ? (
            <Text style={{ textAlign: "center", color: COLORS.textGray, marginTop: 40 }}>
              You have no active listings.
            </Text>
          ) : (
            myListings.map((listing: any) => (
              <TouchableOpacity
                key={listing.id}
                onPress={() =>
                  router.push(`/donor/listing-details?id=${listing.id}`)
                }
              >
                <ListingCard listing={listing} />
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}
