// mobile/app/receiver/explore.tsx
import React, { useEffect, useCallback, useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from "react-native";
import { router } from "expo-router";
import MapView from "../../components/map/MapView.native";
import ListingMapMarker from "../../components/listing/ListingMapMarker.native";
import { useListings } from "../../hooks/useListings";
import { useLocation } from "../../hooks/useLocation";
import { COLORS } from "../../utils/constants";
import { Search, Filter } from "lucide-react-native";

export default function Explore() {
  const { location, loading: locationLoading } = useLocation();
  const { listings, fetchAllListings, loading } = useListings();
  
  // NEW: Filter States
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Veg" | "Non-Veg">("All");

  const loadData = useCallback(() => {
    fetchAllListings();
  }, []);

  useEffect(() => { loadData(); }, []);

  // Filtering Logic
  const filteredListings = useMemo(() => {
    return listings.filter((item: any) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === "All" || item.category === filterType;
        return matchesSearch && matchesType;
    });
  }, [listings, search, filterType]);

  if (locationLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Search & Filter Header */}
      <View style={{ padding: 24, paddingBottom: 10, paddingTop: 50 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: COLORS.primary, marginBottom: 10 }}>Explore Food</Text>
        
        {/* Search Bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', paddingHorizontal: 12, borderRadius: 12, height: 45, marginBottom: 12 }}>
            <Search size={20} color="#9ca3af" />
            <TextInput 
                placeholder="Search listings..." 
                value={search} 
                onChangeText={setSearch}
                style={{ flex: 1, marginLeft: 10, fontSize: 16 }} 
            />
        </View>

        {/* Filter Chips */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
            {["All", "Veg", "Non-Veg"].map((type) => (
                <TouchableOpacity
                    key={type}
                    onPress={() => setFilterType(type as any)}
                    style={{
                        backgroundColor: filterType === type ? COLORS.primary : '#f3f4f6',
                        paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20
                    }}
                >
                    <Text style={{ color: filterType === type ? '#fff' : '#4b5563', fontWeight: '500' }}>{type}</Text>
                </TouchableOpacity>
            ))}
        </View>
      </View>

      {/* MAP */}
      <View style={{ height: 300 }}>
        <MapView lat={location?.lat} lng={location?.lng} zoom={14} height={300}>
          {filteredListings.map((listing: any) => (
            <ListingMapMarker
              key={listing.id}
              listing={listing} 
              onPress={() => router.push({ pathname: "/receiver/listing-details", params: { id: listing.id } })}
            />
          ))}
        </MapView>
      </View>

      {/* LIST VIEW */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }} refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} />}>
        {loading && listings.length === 0 ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : filteredListings.length === 0 ? (
          <Text style={{ textAlign: "center", color: COLORS.textGray, marginTop: 20 }}>No matching listings found.</Text>
        ) : (
          filteredListings.map((listing: any) => (
            <TouchableOpacity
              key={listing.id}
              onPress={() => router.push({ pathname: "/receiver/listing-details", params: { id: listing.id } })}
              style={{ marginBottom: 16, backgroundColor: 'white', borderWidth: 1, borderColor: COLORS.border, padding: 16, borderRadius: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>{listing.title}</Text>
                  <Text style={{ color: listing.category === 'Veg' ? 'green' : 'red', fontWeight: 'bold', fontSize: 12 }}>{listing.category}</Text>
              </View>
              <Text style={{ color: COLORS.textGray, marginTop: 4 }}>{listing.quantity} servings</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}