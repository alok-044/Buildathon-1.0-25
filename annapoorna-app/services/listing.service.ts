import api from "./api";

export const listingService = {
  // Donor creates a listing (Using FormData for Image Upload)
  async createListing(payload: any) {
    // Note: 'payload' here is a FormData object
    const res = await api.post("/listings/create", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
  },

  // Donor: get active listings
  async getDonorListings() {
    const res = await api.get("/listings/donor");
    return res.data;
  },

  // Receiver: explore nearby listings
  async exploreNearby(lat: number, lng: number) {
    // We append lat/lng query params, though backend might just return all for now
    const res = await api.get(`/listings/explore?lat=${lat}&lng=${lng}`);
    return res.data;
  },

  // Receiver: claim a listing
  async claimListing(listingId: string) {
    const res = await api.post(`/listings/claim/${listingId}`);
    return res.data;
  },

  // Common: listing details
  async getListingDetails(listingId: string) {
    const res = await api.get(`/listings/${listingId}`);
    return res.data;
  },

  // Receiver: get claimed listings
  async getClaimedListings() {
    const res = await api.get("/listings/claimed");
    return res.data;
  },
};