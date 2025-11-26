// mobile/services/socket.service.ts
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../utils/constants";

class SocketService {
  socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket?.id);
    });

    this.socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinChat(chatId: string) {
    this.socket?.emit("join_chat", chatId);
  }

  leaveChat(chatId: string) {
    this.socket?.emit("leave_chat", chatId);
  }

  sendMessage(message: any) {
    this.socket?.emit("send_message", message);
  }

  onMessage(callback: (msg: any) => void) {
    this.socket?.on("receive_message", callback);
  }
}

export const socketService = new SocketService();