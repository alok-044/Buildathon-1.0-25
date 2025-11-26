// mobile/app/donor/listing-details.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useListings } from "../../hooks/useListings";
import { COLORS } from "../../utils/constants";
import MapView from "../../components/map/MapView.native";

export default function DonorListingDetails() {
  const { id } = useLocalSearchParams();
  const { getListingById } = useListings();

  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadListing = async () => {
    setLoading(true);
    const data = await getListingById(id as string);
    setListing(data);
    setLoading(false);
  };

  useEffect(() => {
    loadListing();
  }, [id]);

  if (loading || !listing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Food Image */}
      <Image
        source={{ uri: listing.image }}
        style={{
          width: "100%",
          height: 250,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      />

      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 10 }}>
          {listing.title}
        </Text>

        {/* STATUS */}
        <Text
          style={{
            backgroundColor:
              listing.status === "claimed"
                ? "#ffd966"
                : listing.status === "completed"
                ? "#8be78b"
                : "#b3daff",
            padding: 8,
            borderRadius: 8,
            alignSelf: "flex-start",
            marginBottom: 14,
          }}
        >
          {listing.status.toUpperCase()}
        </Text>

        {/* DETAILS */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ color: COLORS.textGray }}>Category</Text>
          <Text style={{ fontSize: 16 }}>{listing.category}</Text>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ color: COLORS.textGray }}>Quantity</Text>
          <Text style={{ fontSize: 16 }}>{listing.quantity} servings</Text>
        </View>

        {/* CLAIMED INFO */}
        {listing.status === "claimed" && listing.claimedBy && (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: COLORS.textGray }}>Claimed By:</Text>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {listing.claimedBy.name}
            </Text>
          </View>
        )}

        {/* MAP */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
            Pickup Location
          </Text>

          <MapView
            lat={listing.lat}
            lng={listing.lng}
            height={200}
            radius={200}
          />
        </View>
      </View>
    </ScrollView>
  );
}
