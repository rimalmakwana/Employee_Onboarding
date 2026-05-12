// src/config/envConfig.js
// ─────────────────────────────────────────────────────────────
// Centralised environment configuration.
// All env-variable access should live HERE and be exported as
// named constants.
// ─────────────────────────────────────────────────────────────

/* ------------------------------------------------------------------
   Google Maps
------------------------------------------------------------------ */

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

if (!googleMapsApiKey) {
  throw new Error(
    "[envConfig] VITE_GOOGLE_MAPS_API_KEY is not defined.\n" +
      "Add it to your .env file:\n" +
      "VITE_GOOGLE_MAPS_API_KEY=your_key_here"
  );
}

export const GOOGLE_MAPS_API_KEY = googleMapsApiKey;

/* ------------------------------------------------------------------
   Supabase
------------------------------------------------------------------ */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

if (!supabaseUrl) {
  throw new Error(
    "[envConfig] VITE_SUPABASE_URL is not defined.\n" +
      "Add it to your .env file:\n" +
      "VITE_SUPABASE_URL=your_supabase_url"
  );
}

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  throw new Error(
    "[envConfig] VITE_SUPABASE_ANON_KEY is not defined.\n" +
      "Add it to your .env file:\n" +
      "VITE_SUPABASE_ANON_KEY=your_supabase_anon_key"
  );
}

export const SUPABASE_URL = supabaseUrl;
export const SUPABASE_ANON_KEY = supabaseAnonKey;