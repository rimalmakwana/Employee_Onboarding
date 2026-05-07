import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

export function useAddressGeocoding(address) {
  const [location, setLocation] = useState({
    lat: 12.9716,
    lng: 77.5946,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    // Fetch location from Google Maps
    const fetchLocation = async () => {
      // Don't search if empty
      if (!address.trim()) return;

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
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

    // Delay API call
    const timer = setTimeout(() => {
      fetchLocation();
    }, 1000);

    // Cleanup
    return () => clearTimeout(timer);
  }, [address]);

  return { location, isLoaded };
}
