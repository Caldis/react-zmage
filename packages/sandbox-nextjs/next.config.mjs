/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip ESLint during build — sandbox is for verifying type/build correctness
  eslint: { ignoreDuringBuilds: true },
  // Don't output telemetry or extra files
  productionBrowserSourceMaps: false,
}

export default nextConfig
