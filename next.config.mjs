/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {source:"/",
             destination:"/accueil",
             permanent:true
            }
        ]
    }
};

export default nextConfig;