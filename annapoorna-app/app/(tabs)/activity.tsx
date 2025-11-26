// mobile/app/(tabs)/activity.tsx
import React from "react";
import { View, Text, FlatList } from "react-native";
import { Bell } from "lucide-react-native";

// Dummy activity data (replace with API + Socket updates)
const dummyActivity = [
  {
    id: "1",
    message: "Your listing 'Veg Biryani (Serves 5)' was claimed.",
    time: "10 mins ago",
    type: "claim",
  },
  {
    id: "2",
    message: "New food available near you: 'Assorted Bread Basket'.",
    time: "20 mins ago",
    type: "new-listing",
  },
  {
    id: "3",
    message: "Pickup completed for 'Paneer Curry (Serves 4)'.",
    time: "1 hour ago",
    type: "completed",
  },
  {
    id: "4",
    message: "Your account was successfully verified.",
    time: "Yesterday",
    type: "system",
  },
];

export default function ActivityScreen() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 20 }}>
        Activity 🔔
      </Text>

      {dummyActivity.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 100 }}>
          <Bell size={60} color="#aaa" />
          <Text style={{ marginTop: 20, fontSize: 16, color: "#777" }}>
            No recent activity yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={dummyActivity}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderColor: "#eee",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {item.message}
              </Text>
              <Text style={{ fontSize: 14, color: "#888", marginTop: 4 }}>
                {item.time}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
