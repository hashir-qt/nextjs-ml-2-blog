/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                port:"",
        
        }
        ]
}};
module.exports = {
    eslint: {
      dirs: ["pages", "components", "lib", "utils"], // Specify directories to lint
    },
  };

export default nextConfig;
