import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Lets the dev server work behind GitHub Codespaces' forwarded URLs.
  allowedDevOrigins: ["*.app.github.dev"],
};

export default withNextIntl(nextConfig);
