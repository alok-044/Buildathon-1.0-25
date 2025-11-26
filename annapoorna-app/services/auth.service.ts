import api from "./api";

export const authService = {
  async login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  },

  async signup(payload: {
    name: string;
    email: string;
    password: string;
    role: "donor" | "receiver";
  }) {
    const res = await api.post("/auth/signup", payload);
    return res.data;
  },

  async getProfile() {
    const res = await api.get("/auth/me");
    return res.data;
  },

  // This is the function used by the "Edit Profile" screen
  async updateProfile(data: { name?: string; phone?: string; address?: string }) {
    const res = await api.put("/auth/updatedetails", data); 
    return res.data;
  },

  async onboarding(userId: string, data: any) {
    const res = await api.post(`/auth/onboarding/${userId}`, data);
    return res.data;
  },

  async logout() {
    return true;
  },
};