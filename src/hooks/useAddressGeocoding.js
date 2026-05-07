import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { useDebounce } from "./useDebounce";

export function useAddressGeocoding(address) {
  const [location, setLocation] = useState({
    lat: 12.9716,
    lng: 77.5946,
  });

  // Debounce the address so we only fetch 1 second after the user stops typing
  const debouncedAddress = useDebounce(address, 1000);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    // Fetch location from Google Maps
    const fetchLocation = async () => {
      // Don't search if empty (using the debounced value)
      if (!debouncedAddress.trim()) return;

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(debouncedAddress)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );

        const data = await response.json();

        // If result found
        if (data?.results?.length > 0) {
          const coordinates = data.results[0]?.geometry?.location;

          if (coordinates) {
            setLocation({
              lat: coordinates.lat,
              lng: coordinates.lng,
            });
          }
        }
      } catch (error) {
        console.log("Location fetch error:", error);
      }
    };

    // Because the address is already debounced, we can just call fetch directly here
    fetchLocation();
  }, [debouncedAddress]); // Only re-run when the DEBOUNCED address changes!

  return { location, isLoaded };
}
