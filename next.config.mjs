/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Electron
  output: "export",
  distDir: "out",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Set base path and asset prefix for production
  basePath: "",
  trailingSlash: false,

  // Configure webpack for Electron compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignore node modules that shouldn't be bundled in the frontend
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    // Handle node modules properly
    config.externals = config.externals || [];

    return config;
  },

  // Optimize for production
  compress: true,

  // Static file serving
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",

  // Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
