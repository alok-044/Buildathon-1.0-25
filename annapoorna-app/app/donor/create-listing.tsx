import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, ScrollView, KeyboardAvoidingView, Platform, Alert
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { useLocation } from "../../hooks/useLocation";
import { useListings } from "../../hooks/useListings";
import { COLORS } from "../../utils/constants";
import { Camera, MapPin, Sparkles, Leaf, Drumstick } from "lucide-react-native"; 

export default function CreateListing() {
  const params = useLocalSearchParams(); 
  const { location, loading: locationLoading } = useLocation();
  const { createListing } = useListings();

  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [expiryHours, setExpiryHours] = useState("24");
  const [isVeg, setIsVeg] = useState<boolean>(true);

  useEffect(() => {
    if (params.scannedTitle) {
      setTitle(params.scannedTitle as string);
      setQuantity(params.scannedQuantity as string);
      if (params.scannedImage) setImageUri(params.scannedImage as string);
      const cat = (params.scannedCategory as string || "").toLowerCase();
      if (cat.includes("meat") || cat.includes("chicken") || cat.includes("non-veg")) {
        setIsVeg(false);
      }
    }
  }, [params]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!title || !quantity) {
      Alert.alert("Missing info", "Please add a title and quantity.");
      return;
    }
    if (!location) {
      Alert.alert("No Location", "We need your location to post. Please enable GPS.");
      return;
    }

    setSubmitting(true);

    // ✅ FIX: Create FormData for Image Upload
    const formData = new FormData();
    formData.append('title', title);
    formData.append('quantity', quantity);
    formData.append('type', isVeg ? "Veg" : "Non-Veg");
    formData.append('expiry', expiryHours + " hours");
    
    // Send location as a JSON string
    formData.append('location', JSON.stringify({ lat: location.lat, lng: location.lng }));

    if (imageUri) {
        const filename = imageUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image/jpeg`;
        
        // @ts-ignore: React Native specificFormData
        formData.append('foodImage', { uri: imageUri, name: filename, type });
    }

    const response = await createListing(formData);
    setSubmitting(false);

    if (response.success) {
      router.replace("/donor/active-listings");
    } else {
      Alert.alert("Error", response.error || "Failed to create listing");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
        <View style={{ padding: 24 }}>
          
          <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', marginBottom: 20}}>
            <Text style={{ fontSize: 28, fontWeight: '700', color: COLORS.primary }}>Donate Food</Text>
            <TouchableOpacity onPress={() => router.push("/donor/smart-scan")} style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', padding: 8, borderRadius: 20, borderWidth: 1, borderColor: COLORS.primary}}>
              <Sparkles size={16} color={COLORS.primary} />
              <Text style={{color: COLORS.primary, fontWeight:'600', marginLeft: 4}}>Smart Scan</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleImagePick} style={{ backgroundColor: '#fff', borderRadius: 16, height: 180, justifyContent: "center", alignItems: "center", marginBottom: 24, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden' }}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={{ width: "100%", height: "100%" }} />
            ) : (
              <View style={{ alignItems: 'center' }}>
                <Camera size={40} color={COLORS.textGray} />
                <Text style={{ color: COLORS.textGray, marginTop: 8 }}>Tap to upload food photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={{ gap: 16 }}>
            <View>
              <Text style={styles.label}>What are you donating?</Text>
              <TextInput placeholder="e.g., 5kg Rice & Curry" value={title} onChangeText={setTitle} style={styles.input} />
            </View>

            <View>
                 <Text style={styles.label}>Dietary Type</Text>
                 <View style={{ flexDirection: 'row', gap: 12 }}>
                     <TouchableOpacity onPress={() => setIsVeg(true)} style={[styles.typeBtn, isVeg && styles.activeTypeBtn, { borderColor: 'green' }]}>
                         <Leaf size={20} color={isVeg ? 'white' : 'green'} />
                         <Text style={{ marginLeft: 6, color: isVeg ? 'white' : 'green', fontWeight: '600'}}>Veg</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => setIsVeg(false)} style={[styles.typeBtn, !isVeg && styles.activeTypeBtn, { borderColor: 'red', backgroundColor: !isVeg ? 'red' : 'white' }]}>
                         <Drumstick size={20} color={!isVeg ? 'white' : 'red'} />
                         <Text style={{ marginLeft: 6, color: !isVeg ? 'white' : 'red', fontWeight: '600'}}>Non-Veg</Text>
                     </TouchableOpacity>
                 </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Quantity (Servings)</Text>
                <TextInput placeholder="5" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={styles.input} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Expires In (Hours)</Text>
                 <TextInput placeholder="24" value={expiryHours} onChangeText={setExpiryHours} keyboardType="numeric" style={styles.input} />
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eff6ff', padding: 12, borderRadius: 8 }}>
              <MapPin size={18} color={COLORS.primary} />
              <Text style={{ marginLeft: 8, color: COLORS.primary, fontSize: 14 }}>
                 {location ? "Location Secured" : locationLoading ? "Fetching location..." : "Location not found. Ensure GPS is on."}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleSubmit} disabled={submitting || !location} style={{ backgroundColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: "center", marginTop: 32 }}>
            {submitting ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>Post Donation</Text>}
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = {
    label: { fontWeight: '600' as '600', marginBottom: 6, color: '#374151' },
    input: { backgroundColor: '#fff', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#e5e7eb' },
    typeBtn: { flex: 1, flexDirection: 'row' as 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 10, borderWidth: 1, backgroundColor: 'white' },
    activeTypeBtn: { backgroundColor: 'green' }
};