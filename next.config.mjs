/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Defaults to ".next". Overridable (e.g. to a path off OneDrive/Desktop) to
  // avoid Windows file-lock issues during CI/verification builds.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // Allow the SVG-based placeholder previews to be served through next/image.
    // Real raster screenshots dropped into /public/images are optimized normally.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],
  },
};

export default nextConfig;
