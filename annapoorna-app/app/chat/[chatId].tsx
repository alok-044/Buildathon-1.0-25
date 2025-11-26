// app/chat/[chatId].tsx
import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import { socketService } from "../../services/socket.service";
import { COLORS } from "../../utils/constants"; // Fixed import path

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams();
  const { user } = useAuth();

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    socketService.connect();

    socketService.joinChat(chatId as string);

    socketService.onMessage((msg: any) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    return () => {
      socketService.leaveChat(chatId as string);
      // socketService.disconnect(); // Optional: keep connection if needed elsewhere
    };
  }, [chatId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = {
      chatId,
      senderId: user?._id, // <--- FIX 1: Changed .id to ._id
      text: input.trim(),
      createdAt: new Date().toISOString(),
    };

    socketService.sendMessage(msg);
    setMessages((prev) => [...prev, msg]);
    setInput("");
    scrollToBottom();
  };

  const renderMessage = ({ item }: any) => {
    // FIX 2: Changed .id to ._id below
    const isSelf = item.senderId === user?._id;

    return (
      <View
        style={{
          alignSelf: isSelf ? "flex-end" : "flex-start",
          backgroundColor: isSelf ? COLORS.primary : "#e5e5e5",
          padding: 10,
          borderRadius: 10,
          marginVertical: 4,
          maxWidth: "75%",
        }}
      >
        <Text style={{ color: isSelf ? "#fff" : "#000" }}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ padding: 10 }}
        onContentSizeChange={scrollToBottom}
      />

      {/* Input Field */}
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          borderTopWidth: 1,
          borderColor: "#ccc",
          backgroundColor: "#fff",
        }}
      >
        <TextInput
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
          style={{
            flex: 1,
            backgroundColor: "#f1f1f1",
            padding: 10,
            borderRadius: 8,
          }}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            marginLeft: 8,
            backgroundColor: COLORS.primary,
            paddingHorizontal: 18,
            justifyContent: "center",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}