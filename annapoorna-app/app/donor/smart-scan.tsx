import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../utils/constants";
import { aiService } from "../../services/ai.service";
import { Camera, Sparkles, X } from "lucide-react-native";

export default function SmartScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const analyzeImage = async (uri: string) => {
    setAnalyzing(true);
    try {
      const data = await aiService.scanFoodImage(uri);
      
      // Navigate to Create Listing with pre-filled data
      router.replace({
        pathname: "/donor/create-listing",
        params: {
          scannedTitle: data.title,
          scannedCategory: data.category,
          scannedQuantity: data.quantity.toString(),
          scannedImage: uri
        }
      });
    } catch (error) {
      alert("AI Scan failed. Please try again.");
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    pickImage(); // Auto-open picker on load for convenience
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart Scan 🤖</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <X color="#000" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {image ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: image }} style={styles.previewImage} />
            {analyzing && (
              <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.analyzingText}>AI is analyzing food...</Text>
                <Sparkles color="#FFD700" size={24} style={{ marginTop: 10 }} />
              </View>
            )}
          </View>
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
            <Camera size={48} color={COLORS.primary} />
            <Text style={styles.uploadText}>Tap to Scan Food</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: COLORS.primary },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  previewContainer: { width: "100%", height: 400, borderRadius: 20, overflow: "hidden", elevation: 5 },
  previewImage: { width: "100%", height: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  analyzingText: { color: "#fff", fontSize: 18, fontWeight: "600", marginTop: 16 },
  uploadButton: { alignItems: "center", padding: 40, borderWidth: 2, borderColor: COLORS.primary, borderStyle: "dashed", borderRadius: 20 },
  uploadText: { marginTop: 12, fontSize: 16, color: COLORS.textGray },
});