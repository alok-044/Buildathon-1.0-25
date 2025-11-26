// mobile/app/(tabs)/messages.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";
import { router } from "expo-router";

// Dummy chat list (replace with server data later)
const dummyChats = [
  {
    id: "chat1",
    name: "Donor - Green Leaf Restaurant",
    lastMessage: "Food is packed and ready.",
    unread: 1,
  },
  {
    id: "chat2",
    name: "Receiver - Helping Hands NGO",
    lastMessage: "We have picked up the food.",
    unread: 0,
  },
];

export default function MessagesScreen() {
  const { user } = useAuth();
  useSocket(); // ensures socket is active

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 20 }}>
        Messages 💬
      </Text>

      <FlatList
        data={dummyChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/chat/${item.id}`)}
            style={{
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {item.name}
              </Text>

              {item.unread > 0 && (
                <View
                  style={{
                    backgroundColor: "#e74c3c",
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 20,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    {item.unread}
                  </Text>
                </View>
              )}
            </View>

            <Text style={{ color: "#666" }}>{item.lastMessage}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
