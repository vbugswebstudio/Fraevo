import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Allow HMR and dev assets over the local network (LAN IP access).
  // Next.js blocks cross-origin dev requests by default for safety.
  // If your machine's IP changes, add the new one here and restart `npm run dev`.
  allowedDevOrigins: ["192.168.18.7", "http://192.168.18.7:3000"],
};

export default nextConfig;
