import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { COLORS } from "../../utils/constants";
import { ArrowLeft } from "lucide-react-native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email.includes("@")) {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
        return;
    }
    Alert.alert("Reset Link Sent", `A password reset link has been sent to ${email}`, [
        { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 24 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20, marginBottom: 20 }}>
        <ArrowLeft color={COLORS.text} size={24} />
      </TouchableOpacity>

      <Text style={{ fontSize: 28, fontWeight: "700", color: COLORS.primary, marginBottom: 10 }}>
        Reset Password
      </Text>
      <Text style={{ color: COLORS.textGray, marginBottom: 30 }}>
        Enter your email address and we will send you instructions to reset your password.
      </Text>

      <Text style={{ fontWeight: "600", marginBottom: 8 }}>Email Address</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="name@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          padding: 14,
          borderRadius: 10,
          marginBottom: 24,
        }}
      />

      <TouchableOpacity
        onPress={handleReset}
        style={{
          backgroundColor: COLORS.primary,
          padding: 16,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>Send Link</Text>
      </TouchableOpacity>
    </View>
  );
}