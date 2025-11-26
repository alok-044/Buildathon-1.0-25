import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import * as SplashScreen from 'expo-splash-screen'; // Import this
import { useAuth } from "../hooks/useAuth";

export default function Index() {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Once authentication check is done (loading is false), hide the splash screen
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  // While loading, return null. 
  // The native splash screen is still covering the app, so the user sees nothing but the logo.
  if (loading) {
    return null; 
  }

  // If user is logged in → redirect to tabs
  if (user) return <Redirect href="/(tabs)/home" />;

  // Not logged in → start onboarding
  return <Redirect href="/auth/onboarding" />;
}