import { useContext } from "react";
import { ListingContext } from "../context/ListingContext";

export function useListings() {
  const listings = useContext(ListingContext);

  if (!listings) {
    throw new Error("useListings must be used within ListingProvider");
  }

  return listings;
}
