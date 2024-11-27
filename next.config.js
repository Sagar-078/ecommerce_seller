// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// const nextConfig = {
//     images: {
//     domains: ["res.cloudinary.com"]
//      },
//   async headers() {

//       return [
//           {
//               source: "/api/:path*",
//               headers: [
//                   { key: "Access-Control-Allow-Credentials", value: "true" },
//                   { key: "Access-Control-Allow-Origin", value: "https://localhost:3000" }, 
//                   { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
//                   { key: "Access-Control-Allow-Headers", value: "Content-Type,Authorization" },
                  
//               ]
//           }
//       ]
//   }
// }

// module.exports = nextConfig

const nextConfig = {

  reactStrictMode: false,

    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '/**',
        },
      ],
    },
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "http://localhost:3001" },
            { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "Content-Type,Authorization" },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
