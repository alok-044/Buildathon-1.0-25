import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/constants";

export interface ListingItem {
  id: string;
  title: string;
  quantity: string | number;
  image?: string;
  distance?: string;
  expiry?: string; // changed from timeLeft to match usage
  category?: string;
  status?: string;
  donor?: { name: string }; // added donor object structure
}

interface ListingCardProps {
  listing: ListingItem;
  onPress?: () => void;
}

export default function ListingCard({ listing, onPress }: ListingCardProps) {
  const isUrgent = false; // Logic can be added later

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { transform: [{ scale: pressed ? 0.98 : 1 }] }
      ]}
    >
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: listing.image || "https://via.placeholder.com/300" }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.badgeContainer}>
          {listing.status === 'claimed' ? (
             <View style={[styles.badge, { backgroundColor: "#FEF3C7" }]}>
               <Text style={[styles.badgeText, { color: "#D97706" }]}>Claimed</Text>
             </View>
          ) : (
             <View style={[styles.badge, { backgroundColor: COLORS.white }]}>
               <Text style={[styles.badgeText, { color: COLORS.primary }]}>Available</Text>
             </View>
          )}
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{listing.title}</Text>
        </View>
        
        <Text style={styles.quantity}>Qty: <Text style={{fontWeight: '700', color: COLORS.dark}}>{listing.quantity}</Text> servings</Text>

        <View style={styles.divider} />

        <View style={styles.detailsRow}>
          {/* Donor */}
          <View style={styles.detailItem}>
            <View style={[styles.iconCircle, { backgroundColor: COLORS.primaryLight }]}>
              <Ionicons name="person" size={12} color={COLORS.primary} />
            </View>
            <Text style={styles.detailText} numberOfLines={1}>{listing.donor?.name || "Donor"}</Text>
          </View>

          {/* Distance - Optional */}
          {listing.distance && (
            <View style={styles.detailItem}>
              <View style={[styles.iconCircle, { backgroundColor: COLORS.secondaryLight }]}>
                <Ionicons name="location" size={12} color={COLORS.secondary} />
              </View>
              <Text style={styles.detailText}>{listing.distance}</Text>
            </View>
          )}
        </View>
        
        {/* Expiry */}
        <View style={[styles.detailItem, { marginTop: 8 }]}>
            <View style={[styles.iconCircle, { backgroundColor: "#DBEAFE" }]}>
                <Ionicons name="time" size={12} color="#2563EB" />
            </View>
            <Text style={styles.detailText}>Expires: {listing.expiry || "Soon"}</Text>
        </View>

      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  imageContainer: {
    height: 160,
    width: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badgeContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.dark,
    flex: 1,
  },
  quantity: {
    fontSize: 14,
    color: COLORS.textGray,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: "row",
    gap: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  detailText: {
    fontSize: 13,
    color: "#4B5563",
    fontWeight: "500",
  }
});