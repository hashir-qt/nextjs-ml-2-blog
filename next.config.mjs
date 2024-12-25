/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                domains: ['cdn.sanity.io'],
                port:"",
        
        }
        ]
}};

