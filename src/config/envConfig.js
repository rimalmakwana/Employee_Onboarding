// src/config/envConfig.js
// ─────────────────────────────────────────────────────────────
// Centralised environment configuration.
// All env-variable access should live HERE and be exported as
// named constants.  That way, if a variable is renamed in .env
// you only need to update this one file.
// ─────────────────────────────────────────────────────────────

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

if (!googleMapsApiKey) {
  throw new Error(
    "[envConfig] VITE_GOOGLE_MAPS_API_KEY is not defined.\n" +
      "Add it to your .env file:  VITE_GOOGLE_MAPS_API_KEY=your_key_here"
  );
}

export const GOOGLE_MAPS_API_KEY = googleMapsApiKey;
