import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { COLORS } from "../../utils/constants";
const SplashImage = require("../../assets/splash.png"); 

export default function Onboarding() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        
        <Image
          source={SplashImage}
          style={styles.image}
        />

        <Text style={styles.title}>
          Welcome to Annapoorna Connect
        </Text>

        <Text style={styles.subtitle}>
          Donate surplus food or find meals nearby.{"\n"}
          Bridging communities through food and kindness.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/auth/login")}
          style={styles.primaryButton}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/auth/signup")}
          style={styles.secondaryButton}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 260,
    height: 260,
    borderRadius: 130,
    marginBottom: 24,
    resizeMode: "cover",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    color: COLORS.primary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.textGray || "#666", 
    marginHorizontal: 10,
    lineHeight: 24,
  },
  buttonContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    marginBottom: 14,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "700",
  },
});