import type { NextConfig } from "next";

// Hack the Island (Dec 4–6) is its own site, hosted on Cloudflare. These rewrites show it
// at uvichacks.com/hack-the-island, so its organizers can update it without a PR here.
const HACK_THE_ISLAND = "https://hack-the-island.uvichacks.workers.dev";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/hack-the-island", destination: `${HACK_THE_ISLAND}/hack-the-island` },
      { source: "/hack-the-island/:path*", destination: `${HACK_THE_ISLAND}/hack-the-island/:path*` },
    ];
  },
};

export default nextConfig;
