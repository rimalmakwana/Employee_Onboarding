import { GOOGLE_MAPS_API_KEY } from "../config/envConfig";

export const GOOGLE_GEOCODE_API = (address) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${GOOGLE_MAPS_API_KEY}`;