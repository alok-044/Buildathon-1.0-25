// context/ListingContext.tsx
import React, { createContext, useState } from "react";
import { listingService } from "../services/listing.service";

// ✅ FIX 1: Safer Helper Function
const formatListing = (item: any) => {
  if (!item) return null; // Check if item exists

  return {
    ...item,
    id: item._id || item.id,
    // ✅ FIX 2: Use optional chaining (?.) to prevent crashing on null location
    lat: item.location?.lat || item.lat || 0,
    lng: item.location?.lng || item.lng || 0,
  };
};

export const ListingContext = createContext<any>(null);

export function ListingProvider({ children }: { children: React.ReactNode }) {
  const [activeList, setActiveList] = useState<any[]>([]); 
  const [myListings, setMyListings] = useState<any[]>([]); 
  const [loading, setLoading] = useState(false);

  // Receiver: Get nearby/all listings
  const fetchAllListings = async () => {
    setLoading(true);
    try {
      const data = await listingService.exploreNearby(20.5937, 78.9629);
      if (Array.isArray(data)) {
         // ✅ FIX 3: Filter out nulls
        setActiveList(data.map(formatListing).filter(Boolean));
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Donor: Get own listings
  const fetchMyListings = async () => {
    setLoading(true);
    try {
      const data = await listingService.getDonorListings();
      if (Array.isArray(data)) {
         // ✅ FIX 3: Filter out nulls
        setMyListings(data.map(formatListing).filter(Boolean));
      }
    } catch (error) {
      console.error("Error fetching my listings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Receiver: Get claimed history
  const fetchClaimedListings = async () => {
    setLoading(true);
    try {
      const data = await listingService.getClaimedListings();
      if (Array.isArray(data)) {
         // ✅ FIX 3: Filter out nulls
        setActiveList(data.map(formatListing).filter(Boolean));
      }
    } catch (error) {
      console.error("Error fetching claimed:", error);
    } finally {
      setLoading(false);
    }
  };

  const createListing = async (payload: any) => {
    setLoading(true);
    try {
      await listingService.createListing(payload);
      await fetchMyListings(); 
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const claimListing = async (id: string) => {
    try {
      await listingService.claimListing(id);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const getListingById = async (id: string) => {
    try {
      const data = await listingService.getListingDetails(id);
      return formatListing(data);
    } catch (error) {
      return null;
    }
  };

  return (
    <ListingContext.Provider
      value={{
        listings: activeList, 
        myListings,
        loading,
        fetchAllListings,
        fetchMyListings,
        fetchClaimedListings,
        getListingById,
        createListing,
        claimListing,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
}