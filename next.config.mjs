/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    modularizeImports: {
      "@mui/material": {
        transform: "@mui/material/{{member}}",
      },
      "@mui/lab": {
        transform: "@mui/lab/{{member}}",
      },
    },
    eslint: {
      ignoreDuringBuilds: true,
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    transpilePackages: ['@lobehub/ui'],
    // swcMinify: false,
  };
  
  export default nextConfig;
  