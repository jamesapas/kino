import type { NextConfig } from "next";

// Avatars are served from this project's Storage host. Derived from the same
// env var the app uses so a project change doesn't need an edit here; the
// build fails loudly rather than silently dropping the pattern.
const supabaseHost = new URL(
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
    (() => {
      throw new Error("NEXT_PUBLIC_SUPABASE_URL is required to build (see .env.example).");
    })(),
).hostname;

const nextConfig: NextConfig = {
  images: {
    // Serve images directly from TMDB/Supabase CDN without Vercel transformation proxy.
    // TMDB already provides pre-scaled CDN assets (w342, w500, w1280), eliminating
    // Vercel image transformation limits (5k), cache writes (100k), and Sharp CPU usage.
    unoptimized: true,
    remotePatterns: [
      {
        // Posters and backdrops come from TMDB's CDN.
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: supabaseHost,
        pathname: "/storage/v1/object/public/avatars/**",
      },
      {
        // A Google account's own picture, used as the default avatar.
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
