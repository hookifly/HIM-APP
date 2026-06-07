// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   allowedDevOrigins: [
//     "192.168.1.6",
//     "192.168.1.5",
//     "192.168.1.7",
//     "192.168.1.8",
//     "localhost",
//   ],
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.*",
    "localhost",
  ],
};

export default nextConfig;