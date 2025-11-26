// mobile/app/support.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { COLORS } from "../utils/constants";

export default function SupportScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 20, color: COLORS.primary }}>
        Help & Support
      </Text>
      
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>Contact Us</Text>
        <Text style={{ fontSize: 16, color: "#555", lineHeight: 22 }}>
          If you have any issues or questions, please email us at support@annapoorna.com or call our helpline at +91-12345-67890.
        </Text>
      </View>

      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>FAQs</Text>
        <Text style={{ fontSize: 16, color: "#555", lineHeight: 24 }}>
          • <Text style={{ fontWeight: '600' }}>How do I donate food?</Text>{'\n'} 
             Click on "Create Listing" on your home screen.{'\n\n'}
          • <Text style={{ fontWeight: '600' }}>Is this service free?</Text>{'\n'} 
             Yes, Annapoorna Connect is completely free for donors and receivers.{'\n\n'}
          • <Text style={{ fontWeight: '600' }}>How do I report an issue?</Text>{'\n'} 
             Use the contact details above to reach our support team.
        </Text>
      </View>
    </ScrollView>
  );
}