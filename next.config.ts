import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Placeholder content in public/images is self-authored SVG (gradients +
    // dots only, no scripts) — safe to optimize with a locked-down CSP.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // SWAP POINT for the real Laravel backend: once media is served from
    // Laravel (local storage, S3, or a CDN in front of it), allowlist that
    // host here. Next's built-in optimizer then fetches, resizes, and
    // serves WebP/AVIF for those remote images automatically — no backend
    // conversion work needed, Laravel can keep serving whatever format it
    // stores.
    // remotePatterns: [
    //   { protocol: "https", hostname: "api.aquared.com", pathname: "/storage/**" },
    // ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
