import React from "react";
import { TextInput, View, Text, StyleSheet, TextInputProps } from "react-native";
import { COLORS } from "../../utils/constants";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  style,
  ...props
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <TextInput
        placeholderTextColor="#9CA3AF"
        style={[
          styles.input,
          error ? styles.inputError : null,
          style
        ]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151", // gray-700
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.inputBg, // gray-50
    borderWidth: 1,
    borderColor: "#E5E7EB", // gray-200
    borderRadius: 12, // rounded-xl
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.danger,
    borderWidth: 1,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
});