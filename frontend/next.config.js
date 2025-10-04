/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "smarthan.store",
        port: "",
        pathname: "/media/**",
      },
    ],
  },

  // output: "standalone",
};

module.exports = nextConfig;
