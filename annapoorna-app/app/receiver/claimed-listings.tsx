// app/receiver/claimed-listings.tsx
import React, { useEffect, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useListings } from "../../hooks/useListings";
import { COLORS } from "../../utils/constants";

export default function ClaimedListings() {
  const router = useRouter();
  // FIX: Destructure listings and fetchClaimedListings correctly
  const { listings, fetchClaimedListings, loading } = useListings();

  useEffect(() => {
    fetchClaimedListings();
  }, []);

  const handleItemPress = useCallback((id: string) => {
    router.push(`/receiver/listing-details?id=${id}`);
  }, [router]);

  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!listings || listings.length === 0) {
     return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>No claimed listings found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={listings}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleItemPress(item.id)}
          style={{
             backgroundColor: 'white',
             padding: 16, 
             marginBottom: 12, 
             borderRadius: 12,
             borderWidth: 1,
             borderColor: '#eee'
          }}
        >
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.title}</Text>
          <Text style={{color: '#666'}}>{item.quantity} servings</Text>
          <View style={{marginTop: 8, alignSelf:'flex-start', backgroundColor:'#dcfce7', padding:4, borderRadius:4}}>
             <Text style={{color: '#166534', fontSize: 12}}>Claimed</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}