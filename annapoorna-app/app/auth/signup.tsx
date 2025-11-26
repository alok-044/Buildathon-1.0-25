import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import { COLORS } from "../../utils/constants";

// Ensure this asset exists in your folder
const SignupImage = require("../../assets/reg.png");

export default function Signup() {
  const { signup, loading } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Removed TypeScript syntax <...> for compatibility if using .js file
  const [role, setRole] = useState("donor"); 
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const response = await signup({
      name: name.trim(),
      email: email.trim(),
      password,
      role,
    });

    if (!response.success) {
      setError(response.error || "Signup failed. Try again.");
      return;
    }

    // Navigate to home on success
    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={SignupImage}
            style={styles.image}
          />

          <View style={styles.formContainer}>
            <Text style={styles.headerTitle}>
              Create Account
            </Text>
            <Text style={styles.headerSubtitle}>
              Join the community to share or receive.
            </Text>

            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            {/* Role Selection */}
            <Text style={styles.sectionLabel}>I am a:</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity
                onPress={() => setRole("donor")}
                style={[
                  styles.roleButton, 
                  role === "donor" && styles.roleButtonActive
                ]}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.roleText, 
                  role === "donor" && styles.roleTextActive
                ]}>
                  Donor 🥘
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setRole("receiver")}
                style={[
                  styles.roleButton, 
                  role === "receiver" && styles.roleButtonActive
                ]}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.roleText, 
                  role === "receiver" && styles.roleTextActive
                ]}>
                  Receiver 🤲
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Ex: Alok Kumar"
              placeholderTextColor="#999"
              style={styles.input}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity
              onPress={handleSignup}
              disabled={loading}
              style={styles.signupButton}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signupButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?{" "}
              </Text>
              <Link href="/auth/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: 220, 
    resizeMode: "contain",
    marginTop: 10,
  },
  formContainer: {
    padding: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 4,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  sectionLabel: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#444",
    fontSize: 14,
    marginLeft: 4,
  },
  roleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 12,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F9F9F9",
    alignItems: "center",
  },
  roleButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#EFF6FF", // Light version of primary color
  },
  roleText: {
    fontWeight: "600",
    color: "#666",
    fontSize: 15,
  },
  roleTextActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F9F9F9",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  errorText: {
    color: "#FF3B30",
    marginBottom: 16,
    textAlign: "center",
    backgroundColor: "#FFE5E5",
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden', // Ensures background doesn't bleed corners
  },
  signupButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    fontSize: 15,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 15,
  },
});