// app/receiver/listing-details.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Alert
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useListings } from "../../hooks/useListings";
import { useAuth } from "../../hooks/useAuth";
import { COLORS } from "../../utils/constants";
import MapView from "../../components/map/MapView.native";
import { Navigation } from "lucide-react-native"; // Ensure lucide-react-native is installed

export default function ReceiverListingDetails() {
  const { id } = useLocalSearchParams();
  const { getListingById, claimListing } = useListings();
  const { user } = useAuth();

  const [listing, setListing] = useState<any>(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [claiming, setClaiming] = useState(false);

  const loadListing = async () => {
    setLoadingPage(true);
    const data = await getListingById(id as string);
    setListing(data);
    setLoadingPage(false);
  };

  useEffect(() => {
    loadListing();
  }, [id]);

  const handleClaim = async () => {
    if (!user) return;
    setClaiming(true);
    const response = await claimListing(id as string);
    if (response.success) {
      router.replace("/receiver/claimed-listings");
    } else {
        Alert.alert("Error", response.error || "Could not claim listing");
    }
    setClaiming(false);
  };

  // NEW FUNCTION: Open External Maps
  const openMaps = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${listing.lat},${listing.lng}`;
    const label = listing.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    if (url) {
        Linking.openURL(url);
    }
  };

  if (loadingPage || !listing) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Image
        source={{ uri: listing.image }}
        style={{ width: "100%", height: 250, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
      />

      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 28, fontWeight: "700", flex: 1 }}>{listing.title}</Text>
             {/* NEW: Directions Button */}
            <TouchableOpacity onPress={openMaps} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#EFF6FF', padding: 10, borderRadius: 50 }}>
                <Navigation size={24} color={COLORS.primary} />
                <Text style={{ fontSize: 10, color: COLORS.primary, marginTop: 2 }}>Go</Text>
            </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
             <View style={{ backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }}>
                <Text style={{ color: COLORS.textGray }}>{listing.category}</Text>
             </View>
             <View style={{ backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }}>
                 <Text style={{ color: COLORS.textGray }}>{listing.quantity} servings</Text>
             </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: COLORS.textGray }}>Donor</Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{listing.donor?.name || "Unknown Donor"}</Text>
        </View>

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>Pickup Location</Text>
          <MapView lat={listing.lat} lng={listing.lng} height={200} radius={200} />
        </View>

        {listing.status === "available" ? (
          <TouchableOpacity
            onPress={handleClaim}
            disabled={claiming}
            style={{ backgroundColor: COLORS.primary, padding: 16, borderRadius: 12, alignItems: "center" }}
          >
            {claiming ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>Claim This Food</Text>}
          </TouchableOpacity>
        ) : (
          <Text style={{ color: COLORS.textGray, textAlign: "center", marginTop: 20, fontWeight: "500" }}>
            {listing.status === 'claimed' ? "You have claimed this!" : "Listing unavailable"}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}